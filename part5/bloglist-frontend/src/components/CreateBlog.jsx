const CreateBlog = ({ blogTitle, updateBlogTitle, blogAuthor, updateBlogAuthor, blogUrl, updateBlogUrl, handleCreate }) => {
  return (
    <form onSubmit={handleCreate}>
      <h2>Create new blog:</h2>
      <div>title:
          <input
            type="text"
            value={blogTitle}
            name="blogTitle"
            onChange={({ target }) => updateBlogTitle(target.value)} />
      </div>

      <div>author:
          <input
            type="text"
            value={blogAuthor}
            name="blogAuthor"
            onChange={({ target}) => updateBlogAuthor(target.value)} />
      </div>

      <div>url:
          <input
            type="text"
            value={blogUrl}
            name="blogUrl"
            onChange={({ target }) => updateBlogUrl(target.value)} />
      </div>
    <button type="submit">Create</button>
    </form>
  )
}

export default CreateBlog