import React from "react";
import { Button as Sbtn } from "semantic-ui-react";

export function Btn({ btnInfo, btnColor, value, onClick, basic }) {
  return (
    <Sbtn
      basic={basic}
      size="small"
      color={btnColor}
      className="btns"
      value={value}
      onClick={onClick}
    >
      <Sbtn.Content>{btnInfo}</Sbtn.Content>
    </Sbtn>
  );
}
