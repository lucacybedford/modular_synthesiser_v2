import React from "react";

interface SwitchProps {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Switch = ({onChange}: SwitchProps) => {
    return (
        <label className="switch">
            <input type="checkbox" className="checkbox" onChange={onChange}/>
            <div className="slider"></div>
        </label>
    );
};

export default Switch;