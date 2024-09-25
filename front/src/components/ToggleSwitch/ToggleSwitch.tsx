import React, { useState } from "react";
import './ToggleSwitch.css';  // Import CSS styles

interface ToggleSwitchProps {
    onToggle: (isOn: boolean) => void;  // Function to handle state change
    onArchive: (isOn: boolean) => void;  // Function to handle state change
    initialStatus: boolean;
    disable: boolean;

}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ onToggle, onArchive, initialStatus, disable }) => {
    const [isOn, setIsOn] = useState(initialStatus);

    const toggleSwitch = () => {
        setIsOn(!isOn);
        onToggle(!isOn);  // Pass the updated state to the parent component
        onArchive(!isOn)
    };

    return (
        <div className="switch-container">
            <label className="switch">
                <input className="switch-toggle" type="checkbox" checked={isOn} onChange={toggleSwitch}
                    disabled={disable} />
                <span className={isOn ? "slider round" : "slider round offslider"}></span>
            </label>
        </div>
    );
};

export default ToggleSwitch;
