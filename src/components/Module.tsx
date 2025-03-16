import React from "react";


interface SwitchProps {
    selectedSpace: number | null;
    id: number;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
}

const Module = ({onClick, selectedSpace, id}: SwitchProps) => {
    return (
        <div className={"back-colour"} onClick={onClick}
             style={{
                outline: selectedSpace === id ? "2px solid white" : "none",
                outlineOffset: "2px",
                transition: "0.2s ease-in-out",
            }}>
            <div className={"outerblack"}>
                <div className="screen"></div>
                <div className="details"></div>
            </div>
        </div>
    );
};

export default Module;