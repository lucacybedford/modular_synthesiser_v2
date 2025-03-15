import React from "react";
import Switch from "./Switch.tsx";
import Module from "./Module";
import EmptyModule from "./EmptyModule";
import { synth1, synth2, synth3 } from "../utils/audio.tsx";
import { Synthesiser } from "../Synthesiser.tsx";

interface ModuleBoardProps {
    onSynthSelect: (synth: Synthesiser) => void;
    selectedSpace: number | null;
    onSpaceSelect: (id: number) => void;
    modules: { [key: number]: string | null };
    addModule: (spaceId: number, moduleType: string) => void;
    removeModule: (spaceId: number) => void;
}

const ModuleBoard = ({ onSynthSelect, selectedSpace, onSpaceSelect, modules, addModule, removeModule }: ModuleBoardProps) => {

    const handleDrop = (event: React.DragEvent<HTMLDivElement>, spaceId: number) => {
        event.preventDefault();
        const moduleType = event.dataTransfer.getData("moduleType");
        console.log(`Module ${moduleType} dropped on space ${spaceId}`);

        if (moduleType) {
            addModule(spaceId, moduleType);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>, spaceId: number) => {
        event.preventDefault();
        removeModule(spaceId);
    };


    return (
        <div id={"module-board-container"}>
            <div id={"module-board"}>
                <div className={"module-line"}>
                    <div className={"checkbox-container"}>
                        <Switch onChange={
                            (e) => {
                                if (e.target.checked) {
                                    synth1.turnOn();
                                    synth1.updateSynth();
                                    onSynthSelect(synth1);
                                }
                                else {
                                    synth1.turnOff();
                                    synth1.updateSynth();
                                }
                            }
                        } />
                    </div>
                    <div className={"module-container"}>
                        <Module onClick={
                            () => {
                                onSynthSelect(synth1);
                            }
                        }></Module>
                        <EmptyModule
                            onClick={() => onSpaceSelect(1)}
                            selectedSpace={selectedSpace}
                            id={1}
                            moduleType={modules[1]}
                            onDrop={(e) => handleDrop(e, 1)}
                            onDragOver={handleDragOver}
                            onContextMenu={(e) => handleContextMenu(e, 1)}
                        />
                        <EmptyModule
                            onClick={() => onSpaceSelect(2)}
                            selectedSpace={selectedSpace}
                            id={2}
                            moduleType={modules[2]}
                            onDrop={(e) => handleDrop(e, 2)}
                            onDragOver={handleDragOver}
                            onContextMenu={(e) => handleContextMenu(e, 2)}
                        />
                        <EmptyModule
                            onClick={() => onSpaceSelect(3)}
                            selectedSpace={selectedSpace}
                            id={3}
                            moduleType={modules[3]}
                            onDrop={(e) => handleDrop(e, 3)}
                            onDragOver={handleDragOver}
                            onContextMenu={(e) => handleContextMenu(e, 3)}
                        />
                        <EmptyModule
                            onClick={() => onSpaceSelect(4)}
                            selectedSpace={selectedSpace}
                            id={4}
                            moduleType={modules[4]}
                            onDrop={(e) => handleDrop(e, 4)}
                            onDragOver={handleDragOver}
                            onContextMenu={(e) => handleContextMenu(e, 4)}
                        />
                        <EmptyModule
                            onClick={() => onSpaceSelect(5)}
                            selectedSpace={selectedSpace}
                            id={5}
                            moduleType={modules[5]}
                            onDrop={(e) => handleDrop(e, 5)}
                            onDragOver={handleDragOver}
                            onContextMenu={(e) => handleContextMenu(e, 5)}
                        />
                        <EmptyModule
                            onClick={() => onSpaceSelect(6)}
                            selectedSpace={selectedSpace}
                            id={6}
                            moduleType={modules[6]}
                            onDrop={(e) => handleDrop(e, 6)}
                            onDragOver={handleDragOver}
                            onContextMenu={(e) => handleContextMenu(e, 6)}
                        />

                        <div className={"module-space"}></div>
                    </div>
                </div>
                <div className={"separator"}></div>
                <div className={"module-line"}>
                    <div className={"checkbox-container"}>
                        <Switch onChange={
                            (e) => {
                                if (e.target.checked) {
                                    synth2.turnOn();
                                    synth2.updateSynth();
                                    onSynthSelect(synth2);
                                }
                                else {
                                    synth2.turnOff();
                                    synth2.updateSynth();
                                }
                            }
                        } />
                    </div>
                    <div className={"module-container"}>
                        <Module onClick={
                            () => {
                                onSynthSelect(synth2);
                            }
                        }></Module>
                        <EmptyModule
                            onClick={() => onSpaceSelect(7)}
                            selectedSpace={selectedSpace}
                            id={7}
                            moduleType={modules[7]}
                            onDrop={(e) => handleDrop(e, 7)}
                            onDragOver={handleDragOver}
                            onContextMenu={(e) => handleContextMenu(e, 7)}
                        />
                        <EmptyModule
                            onClick={() => onSpaceSelect(8)}
                            selectedSpace={selectedSpace}
                            id={8}
                            moduleType={modules[8]}
                            onDrop={(e) => handleDrop(e, 8)}
                            onDragOver={handleDragOver}
                            onContextMenu={(e) => handleContextMenu(e, 8)}
                        />
                        <EmptyModule
                            onClick={() => onSpaceSelect(9)}
                            selectedSpace={selectedSpace}
                            id={9}
                            moduleType={modules[9]}
                            onDrop={(e) => handleDrop(e, 9)}
                            onDragOver={handleDragOver}
                            onContextMenu={(e) => handleContextMenu(e, 9)}
                        />
                        <EmptyModule
                            onClick={() => onSpaceSelect(10)}
                            selectedSpace={selectedSpace}
                            id={10}
                            moduleType={modules[10]}
                            onDrop={(e) => handleDrop(e, 10)}
                            onDragOver={handleDragOver}
                            onContextMenu={(e) => handleContextMenu(e, 10)}
                        />
                        <EmptyModule
                            onClick={() => onSpaceSelect(11)}
                            selectedSpace={selectedSpace}
                            id={11}
                            moduleType={modules[11]}
                            onDrop={(e) => handleDrop(e, 11)}
                            onDragOver={handleDragOver}
                            onContextMenu={(e) => handleContextMenu(e, 11)}
                        />
                        <EmptyModule
                            onClick={() => onSpaceSelect(12)}
                            selectedSpace={selectedSpace}
                            id={12}
                            moduleType={modules[12]}
                            onDrop={(e) => handleDrop(e, 12)}
                            onDragOver={handleDragOver}
                            onContextMenu={(e) => handleContextMenu(e, 12)}
                        />
                        <div className={"module-space"}></div>
                    </div>
                </div>
                <div className={"separator"}></div>
                <div className={"module-line"}>
                    <div className={"checkbox-container"}>
                        <Switch onChange={
                            (e) => {
                                if (e.target.checked) {
                                    synth3.turnOn();
                                    synth3.updateSynth();
                                    onSynthSelect(synth3);
                                }
                                else {
                                    synth3.turnOff();
                                    synth3.updateSynth();
                                }
                            }
                        } />
                    </div>
                    <div className={"module-container"}>
                        <Module onClick={
                            () => {
                                onSynthSelect(synth3);
                            }
                        }></Module>
                        <EmptyModule
                            onClick={() => onSpaceSelect(13)}
                            selectedSpace={selectedSpace}
                            id={13}
                            moduleType={modules[13]}
                            onDrop={(e) => handleDrop(e, 13)}
                            onDragOver={handleDragOver}
                            onContextMenu={(e) => handleContextMenu(e, 13)}
                        />
                        <EmptyModule
                            onClick={() => onSpaceSelect(14)}
                            selectedSpace={selectedSpace}
                            id={14}
                            moduleType={modules[14]}
                            onDrop={(e) => handleDrop(e, 14)}
                            onDragOver={handleDragOver}
                            onContextMenu={(e) => handleContextMenu(e, 14)}
                        />
                        <EmptyModule
                            onClick={() => onSpaceSelect(15)}
                            selectedSpace={selectedSpace}
                            id={15}
                            moduleType={modules[15]}
                            onDrop={(e) => handleDrop(e, 15)}
                            onDragOver={handleDragOver}
                            onContextMenu={(e) => handleContextMenu(e, 15)}
                        />
                        <EmptyModule
                            onClick={() => onSpaceSelect(16)}
                            selectedSpace={selectedSpace}
                            id={16}
                            moduleType={modules[16]}
                            onDrop={(e) => handleDrop(e, 16)}
                            onDragOver={handleDragOver}
                            onContextMenu={(e) => handleContextMenu(e, 16)}
                        />
                        <EmptyModule
                            onClick={() => onSpaceSelect(17)}
                            selectedSpace={selectedSpace}
                            id={17}
                            moduleType={modules[17]}
                            onDrop={(e) => handleDrop(e, 17)}
                            onDragOver={handleDragOver}
                            onContextMenu={(e) => handleContextMenu(e, 17)}
                        />
                        <EmptyModule
                            onClick={() => onSpaceSelect(18)}
                            selectedSpace={selectedSpace}
                            id={18}
                            moduleType={modules[18]}
                            onDrop={(e) => handleDrop(e, 18)}
                            onDragOver={handleDragOver}
                            onContextMenu={(e) => handleContextMenu(e, 18)}
                        />
                        <div className={"module-space"}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleBoard;