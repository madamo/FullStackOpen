const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

//const url = `mongodb+srv://mattadamoux:${password}@cluster0.u3sqg.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`
const url = process.env.MONGODB_URI

console.log('connecting to', url)

const password = process.argv[2]

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)