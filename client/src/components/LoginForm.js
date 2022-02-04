import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { LOGIN_USER } from "../utils/mutations";
import { Button, Form, Message } from "semantic-ui-react";

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [login] = useMutation(LOGIN_USER);
  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    setError(false);
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({ variables: { ...userFormData } });
      Auth.login(data.login.token);
    } catch (err) {
      setError(true);
      console.log(err);
    }

    setUserFormData({
      email: "",
      password: "",
    });
  };
  return (
    <Form size="small" onSubmit={handleFormSubmit}>
      {error === true ? (
        <Message negative size="tiny">
          <Message.Header>Error</Message.Header>
          <p>Incorrect credentials!</p>
        </Message>
      ) : null}

      <Form.Input
        label="Email"
        type="text"
        placeholder="joebriggs@test.com"
        name="email"
        onChange={handleInputChange}
        value={userFormData.email}
      />
      <Form.Input
        label="Password"
        type="password"
        placeholder="*******"
        name="password"
        onChange={handleInputChange}
        value={userFormData.password}
      />

      <Button
        disabled={!(userFormData.email && userFormData.password)}
        type="submit"
      >
        Log In
      </Button>
    </Form>
  );
};

export default LoginForm;
