import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

  const blog = {
    title: 'test blog',
    author: 'test author',
    url: 'testurl',
    likes: 50,
    user: {
      name: 'test name'
    }
  }

  let container

  beforeEach(() => {
    container = render(
      <Blog blog={blog} />
    ).container
  })


  test('renders title and author by default, but not blog details', () => {
    const blogInfo = container.querySelector('.title-author')
    const blogDetails = container.querySelector('.blog-details')
    expect(blogInfo).not.toHaveStyle('display: none')
    expect(blogDetails).toHaveStyle('display: none')
  })

  test('renders url and likes when user clicks show', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('show')

    await user.click(button)

    const blogDetails = container.querySelector('.blog-details')
    expect(blogDetails).not.toHaveStyle('display: none')
  })

})
