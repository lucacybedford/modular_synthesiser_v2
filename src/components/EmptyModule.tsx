import React from "react";

interface EmptyModuleProps {
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    selectedSpace: number | null;
    id: number;
    moduleType: string | null;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    onContextMenu: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const EmptyModule = ({onClick, selectedSpace, id, moduleType, onDrop, onDragOver, onContextMenu}: EmptyModuleProps) => {


    return (
        <div
            className={"empty-module-space"}
            onClick={onClick}
            style={{
                border: selectedSpace === id ? "2px solid white" : "2px solid #67554a"
            }}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onContextMenu={onContextMenu}
        >
            {moduleType ? (
                <div>
                    {moduleType} Module
                </div>
            ) : (
                "Empty"
            )}
        </div>
    );
};

export default EmptyModule;