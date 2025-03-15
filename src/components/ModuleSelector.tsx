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
                             key={"highpass"}
                             draggable={true}
                             onDragStart={(e) => handleDragStart(e, "highpass")}>Highpass</div>
                        <div className={"mock-module"}
                             key={"lowpass"}
                             draggable={true}
                             onDragStart={(e) => handleDragStart(e, "lowpass")}>Lowpass</div>
                    </div>

                    <div className={"horizontal-module-container"}>
                        <div className={"mock-module"}
                             key={"bandpass"}
                             draggable={true}
                             onDragStart={(e) => handleDragStart(e, "bandpass")}>Bandpass</div>
                        <div className={"mock-module"}
                             key={"notch"}
                             draggable={true}
                             onDragStart={(e) => handleDragStart(e, "notch")}>Notch</div>
                    </div>

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

                    <div className={"horizontal-module-container"}>
                        <div className={"mock-module"}
                             key={"wah"}
                             draggable={true}
                             onDragStart={(e) => handleDragStart(e, "wah")}>Wah</div>
                        <div className={"mock-module"}
                             key={"phaser"}
                             draggable={true}
                             onDragStart={(e) => handleDragStart(e, "phaser")}>Phaser</div>
                    </div>

                    <div className={"horizontal-module-container"}>
                        <div className={"mock-module"}
                             key={"widener"}
                             draggable={true}
                             onDragStart={(e) => handleDragStart(e, "widener")}>Widener</div>
                        <div className={"mock-module"}
                             key={"vibrato"}
                             draggable={true}
                             onDragStart={(e) => handleDragStart(e, "vibrato")}>Vibrato</div>
                    </div>

                    <div className={"horizontal-module-container"}>
                        <div className={"mock-module"}
                             key={"bitcrusher"}
                             draggable={true}
                             onDragStart={(e) => handleDragStart(e, "bitcrusher")}>BitCrusher</div>
                        <div className={"mock-module"}
                             key={"chebyshev"}
                             draggable={true}
                             onDragStart={(e) => handleDragStart(e, "chebyshev")}>Chebyshev</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleSelector;