import { getBlogs } from '../requests'
import { useQuery } from '@tanstack/react-query'
import Blog from './Blog'

const BlogList = () => {
  //const blogs = useSelector(state => state.blogs)
  const result = useQuery({
      queryKey: ['blogs'],
      placeholderData: [],
      queryFn: getBlogs,
      retry: false
    })
    console.log(JSON.parse(JSON.stringify(result)))
    const blogs = result.data

  if (result.isError) {
    console.log(result.isError.message)
    return <div>couldn't retrieve blog list</div>
  }
  return (
          <div>
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog} /> 
        )}
      </div>
  )
}

export default BlogList