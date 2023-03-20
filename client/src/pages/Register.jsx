import { useState } from 'react';
import InputForm from '../components/InputForm';
import axios from 'axios';

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

  return (
    <div className="mx-4 my-4">
      <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
      <form
        className="bg-white shadow-md rounded-sm mb-8 px-4 py-6"
        action=""
        method="post"
        onSubmit={handleSubmit}
      >
        <InputForm
          name="email"
          type="email"
          placeholder="Email"
          label="Email"
          htmlFor="email"
          value={inputs.email}
          onChange={handleInputChange}
        />
        <InputForm
          name="username"
          type="text"
          placeholder="Username"
          label="Username"
          htmlFor="username"
          value={inputs.username}
          onChange={handleInputChange}
        />
        <InputForm
          name="password"
          type="password"
          placeholder="********"
          label="Password"
          htmlFor="password"
          value={inputs.password}
          onChange={handleInputChange}
        />
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
