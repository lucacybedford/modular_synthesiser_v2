import React from "react";
import BoardModule from "./BoardModule.tsx";
import "../stylesheets/module.css";

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

    if (moduleType) {
        return (
            <div
                className={"empty-module-space"}
                onClick={onClick}
                style={{
                    outline: selectedSpace === id ? "2px solid white" : "none",
                    outlineOffset: "2px",
                    transition: "0.2s ease-in-out",
                }}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onContextMenu={onContextMenu}
            >
                <BoardModule moduleType={moduleType}/>
            </div>
        )
    } else {
        return (
            <div
                className={"empty-module-space"}
                onClick={onClick}
                style={{
                    // border: "2px solid black",
                    border: "2px solid #67554a",
                    outline: selectedSpace === id ? "2px solid white" : "none",
                    outlineOffset: "2px",
                    transition: "0.2s ease-in-out",
                }}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onContextMenu={onContextMenu}
            />
        )
    }
};

export default EmptyModule;