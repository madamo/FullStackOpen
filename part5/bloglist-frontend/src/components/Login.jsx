const Login = ({ submitHandler, username, updateUsername, password, updatePassword }) => (
  <form onSubmit={submitHandler}>
    <h1>Log in to bloglist</h1>
    <div>
        username
          <input 
            type="text"
            value={username}
            name="username"
            data-testid="username"
            onChange={({ target }) => updateUsername(target.value)}
          />
      </div>
      <div>
        password
          <input
            type="password"
            value={password}
            name="password"
            data-testid="password"
            onChange={({ target }) => updatePassword(target.value)}
          />
      </div>
      <button type="submit">login</button>
  </form>
)

export default Login