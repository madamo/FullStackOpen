const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error)
  })


const resolvers = {
  Author: {
    bookCount: async (root) => {
      // TO-DO: Find better way to do this - maybe get author id then find all books where author matches id
      const author = await Author.findOne({ name: root.name })
      console.log(author)
      return Book.find({ author: { _id: author._id} } ).countDocuments()
    }
  },
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      // If no arguments, return all books
      if (!args.author && !args.genre) {
        console.log('allBooks: no args, returning all books')
        return Book.find( {} ).populate('author', { name: 1 })
      }

      //TO-DO: find better way to do this
      const books = args.genre ? await Book.find({ genres: args.genre }).populate('author', { name: 1 }) : await Book.find( {} ).populate('author', { name: 1 })

      if (args.author) {
        return books.filter(b => b.author.name === args.author)
      } else {
        return books
      }
    },
    recommendedBooks: async (root, args, context) => {
      console.log("getting books with genre:", context.currentUser.favoriteGenre)
      const books = await Book.find({ genres: context.currentUser.favoriteGenre }).populate('author', { name: 1 })
      return books
    },
    allAuthors: async () => Author.find( {} ),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      if (!author) {
        console.log('author not found:', args.author)
        const newAuthor = new Author({ name: args.author })
        try {
          await newAuthor.save()
          author = newAuthor
        } catch (error) {
          console.log('error saving new author:', error)
          throw new GraphQLError('Adding new author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author, error
            }
          })
        }
      }
      
      const book = new Book({ ...args })
      book.author = author

      try {
        await book.save()
      } catch (error) {
        console.log('Saving book failed', error)
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title, error
          }
        })
      }
      return book
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      if (!author) {
        console.log('author not found')
        return null
      }

      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        console.log('Error saving author: ', error)
        throw new GraphQLError('Error updating birth year', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.setBornTo, error
          }
        })
      }
      
      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username, error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})