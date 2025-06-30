import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;

  .inputGroup {
    margin: 8px 0;

    label {
      display: block;
    }

    input {
      width: 97%;
      padding: 5px;
    }
  }
    
  button {
    align-self: flex-end;
    width: 100px;
  }
`

const Login = ({ submitHandler, username, updateUsername, password, updatePassword }) => (
  <Form onSubmit={submitHandler}>
    <h1>Log in to bloglist</h1>
    <div className="inputGroup">
        <label>username</label>
          <input 
            type="text"
            value={username}
            name="username"
            data-testid="username"
            onChange={({ target }) => updateUsername(target.value)}
          />
      </div>
      <div className="inputGroup">
        <label>password</label>
          <input
            type="password"
            value={password}
            name="password"
            data-testid="password"
            onChange={({ target }) => updatePassword(target.value)}
          />
      </div>
      <button type="submit">login</button>
  </Form>
)

export default Login