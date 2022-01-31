import { Link } from "react-router-dom";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Auth from "../utils/auth";
import logo from "../images/logo.jpg";

import React, { useState } from "react";
import { Button, Modal, Image } from "semantic-ui-react";

const NavBar = () => {
  const [open, setOpen] = useState(false);

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
            <li>
              <h3 as={Link} to="/">
                Events Near Me
              </h3>
            </li>
            <li>
              <h3 as={Link} to="/profile">
                Profile
              </h3>
            </li>
            <li>
              <h3 onClick={Auth.logout}>Log Out</h3>
            </li>
          </>
        ) : (
          <li className="modals">
            <Modal
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={<Button>Login</Button>}
            >
              <Modal.Content>
                <LoginForm handleModalClose={() => setOpen(false)} />
              </Modal.Content>
            </Modal>
            <Modal
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
              open={open}
              trigger={
                <Button basic color="teal" content="Blue">
                  Signup
                </Button>
              }
            >
              <Modal.Content>
                <SignupForm handleModalClose={() => setOpen(false)} />
              </Modal.Content>
            </Modal>
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
