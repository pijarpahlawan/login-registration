import { useState } from "react";
import axios from "axios";
import FormAuth from "../components/FormAuth";

function Register(props) {
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://${props.hostname}:${props.port}/auth/register`,
        {
          name: inputs.username,
          email: inputs.email,
          password: inputs.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", response.data.token);
      props.setAuth(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const inputList = [
    {
      id: 1,
      htmlFor: "email",
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Email",
      value: inputs.email,
      onChange: handleInputChange,
    },
    {
      id: 2,
      htmlFor: "username",
      label: "Username",
      name: "username",
      type: "text",
      placeholder: "Username",
      value: inputs.username,
      onChange: handleInputChange,
    },
    {
      id: 3,
      htmlFor: "password",
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "*********",
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
