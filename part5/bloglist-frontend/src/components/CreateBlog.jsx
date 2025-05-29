import { useState } from 'react'
import PropTypes from  'prop-types'

const CreateBlog = ({ handleCreate }) => {

  //const [newBlog, setNewBlog] = useState('')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    // Call createBlog
    handleCreate(blogObject)
    
    // reset blog form
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2>Create new blog:</h2>
      <div>title:
          <input
            type="text"
            value={blogTitle}
            name="blogTitle"
            placeholder="title"
            onChange={({ target }) => setBlogTitle(target.value)} />
            
      </div>

      <div>author:
          <input
            type="text"
            value={blogAuthor}
            name="blogAuthor"
            placeholder="author"
            onChange={({ target}) => setBlogAuthor(target.value)} />
      </div>

      <div>url:
          <input
            type="text"
            value={blogUrl}
            name="blogUrl"
            placeholder="url"
            onChange={({ target }) => setBlogUrl(target.value)} />
      </div>
    <button type="submit">Create</button>
    </form>
  )
}

CreateBlog.propTypes = {
  handleCreate: PropTypes.func.isRequired
}

export default CreateBlog