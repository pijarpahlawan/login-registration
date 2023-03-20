import { useState } from 'react';
import axios from 'axios';
import FormAuth from '../components/FormAuth';

function Register({ setAuth }) {
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
      const response = await axios.post(
        `http://localhost:8000/auth/register`,
        {
          name: inputs.username,
          email: inputs.email,
          password: inputs.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      localStorage.setItem('token', response.data.token);
      setAuth(true);
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
      inputs={inputList}
      tittleForm="Registration"
      onSubmit={handleSubmit}
      buttonContent="Register"
    />
  );
}

export default Register;
