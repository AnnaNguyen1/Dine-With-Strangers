import React from "react";
import { Modal as SModal } from "semantic-ui-react";

export function Modal({ trigger, content, basic, header, size }) {
  return (
    <SModal trigger={trigger} size={size} basic={basic}>
      <SModal.Header>{header}</SModal.Header>
      <SModal.Content>{content}</SModal.Content>
    </SModal>
  );
}
