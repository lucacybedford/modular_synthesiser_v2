import React from 'react';
import EffectModule from "./EffectModule.tsx";
import '../stylesheets/ModuleSelector.css';


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
                        <div className={"full-module-container"}>
                            <div className={"coloured-module-container"}
                                draggable={true}
                                onDragStart={(e) => handleDragStart(e, "highpass")}
                            >
                                <EffectModule colour={"#81a5d3"}/>
                            </div>
                            <label className={"module-label"}>Highpass</label>
                        </div>
                        <div className={"full-module-container"}>
                            <div className={"coloured-module-container"}
                                 draggable={true}
                                 onDragStart={(e) => handleDragStart(e, "lowpass")}
                            >
                                <EffectModule colour={"#2f5b91"}/>

                            </div>
                            <label className={"module-label"}>Lowpass</label>
                        </div>
                    </div>

                    <div className={"horizontal-module-container"}>
                        <div className={"full-module-container"}>
                            <div className={"coloured-module-container"}
                                 draggable={true}
                                 onDragStart={(e) => handleDragStart(e, "bandpass")}
                            >
                                <EffectModule colour={"#25849a"}/>
                            </div>
                            <label className={"module-label"}>Bandpass</label>
                        </div>
                        <div className={"full-module-container"}>
                            <div className={"coloured-module-container"}
                                 draggable={true}
                                 onDragStart={(e) => handleDragStart(e, "notch")}
                            >
                                <EffectModule colour={"#27b8b8"}/>

                            </div>
                            <label className={"module-label"}>Notch</label>
                        </div>
                    </div>

                    <div className={"horizontal-module-container"}>
                        <div className={"full-module-container"}>
                            <div className={"coloured-module-container"}
                                 draggable={true}
                                 onDragStart={(e) => handleDragStart(e, "delay")}
                            >
                                <EffectModule colour={"#d33950"}/>
                            </div>
                            <label className={"module-label"}>Delay</label>
                        </div>
                        <div className={"full-module-container"}>
                            <div className={"coloured-module-container"}
                                 draggable={true}
                                 onDragStart={(e) => handleDragStart(e, "reverb")}
                            >
                                <EffectModule colour={"#811030"}/>

                            </div>
                            <label className={"module-label"}>Reverb</label>
                        </div>
                    </div>


                    <div className={"horizontal-module-container"}>
                        <div className={"full-module-container"}>
                            <div className={"coloured-module-container"}
                                 draggable={true}
                                 onDragStart={(e) => handleDragStart(e, "feedback")}
                            >
                                <EffectModule colour={"#c6682e"}/>
                            </div>
                            <label className={"module-label"}>Feedback</label>
                        </div>
                        <div className={"full-module-container"}>
                            <div className={"coloured-module-container"}
                                 draggable={true}
                                 onDragStart={(e) => handleDragStart(e, "pingpong")}
                            >
                                <EffectModule colour={"#633a0f"}/>

                            </div>
                            <label className={"module-label"}>PingPong</label>
                        </div>
                    </div>

                    <div className={"horizontal-module-container"}>
                        <div className={"full-module-container"}>
                            <div className={"coloured-module-container"}
                                 draggable={true}
                                 onDragStart={(e) => handleDragStart(e, "chorus")}
                            >
                                <EffectModule colour={"#13ca78"}/>
                            </div>
                            <label className={"module-label"}>Chorus</label>
                        </div>
                        <div className={"full-module-container"}>
                            <div className={"coloured-module-container"}
                                 draggable={true}
                                 onDragStart={(e) => handleDragStart(e, "distortion")}
                            >
                                <EffectModule colour={"#4f2385"}/>

                            </div>
                            <label className={"module-label"}>Distortion</label>
                        </div>
                    </div>

                    <div className={"horizontal-module-container"}>
                        <div className={"full-module-container"}>
                            <div className={"coloured-module-container"}
                                 draggable={true}
                                 onDragStart={(e) => handleDragStart(e, "wah")}
                            >
                                <EffectModule colour={"#c8b746"}/>
                            </div>
                            <label className={"module-label"}>Wah</label>
                        </div>
                        <div className={"full-module-container"}>
                            <div className={"coloured-module-container"}
                                 draggable={true}
                                 onDragStart={(e) => handleDragStart(e, "phaser")}
                            >
                                <EffectModule colour={"#804b4b"}/>

                            </div>
                            <label className={"module-label"}>Phaser</label>
                        </div>
                    </div>

                    <div className={"horizontal-module-container"}>
                        <div className={"full-module-container"}>
                            <div className={"coloured-module-container"}
                                 draggable={true}
                                 onDragStart={(e) => handleDragStart(e, "widener")}
                            >
                                <EffectModule colour={"#d1a38f"}/>
                            </div>
                            <label className={"module-label"}>Widener</label>
                        </div>
                        <div className={"full-module-container"}>
                            <div className={"coloured-module-container"}
                                 draggable={true}
                                 onDragStart={(e) => handleDragStart(e, "vibrato")}
                            >
                                <EffectModule colour={"#bc0bac"}/>

                            </div>
                            <label className={"module-label"}>Vibrato</label>
                        </div>
                    </div>

                    <div className={"horizontal-module-container"}>
                        <div className={"full-module-container"}>
                            <div className={"coloured-module-container"}
                                 draggable={true}
                                 onDragStart={(e) => handleDragStart(e, "bitcrusher")}
                            >
                                <EffectModule colour={"#8fd1b3"}/>
                            </div>
                            <label className={"module-label"}>Bitcrusher</label>
                        </div>
                        <div className={"full-module-container"}>
                            <div className={"coloured-module-container"}
                                 draggable={true}
                                 onDragStart={(e) => handleDragStart(e, "chebyshev")}
                            >
                                <EffectModule colour={"#e1df7a"}/>

                            </div>
                            <label className={"module-label"}>Chebyshev</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleSelector;