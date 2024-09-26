// Modal.tsx
import React from 'react';
import './Modal.css'; // Add necessary styles for modal

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  children: React.ReactNode;
  domainurl: string;
}

const Modal: React.FC<ModalProps> = ({ show, handleClose, children, domainurl }) => {
  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0px 20px" }}>
          <p className='domain_url'>{domainurl}</p>
          <span className="close" onClick={handleClose}>
            &times;
          </span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
