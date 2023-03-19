function Register({ setAuth }) {
  return (
    <div className="">
      <h1>Register</h1>
      <button type="button" onClick={() => setAuth(true)}>
        Click Me To Authenticate
      </button>
    </div>
  );
}

export default Register;
