import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getUsers } from '../requests'
import { 
  Link,
  useParams
 } from 'react-router-dom'

const Users = () => {

    const queryClient = useQueryClient()

    const users = useQuery({
        queryKey: ['users'],
        placeholderData: [],
        queryFn: getUsers,
        retry: false
      })
    const userList = users.data

    //console.log(userList)

      const liStyle = {
        listStyle: 'none',
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between'
      }

      const divStyle = {
      }

      const columnLabel = {
        width: '100%',
        textAlign: 'right'
      }

      const containerStyle = {
        width: '250px'
      }
      

    return (
      <div style={containerStyle}>
        <h2>Users</h2>
        <div style={columnLabel}><b>blogs created</b></div>
        {userList.map(user => 
          <li key={user.id} style={liStyle}>
            <Link to={`/users/${user.id}`} style={divStyle}>{user.name}</Link>
            <div style={divStyle}>{user.blogs.length}</div>
          </li>
        )}
      </div>
    )
  }

  export default Users