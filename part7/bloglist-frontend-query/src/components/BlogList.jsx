import { useRef } from 'react'
import { getBlogs } from '../requests'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Blog from './Blog'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'
import { 
  Link,
  useParams
 } from 'react-router-dom'



const BlogList = ({ loggedInUser }) => {
  //const blogs = useSelector(state => state.blogs)
  const queryClient = useQueryClient()

  const createBlogRef = useRef()

  const result = useQuery({
      queryKey: ['blogs'],
      placeholderData: [],
      queryFn: getBlogs,
      retry: false
    })
    //console.log(JSON.parse(JSON.stringify(result)))
    const blogs = result.data

  if (result.isError) {
    console.log(result.isError.message)
    return <div>couldn't retrieve blog list</div>
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    listStyle: 'none'
  }

  return (
      <div>
        <Togglable buttonLabel="Add Blog" ref={createBlogRef}>
          <CreateBlog toggleCreate={createBlogRef} />
        </Togglable>
        {blogs.map(blog => 
          //<Blog key={blog.id} blog={blog} loggedInUser={loggedInUser} /> 
          <li key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        )}
        
      </div>
  )
}

export default BlogList