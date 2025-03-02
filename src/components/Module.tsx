import React from "react";


interface SwitchProps {
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
}

const Module = ({onClick}: SwitchProps) => {
    return (
        <div className={"back-colour"} onClick={onClick}>
            <div className={"outerblack"}>
                <div className="screen"></div>
                <div className="details"></div>
            </div>
        </div>
    );
};

export default Module;