import React, {memo, useCallback, useEffect, useState} from 'react';
import {createPortal} from "react-dom";
import {ReactComponent as XIcon} from "../../assets/icon/close-x.svg";
import PropTypes from "prop-types";

const Modal = memo(({children, isOpen, onClose, className}) => {
  const [showModal, setShowModal] = useState(false);

  const handleEsc = useCallback((e) => {
    if (e.keyCode === 27) {
      onClose()
    }
  }, [])

  const closeModal = () => {
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("width");
    document.body.ontouchmove = () => true;
    document.removeEventListener("keydown", handleEsc);
  };

  useEffect(() => {
    setTimeout(() => setShowModal(isOpen));

    if (isOpen) {
      document.body.style.width = `${document.body.getBoundingClientRect().width}px`;
      document.body.style.overflowY = "hidden";
      document.body.ontouchmove = () => false;
      window.addEventListener("keydown", handleEsc);
    } else {
      closeModal()
    }
  }, [isOpen]);

  useEffect(() => {
    closeModal()
  }, []);


  return isOpen && createPortal(
    <div className="modal">
      <div className="modal__container" onClick={onClose}></div>
      <div  className={`modal__content ${className}`}
      >
        <div className="modal__content__block">
          <div className="close__button">
            <XIcon className="close__modal" onClick={onClose}></XIcon>
          </div>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("root")
  )
})

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
}



export default Modal;
