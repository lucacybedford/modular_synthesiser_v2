import Switch from "./Switch.tsx";
import Module from "./Module.tsx";
import EmptyModule from "./EmptyModule.tsx";
import { synth1, synth2, synth3 } from "../utils/audio.tsx"
import {Synthesiser} from "../Synthesiser.tsx";
import {useState} from "react";


interface ModuleBoardProps {
    onSynthSelect: (synth: Synthesiser) => void;
}

const ModuleBoard = ({ onSynthSelect }: ModuleBoardProps) => {
    const [selectedSpace, setSelectedSpace] = useState<number | null>(null);


    const handleSpaceSelection = (id: number) => {
        setSelectedSpace(id);
        console.log("Space "+id+" selected");
    }

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
                        }/>
                    </div>
                    <div className={"module-container"}>
                        <Module onClick={
                            () => {
                                onSynthSelect(synth1);
                            }
                        }></Module>
                        <EmptyModule onClick={
                            () => {
                                handleSpaceSelection(1);
                            }
                        } selectedSpace = { selectedSpace } id = {1}></EmptyModule>
                        <EmptyModule onClick={
                            () => {
                                handleSpaceSelection(2);
                            }
                        } selectedSpace={selectedSpace} id = {2}></EmptyModule>
                        <EmptyModule onClick={
                            () => {
                                handleSpaceSelection(3);
                            }
                        } selectedSpace={selectedSpace} id = {3}></EmptyModule>
                        <EmptyModule onClick={
                            () => {
                                handleSpaceSelection(4);
                            }
                        } selectedSpace={selectedSpace} id = {4}></EmptyModule>
                        <EmptyModule onClick={
                            () => {
                                handleSpaceSelection(5);
                            }
                        } selectedSpace={selectedSpace} id = {5}></EmptyModule>
                        <EmptyModule onClick={
                            () => {
                                handleSpaceSelection(6);
                            }
                        } selectedSpace={selectedSpace} id = {6}></EmptyModule>

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
                        }/>
                    </div>
                    <div className={"module-container"}>
                        <Module onClick={
                            () => {
                                onSynthSelect(synth2);
                            }
                        }></Module>
                        <EmptyModule onClick={
                            () => {
                                handleSpaceSelection(7);
                            }
                        } selectedSpace={selectedSpace} id = {7}></EmptyModule>
                        <EmptyModule onClick={
                            () => {
                                handleSpaceSelection(8);
                            }
                        } selectedSpace={selectedSpace} id = {8}></EmptyModule>
                        <EmptyModule onClick={
                            () => {
                                handleSpaceSelection(9);
                            }
                        } selectedSpace={selectedSpace} id = {9}></EmptyModule>
                        <EmptyModule onClick={
                            () => {
                                handleSpaceSelection(10);
                            }
                        } selectedSpace={selectedSpace} id = {10}></EmptyModule>
                        <EmptyModule onClick={
                            () => {
                                handleSpaceSelection(11);
                            }
                        } selectedSpace={selectedSpace} id = {11}></EmptyModule>
                        <EmptyModule onClick={
                            () => {
                                handleSpaceSelection(12);
                            }
                        } selectedSpace={selectedSpace} id = {12}></EmptyModule>
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
                        }/>
                    </div>
                    <div className={"module-container"}>
                        <Module onClick={
                            () => {
                                onSynthSelect(synth3);
                            }
                        }></Module>
                        <EmptyModule onClick={
                            () => {
                                handleSpaceSelection(13);
                            }
                        } selectedSpace={selectedSpace} id = {13}></EmptyModule>
                        <EmptyModule onClick={
                            () => {
                                handleSpaceSelection(14);
                            }
                        } selectedSpace={selectedSpace} id = {14}></EmptyModule>
                        <EmptyModule onClick={
                            () => {
                                handleSpaceSelection(15);
                            }
                        } selectedSpace={selectedSpace} id = {15}></EmptyModule>
                        <EmptyModule onClick={
                            () => {
                                handleSpaceSelection(16);
                            }
                        } selectedSpace={selectedSpace} id = {16}></EmptyModule>
                        <EmptyModule onClick={
                            () => {
                                handleSpaceSelection(17);
                            }
                        } selectedSpace={selectedSpace} id = {17}></EmptyModule>
                        <EmptyModule onClick={
                            () => {
                                handleSpaceSelection(18);
                            }
                        } selectedSpace={selectedSpace} id = {18}></EmptyModule>
                        <div className={"module-space"}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleBoard;