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
 import styled from 'styled-components'

 const Page = styled.div`
  width: 75%;


  li {
    margin: 10px 0;
    list-style: none;
    border: 1px solid grey;
    padding: 10px 5px;
    border-radius: 5px;

    a {
      color: black;
      text-decoration: none;
    }
      
  }
  
  li:hover {
    background-color: #FF13F0;

    a {
      color: white;
    }
  }
 `



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
      <Page>
        <h2>Blogs</h2>

        <Togglable buttonLabel="Add Blog" ref={createBlogRef}>
          <CreateBlog toggleCreate={createBlogRef} />
        </Togglable>

        {blogs.map(blog => 
          //<Blog key={blog.id} blog={blog} loggedInUser={loggedInUser} /> 
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        )}
        
      </Page>
  )
}

export default BlogList