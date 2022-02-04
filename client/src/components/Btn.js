import React from "react";
import { Button as Sbtn } from "semantic-ui-react";

export function Btn({ btnInfo, btnColor, value, onClick, basic, disabled }) {
  return (
    <Sbtn
      basic={basic}
      size="small"
      color={btnColor}
      className="btns"
      value={value}
      onClick={onClick}
      disabled={disabled}
    >
      <Sbtn.Content>{btnInfo}</Sbtn.Content>
    </Sbtn>
  );
}
