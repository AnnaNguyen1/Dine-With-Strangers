import React, { useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);

  const handleInputChange = (event) => {
    setError(false);
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({ variables: { ...userFormData } });
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setError(true);
    }

    if (error !== true) {
      setUserFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <Form size="small" onSubmit={handleFormSubmit}>
      <h2>Sign Up</h2>
      <p>Can't wait for you to join in on the fun!</p>
      {error === true ? (
        <Message negative>
          <Message.Header>Error</Message.Header>
          <p>
            Invalid email address and/or password needs to exceed 5 characters!
          </p>
        </Message>
      ) : (
        ""
      )}
      <Form.Input
        label="First Name"
        type="text"
        placeholder="Joe"
        name="firstName"
        onChange={handleInputChange}
        value={userFormData.firstName}
      />

      <Form.Input
        label="Last Name"
        type="text"
        placeholder="Briggs"
        name="lastName"
        onChange={handleInputChange}
        value={userFormData.lastName}
      />

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
        disabled={
          !(
            userFormData.firstName &&
            userFormData.lastName &&
            userFormData.email &&
            userFormData.password
          )
        }
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
};

export default SignupForm;
