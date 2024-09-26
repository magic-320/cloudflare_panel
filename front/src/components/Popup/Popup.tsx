import React, { useState } from "react";
import "./Popup.css"; // Import CSS for styling

interface PopupProps {
    message: string;
    onConfirm: () => void; // Update to accept the number as an argument
    onCancel: () => void;
}

const Popup: React.FC<PopupProps> = ({
    message,
    onConfirm,
    onCancel,
}) => {

    return (
        <div className="popup-overlay">
            <div className="popup-modal-content">
                <h3 style={{ color: "#fff" }}>{message}</h3>
                <div className="popup-buttons">
                    <button className="popup-button confirm" onClick={onConfirm}>
                        Confirm
                    </button>
                    <button className="popup-button cancel" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Popup;
