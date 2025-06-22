import { useRef } from 'react'
import { getBlogs } from '../requests'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Blog from './Blog'
import Togglable from './Togglable'
import CreateBlog from './CreateBlog'



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

  return (
      <div>
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog} loggedInUser={loggedInUser} /> 
        )}
          <Togglable buttonLabel="Add Blog" ref={createBlogRef}>
            <CreateBlog />
          </Togglable>
      </div>
  )
}

export default BlogList