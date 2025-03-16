import React from "react";

interface SwitchProps {
    colour: string;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
}

const EffectModule = ({ colour, onClick }: SwitchProps) => {
    const backColourStyle = {
        backgroundColor: colour,
    };

    return (
        <div>
            <div className={"back-colour"} style={backColourStyle} onClick={onClick}>
                <div className={"outerblack"}>
                    <div className="screen"></div>
                    <div className="details">  </div>
                </div>
            </div>
        </div>
    );
};

export default EffectModule;