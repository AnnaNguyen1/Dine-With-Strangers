import React from "react";
import { Modal as SModal } from "semantic-ui-react";

export function Modal({ trigger, content, basic, header, size, onOpen, open }) {
  return (
    <SModal
      trigger={trigger}
      size={size}
      basic={basic}
      onOpen={onOpen}
      open={open}
    >
      <SModal.Header>{header}</SModal.Header>
      <SModal.Content>{content}</SModal.Content>
    </SModal>
  );
}
