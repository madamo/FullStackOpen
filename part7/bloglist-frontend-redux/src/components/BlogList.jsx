import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ handleLike }) => {
  const blogs = useSelector(state => state.blogs)

  return (
          <div>
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog} handleLike={handleLike} /> 
        )}
      </div>
  )
}

export default BlogList