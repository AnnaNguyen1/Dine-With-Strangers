import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Auth from "../utils/auth";
import logo from "../images/logo.jpg";

import React from "react";
import { Button, Image } from "semantic-ui-react";
import { Modal } from "./Modal";
import { Menu } from "./Menu";

const NavBar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <div className="logo">
            <Image src={logo} size="tiny" floated="left" />
            <h1>Dine with Strangers</h1>
          </div>
        </li>

        {Auth.loggedIn() ? (
          <>
            <li id="loggedInMenuItems">
              <Menu />
            </li>
          </>
        ) : (
          <>
            <li className="modals">
              <Modal
                trigger={<Button id="loginBtn">Log In</Button>}
                content={<LoginForm />}
              />
              <Modal
                trigger={
                  <Button basic color="teal" content="Blue" id="signupBtn">
                    Sign Up
                  </Button>
                }
                content={<SignupForm />}
              />
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
