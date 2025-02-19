import React, { useState, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import ModuleSlot from './ModuleSlot';
import { ItemTypes } from './ItemTypes';

interface ModuleBoardProps {
    moduleBoard: string[];
    setModuleBoard: React.Dispatch<React.SetStateAction<string[]>>;
}

const ModuleBoard: React.FC<ModuleBoardProps> = ({ moduleBoard, setModuleBoard }) => {
    const handleDrop = useCallback(
        (index: number, item: { id: string }) => {
            setModuleBoard(prevBoard => {
                const newBoard = [...prevBoard];
                newBoard[index] = item.id;
                return newBoard;
            });
        },
        [setModuleBoard]
    );

    const renderSlot = (i: number) => {
        return (
            <div className={"module-line"}>
                <div className={"checkbox-container"}>
                    <label className="switch">
                        <input type="checkbox" className="checkbox"/>
                        <div className="slider"></div>
                    </label>
                </div>
                <div className={"module-container"}>
                    <ModuleSlot
                        index={i}
                        moduleId={moduleBoard[i]}
                        onDrop={item => handleDrop(i, item as { id: string })}
                    />
                </div>
            </div>
        );
    };

    return (
        <div id={"module-board-container"}>
            <div id={"module-board"}>
                {renderSlot(0)}
                <div className={"separator"}></div>
                {renderSlot(1)}
                <div className={"separator"}></div>
                {renderSlot(2)}
                <div className={"separator"}></div>
                {renderSlot(3)}
                <div className={"separator"}></div>
                {renderSlot(4)}
                <div className={"separator"}></div>
                {renderSlot(5)}
            </div>
        </div>
    );
};

export default ModuleBoard;