import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

interface ModuleItemProps {
    id: string;
    name: string;
}

const ModuleItem: React.FC<ModuleItemProps> = ({ id, name }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.MODULE,
        item: { id: id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }), [id]);

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
                border: '1px solid black',
                padding: '8px',
                margin: '4px',
                backgroundColor: 'white',
            }}
        >
            {name}
        </div>
    );
};

export default ModuleItem;