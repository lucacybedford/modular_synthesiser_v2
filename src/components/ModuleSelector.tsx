import React from 'react';
import ModuleItem from './ModuleItem';

const ModuleSelector: React.FC = () => {
    const modules = [
        { id: 'reverb', name: 'Reverb' },
        { id: 'delay', name: 'Delay' },
        { id: 'distortion', name: 'Distortion' },
        { id: 'phaser', name: 'Phaser' },
        { id: 'chorus', name: 'Chorus' },
        { id: 'widener', name: 'Widener' },
        // Add more modules here
    ];

    return (
        <div id={"module-selector-container"}>
            <div id={"module-selector"}>
                <div id={"scrollable-module-container"}>
                    <div className={"horizontal-module-container"}>
                        {modules.map(module => (
                            <ModuleItem key={module.id} id={module.id} name={module.name} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleSelector;