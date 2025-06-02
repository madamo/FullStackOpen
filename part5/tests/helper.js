const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'Add Blog'}).click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByRole('button', { name: 'Create' }).click()
}

/*const createManyBlogs = async (request) => {
  request.post('/api/blog', {
    data: {
      title: "title 1",
      author: "author 1",
      url: "url1",
      likes: 1
    }
  })

  request.post('/api/blog', {
    data: {
      title: "title 2",
      author: "author 2",
      url: "url2",
      likes: 2
    }
  })
}*/

export { loginWith, createBlog }