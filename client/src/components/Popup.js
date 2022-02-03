import React from "react";
import { Popup } from "semantic-ui-react";

export function PopUp({ trigger, content }) {
  return <Popup trigger={trigger} content={content} size="tiny" />;
}
