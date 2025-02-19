import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import ReverbModule from './ReverbModule';
import DelayModule from './DelayModule';
import DistortionModule from "./DistortionModule";
import PhaserModule from "./PhaserModule";
import ChorusModule from "./ChorusModule";
import WidenerModule from "./WidenerModule";

interface ModuleSlotProps {
    index: number;
    moduleId: string | null;
    onDrop: (item: { id: string }) => void;
}

const ModuleSlot: React.FC<ModuleSlotProps> = ({ index, moduleId, onDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.MODULE,
        drop: (item: { id: string }) => onDrop(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }), [onDrop]);

    const renderModule = () => {
        switch (moduleId) {
            case 'reverb':
                return <ReverbModule />;
            case 'delay':
                return <DelayModule />;
            case 'distortion':
                return <DistortionModule/>;
            case 'phaser':
                return <PhaserModule/>;
            case 'chorus':
                return <ChorusModule/>;
            case 'widener':
                return <WidenerModule/>;
            default:
                return <div className={"empty-module-space"}></div>
        }
    };

    return (
        <div ref={drop} className={"module-space"} style={{ backgroundColor: isOver ? 'lightgreen' : 'transparent' }}>
            {renderModule()}
        </div>
    );
};

export default ModuleSlot;