import React from "react";
import { Link } from "react-router-dom";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Auth from "../utils/auth";

import { Button, Menu } from "semantic-ui-react";

const MenuExampleButtons = () => (
  <Menu inverted size="tiny">
    <Menu.Item>Dine with Strangers</Menu.Item>

    <Menu.Menu position="right">
      <Menu.Item>
        <Button primary>Sign up</Button>
      </Menu.Item>

      <Menu.Item>
        <Button>Log-in</Button>
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

export default MenuExampleButtons;
