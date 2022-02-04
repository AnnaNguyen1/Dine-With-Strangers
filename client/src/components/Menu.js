import React, { useState } from "react";
import { Menu as Smenu } from "semantic-ui-react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

export function Menu() {
  const [state, setState] = useState({ activeItem: "My Events" });

  const handleItemClick = (e, { name }) => setState({ activeItem: name });

  const { activeItem } = state;

  return (
    <Smenu secondary>
      <Smenu.Menu position="right">
        <Smenu.Item
          name="Home"
          active={activeItem === "My Events"}
          onClick={handleItemClick}
          as={Link}
          to="/profile"
        />
        <Smenu.Item
          name="Log Out"
          active={activeItem === "Log Out"}
          onClick={Auth.logout}
        />
      </Smenu.Menu>
    </Smenu>
  );
}
