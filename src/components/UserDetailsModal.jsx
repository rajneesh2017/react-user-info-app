import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  border-radius: 8px;
  outline: none;
`;

const CloseButton = styled.button`
  float: right;
  font-size: 1.5rem;
  border: none;
  background: transparent;
  cursor: pointer;
`;

export default function UserDetailsModal({ user, onClose }) {
  if (!user) return null;

  return (
    <Overlay
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
      onClick={onClose} // close on overlay click
    >
      <ModalContent
        onClick={(e) => e.stopPropagation()} // prevent closing on modal click
        tabIndex={0}
      >
        <CloseButton onClick={onClose} aria-label="Close modal">
          &times;
        </CloseButton>
        <h2 id="modal-title">{user.name}</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Company:</strong> {user.company?.name}
        </p>
        <p>
          <strong>Address:</strong>{" "}
          {`${user.address?.suite}, ${user.address?.street}, ${user.address?.city}, ${user.address?.zipcode}`}
        </p>
      </ModalContent>
    </Overlay>
  );
}
