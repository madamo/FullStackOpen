import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

test('<CreateBlog /> calls onSubmit with the right details', async () => {
  // setup our actions and user
  const createBlog = vi.fn()
  const user = userEvent.setup()

  // Render the component
  render(<CreateBlog handleCreate={createBlog} />)

  // Get the elements needed to create a blog
  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const submitButton = screen.getByText('Create')

  // Simulate interaction with elements
  await user.type(titleInput, 'some title')
  await user.type(authorInput, 'some author')
  await user.type(urlInput, 'someurl.com')
  await user.click(submitButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls[0][0].title).toBe('some title')
  expect(createBlog.mock.calls[0][0].author).toBe('some author')
  expect(createBlog.mock.calls[0][0].url).toBe('someurl.com')

})