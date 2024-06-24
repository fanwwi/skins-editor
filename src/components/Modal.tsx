import React from "react";
const Modal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen: any;
  onClose: any;
  children: any;
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
