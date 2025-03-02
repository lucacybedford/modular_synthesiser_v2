import Switch from "./Switch.tsx";
import Module from "./Module.tsx";
import { synth1, synth2, synth3 } from "../utils/audio.tsx"
// import { setSelectedSynth } from "../utils/logic.tsx";
import {Synthesiser} from "../Synthesiser.tsx";


interface ModuleBoardProps {
    onSynthSelect: (synth: Synthesiser) => void;
}

const ModuleBoard = ({ onSynthSelect }: ModuleBoardProps) => {
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
                                // setSelectedSynth(synth1);
                            }
                        }></Module>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
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
                                // setSelectedSynth(synth2);
                            }
                        }></Module>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
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
                                // setSelectedSynth(synth3);
                            }
                        }></Module>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"empty-module-space"}></div>
                        <div className={"module-space"}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModuleBoard;