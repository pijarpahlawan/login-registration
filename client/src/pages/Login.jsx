import { useState } from "react";
import axios from "axios";
import FormAuth from "../components/FormAuth";

function Login(props) {
  const [inputs, setInputs] = useState({
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
        `http://${props.hostname}:${props.port}/auth/login`,
        {
          name: inputs.username,
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
      htmlFor: "username",
      label: "Username",
      name: "username",
      type: "text",
      placeholder: "Username",
      value: inputs.username,
      onChange: handleInputChange,
    },
    {
      id: 2,
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
      tittleForm="Login"
      onSubmit={handleSubmit}
      inputs={inputList}
      buttonContent="Login"
    />
  );
}

export default Login;
