import React from 'react';

interface ModuleSelectorProps {
    onModuleSelect: (moduleType: string) => void;
}

const ModuleSelector = ({ onModuleSelect }: ModuleSelectorProps) => {

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>, moduleType: string) => {
        event.dataTransfer.setData("moduleType", moduleType);
        event.dataTransfer.effectAllowed = "move";
        onModuleSelect(moduleType);
    };

    return (
        <div id={"module-selector-container"}>
            <div id={"module-selector"}>
                <div id={"scrollable-module-container"}>
                    <div className={"horizontal-module-container"}>
                        <div className={"mock-module"}
                             key={"delay"}
                             draggable={true}
                             onDragStart={(e) => handleDragStart(e, "delay")}>Delay</div>
                        <div className={"mock-module"}
                             key={"reverb"}
                             draggable={true}
                             onDragStart={(e) => handleDragStart(e, "reverb")}>Reverb</div>
                    </div>

                    <div className={"horizontal-module-container"}>
                        <div className={"mock-module"}
                             key={"feedback"}
                             draggable={true}
                             onDragStart={(e) => handleDragStart(e, "feedback")}>Feedback</div>
                        <div className={"mock-module"}
                             key={"pingpong"}
                             draggable={true}
                             onDragStart={(e) => handleDragStart(e, "pingpong")}>PingPong</div>
                    </div>

                    <div className={"horizontal-module-container"}>
                        <div className={"mock-module"}
                             key={"chorus"}
                             draggable={true}
                             onDragStart={(e) => handleDragStart(e, "chorus")}>Chorus</div>
                        <div className={"mock-module"}
                             key={"distortion"}
                             draggable={true}
                             onDragStart={(e) => handleDragStart(e, "distortion")}>Distortion</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleSelector;