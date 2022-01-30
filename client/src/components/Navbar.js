import { Link } from "react-router-dom";
import SignUpForm from "./SignupForm";
import LoginForm from "./LoginForm";
import Auth from "../utils/auth";

import React, { Component } from "react";
import { Menu, Button } from "semantic-ui-react";

export default class NavBar extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <>
        <Menu inverted borderless size="small">
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          >
            Dine with Strangers
          </Menu.Item>
          <Menu.Menu position="right">
            {/* User Logged in, show different nav items*/}
            {Auth.loggedIn() ? (
              <>
                <Menu.Item
                  name="home"
                  active={activeItem === "home"}
                  onClick={this.handleItemClick}
                  as={Link}
                  to="/"
                >
                  Events Near Me
                </Menu.Item>
                <Menu.Item
                  name="profile"
                  active={activeItem === "profile"}
                  onClick={this.handleItemClick}
                  as={Link}
                  to="/profile"
                >
                  My Events
                </Menu.Item>

                <Menu.Item>
                  <Button>Log Out</Button>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item>
                  <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={<Button primary>Login/Signup</Button>}
                  >
                    <Modal.Content>
                      <LoginForm />
                    </Modal.Content>
                  </Modal>
                </Menu.Item>
              </>
            )}
          </Menu.Menu>
        </Menu>
      </>
    );
  }
}
