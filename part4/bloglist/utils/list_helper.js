const dummy = (blogs) => {
  return 1
}

const totalLikes = (posts) => {
  return posts.reduce((acc, curr) => acc + curr.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length > 0) {
    return blogs.reduce((prev, curr) => (prev.likes > curr.likes) ? prev : curr, blogs[0]) 
  } else {
    return 'no blogs'
  }
}

//TO-DO: 4.6 return author with most blogs

//TO-DO: 4.7 return author with the most likes

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}