import React from 'react';
import Button from "../mini/Button";
import Modal from "./Modal";

const CartModal = ({isOpen, onClose, onConfirm, desc, buttonChild,loading}) => {

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="small"
    >
      <div className="modal-content">
        <h3 className="modal-content_title">{desc}</h3>
        {buttonChild
          &&
          <div className="modal-actions">
            <Button
              onClick={onConfirm}
              className="active-button confirm"
              loading={loading}
            >
              {buttonChild}
            </Button>

            <Button onClick={onClose} className="cancel-btn">Cancel</Button>
          </div>
        }
      </div>
    </Modal>
  );
};

export default CartModal;
