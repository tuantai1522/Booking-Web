import styled from "styled-components";

import CloseIcon from "@mui/icons-material/Close";

import { createPortal } from "react-dom";

import { cloneElement, createContext, useContext, useState } from "react";
import { Button } from "@mui/material";
import { useOutsideModalClick } from "../hooks/useOutsideModalClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const ModalContext = createContext();

//1.Parent Component
const Modal = ({ children }) => {
  const [currentWindowName, setCurrentWindowName] = useState("");

  const open = setCurrentWindowName;
  const close = () => setCurrentWindowName("");

  return (
    <ModalContext.Provider value={{ currentWindowName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
};

//2.Children Component
const Open = ({ children, openWindowName }) => {
  const { open } = useContext(ModalContext);

  //Truyền hàm open qua cho Button trong thẻ Open sài cloneElement
  return cloneElement(children, {
    onClick: () => open(openWindowName),
  });
};

const Window = ({ children, windowName }) => {
  const { currentWindowName, close } = useContext(ModalContext);

  const ref = useOutsideModalClick(close);

  if (windowName !== currentWindowName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button
          style={{ position: "absolute", top: "0", right: "0" }}
          onClick={close}
        >
          <CloseIcon />
        </Button>

        {/* Truyền close function để toàn bộ childComponent có thể sài */}
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,

    // body is parent of this jsx element document.body );
    document.body
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
