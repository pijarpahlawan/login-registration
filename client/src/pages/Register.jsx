import { useState } from 'react';
import FormAuth from '../components/FormAuth';

function Register(props) {
  const [inputs, setInputs] = useState({
    email: '',
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
        `http://${props.hostname}:${props.port}/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(inputs),
        },
      );
      const parsedRes = await response.json();
      localStorage.setItem('token', parsedRes.token);
      props.setAuth(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const inputList = [
    {
      id: 1,
      htmlFor: 'email',
      label: 'Email',
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      value: inputs.email,
      onChange: handleInputChange,
    },
    {
      id: 2,
      htmlFor: 'username',
      label: 'Username',
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      value: inputs.username,
      onChange: handleInputChange,
    },
    {
      id: 3,
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
      tittleForm="Registration"
      onSubmit={handleSubmit}
      inputs={inputList}
      buttonContent="Register"
    />
  );
}

export default Register;
