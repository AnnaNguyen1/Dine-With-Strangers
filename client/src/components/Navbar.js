// import { Link } from "react-router-dom";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
// import Auth from "../utils/auth";

import React, { useState } from "react";
import { Button, Modal } from "semantic-ui-react";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="navbar">
      <ul>
        <li>
          <h1>Dine with Strangers</h1>
        </li>
        <li>
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
            trigger={<Button primary>Signup</Button>}
          >
            <Modal.Content>
              <SignupForm handleModalClose={() => setOpen(false)} />
            </Modal.Content>
          </Modal>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
