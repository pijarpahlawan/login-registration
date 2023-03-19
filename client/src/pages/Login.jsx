function Login({ setAuth }) {
  return (
    <div>
      <h1>Login</h1>
      <button type="button" onClick={() => setAuth(true)}>
        Click Me To Authenticate
      </button>
    </div>
  );
}

export default Login;
