import React from "react";
import { Modal as SModal } from "semantic-ui-react";

export function Modal({ trigger, content }) {
  return (
    <SModal trigger={trigger}>
      <SModal.Content>{content}</SModal.Content>
    </SModal>
  );
}
