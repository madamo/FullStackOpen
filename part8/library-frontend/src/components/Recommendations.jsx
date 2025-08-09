import { ME } from '../queries'
import { useQuery } from '@apollo/client'

const Recommendations = () => {

  const user = useQuery(ME)
  console.log(user)
  
  return (
    <div>showing books with genre {user.data.me.favoriteGenre}</div>
  )
}

export default Recommendations