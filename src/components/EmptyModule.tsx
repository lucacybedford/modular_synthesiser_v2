import React from "react";

interface EmptyModuleProps {
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void
    selectedSpace: number | null;
    id: number;
}

const EmptyModule = ( {onClick, selectedSpace, id}: EmptyModuleProps) => {
    return (
        <div className={"empty-module-space"} onClick={onClick} style = {
            {
                border: selectedSpace === id? "2px solid white": "none"
            }
        }></div>
    );
};

export default EmptyModule;