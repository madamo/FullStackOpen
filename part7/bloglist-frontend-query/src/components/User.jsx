import { useContext } from 'react'
import UserContext from '../UserContext'
import { useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getUsers } from '../requests'

const User = () => {

  //const [notification, notificationDispatch] = useContext(NotificationContext)

  const user = useContext(UserContext)
  console.log(user)

  if (!user) {
    return null
  }

  const id = useParams().id
  console.log(id)

  const queryClient = useQueryClient()

  //TO-DO: useContext or some other way to not query database again here
  const users = useQuery({
      queryKey: ['users'],
      placeholderData: [],
      queryFn: getUsers,
      retry: false
    })
  const userList = users.data

  const userById = userList.find(user => user.id === id )

  if (!userById) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      { userById.blogs.map(blog => 
        <li key={blog.id}>{blog.title}</li>
      )}
    </div>
  )
}

export default User