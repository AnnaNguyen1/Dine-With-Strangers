import React from "react";
import { Button as Sbtn } from "semantic-ui-react";

export function Btn({ btnContent }) {
  return (
    <Sbtn size="small">
      <Sbtn.Content>{btnContent}</Sbtn.Content>
    </Sbtn>
  );
}
