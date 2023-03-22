import { useState } from 'react';
import FormAuth from '../components/FormAuth';

function Login(props) {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://${props.hostname}:${props.port}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputs),
        },
      );
      const parsedRes = response.json();
      localStorage.setItem('token', parsedRes);
      props.setAuth(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const inputList = [
    {
      id: 1,
      htmlFor: 'username',
      label: 'Username',
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      value: inputs.username,
      onChange: handleInputChange,
    },
    {
      id: 2,
      htmlFor: 'password',
      label: 'Password',
      name: 'password',
      type: 'password',
      placeholder: '*********',
      value: inputs.password,
      onChange: handleInputChange,
    },
  ];

  return (
    <FormAuth
      tittleForm="Login"
      onSubmit={handleSubmit}
      inputs={inputList}
      buttonContent="Login"
    />
  );
}

export default Login;
