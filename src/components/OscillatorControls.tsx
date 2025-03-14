import {Synthesiser} from "../Synthesiser.tsx";
import {synth1, synth2, synth3} from "../utils/audio.tsx";
import {useState} from "react";
import {EnvelopeTypes} from "../utils/types.tsx";

const synths: Synthesiser[] = [synth1, synth2, synth3];

interface OscillatorControlsProps {
    selectedSynth: number
}

const ParameterBoard = ({selectedSynth}: OscillatorControlsProps) => {

    const [synthType, setSynthType] = useState(synths[selectedSynth].synthParameters.synth);
    const [waveformType, setWaveformType] = useState(synths[selectedSynth].synthParameters.waveform);
    const [modifierType, setModifierType] = useState(synths[selectedSynth].synthParameters.modifier);

    console.log("Modifier: "+synths[selectedSynth].synthParameters.modifier);

    const handleSynthChange = (newSynthType: string) => {
        setSynthType(newSynthType);
        synths[selectedSynth].synthParameters.synth = newSynthType;
        synths[selectedSynth].updateSynth();
    };

    const handleWaveformChange = (newWaveformType: string) => {
        setWaveformType(newWaveformType);
        synths[selectedSynth].synthParameters.waveform = newWaveformType;
        synths[selectedSynth].updateSynth();
    };

    const handleModifierChange = (newModifierType: string) => {
        setModifierType(newModifierType);
        synths[selectedSynth].synthParameters.modifier = newModifierType;
        synths[selectedSynth].updateSynth();
    };

    const handleEnvelopeChange = (newEnvelopeType: EnvelopeTypes, value: string) => {
        synths[selectedSynth].synthEnvelope[newEnvelopeType] = parseFloat(value);
        synths[selectedSynth].updateEnvelope(newEnvelopeType);
    };

    return (
        <div id={"parameters-container"}>
            <div id={"synth-number"}>
                <h3>{ selectedSynth + 1 }</h3>
            </div>
            <div className={"parameter-column"}>
                <div className={"column-title"}>
                    <h3 className={"parameter-titles"}>Synthesiser</h3>
                </div>
                <div className={"column-content"}>
                    <input type="radio" id="synth1" name="synth" value="1" onClick={
                        () => {
                            handleSynthChange("synth");
                        }
                    } defaultChecked = {synthType === "synth"}/>
                    <label htmlFor="synth1" className="radio-label radio-synth">Classic</label>

                    <input type="radio" id="synth2" name="synth" value="2" onClick={
                        () => {
                            handleSynthChange("amsynth");
                        }
                    } defaultChecked = {synthType === "amsynth"}/>
                    <label htmlFor="synth2" className="radio-label radio-synth">AMSynth</label>

                    <input type="radio" id="synth3" name="synth" value="3" onClick={
                        () => {
                            handleSynthChange("fmsynth");
                        }
                    } defaultChecked = {synthType === "fmsynth"}/>
                    <label htmlFor="synth3" className="radio-label radio-synth">FMSynth</label>



                </div>
            </div>
            <div className={"parameter-column"}>
                <div className={"column-title"}>
                    <h3 className={"parameter-titles"}>Waveform</h3>
                </div>
                <div className={"dual-column"}>
                    <div className={"dual-column-content"}>
                        <input type="radio" id="waveform1" name="waveform" value="1" onClick={
                            () => {
                                handleWaveformChange("sine");
                            }
                        } defaultChecked = {waveformType.includes("sine")}/>
                        <label htmlFor="waveform1" className="radio-label radio-waveform">Sine</label>

                        <input type="radio" id="waveform2" name="waveform" value="2" onClick={
                            () => {
                                handleWaveformChange("square");
                            }
                        } defaultChecked = {waveformType.includes("square")}/>
                        <label htmlFor="waveform2" className="radio-label radio-waveform">Square</label>

                        <input type="radio" id="waveform3" name="waveform" value="3" onClick={
                            () => {
                                handleWaveformChange("sawtooth");
                            }
                        } defaultChecked = {waveformType.includes("sawtooth")}/>
                        <label htmlFor="waveform3" className="radio-label radio-waveform">Sawtooth</label>
                    </div>

                    <div className={"dual-separator"}></div>

                    <div className={"dual-column-content"}>
                        <input type="radio" id="waveform4" name="waveform" value="4" onClick={
                            () => {
                                handleWaveformChange("triangle");
                            }
                        } defaultChecked = {waveformType.includes("triangle")}/>
                        <label htmlFor="waveform4" className="radio-label radio-waveform">Triangle</label>

                        <input type="radio" id="waveform5" name="waveform" value="5" onClick={
                            () => {
                                handleWaveformChange("pulse");
                            }
                        } defaultChecked = {waveformType.includes("pulse")}/>
                        <label htmlFor="waveform5" className="radio-label radio-waveform">Pulse</label>

                        <input type="radio" id="waveform6" name="waveform" value="6" onClick={
                            () => {
                                handleWaveformChange("pwm");
                            }
                        } defaultChecked = {waveformType.includes("pwm")}/>
                        <label htmlFor="waveform6" className="radio-label radio-waveform">PWM</label>
                    </div>
                </div>
            </div>
            <div className={"parameter-column"}>
                <div className={"column-title"}>
                    <h3 className={"parameter-titles"}>Modifier</h3>
                </div>
                <div className={"column-content"}>
                    <input type="radio" id="modifier1" name="modifier" value="1" onClick={
                        () => {
                            handleModifierChange("");
                        }
                    } defaultChecked = {modifierType === ""}/>
                    <label htmlFor="modifier1" className="radio-label radio-modifier">NONE</label>

                    <input type="radio" id="modifier2" name="modifier" value="2" onClick={
                        () => {
                            handleModifierChange("am");
                        }
                    } defaultChecked = {modifierType === "am"}/>
                    <label htmlFor="modifier2" className="radio-label radio-modifier">AM</label>

                    <input type="radio" id="modifier3" name="modifier" value="3" onClick={
                        () => {
                            handleModifierChange("fm");
                        }
                    } defaultChecked = {modifierType === "fm"}/>
                    <label htmlFor="modifier3" className="radio-label radio-modifier">FM</label>

                    <input type="radio" id="modifier4" name="modifier" value="4" onClick={
                        () => {
                            handleModifierChange("fat");
                        }
                    } defaultChecked = {modifierType === "fat"}/>
                    <label htmlFor="modifier4" className="radio-label radio-modifier">FAT</label>
                </div>
            </div>
            <div className={"parameter-column"}>
                <h3 className={"parameter-titles"}>Envelope</h3>
                <div className={"envelope-container"} id={"envelope-choices"}>
                    <div className={"envelope-content"}>
                        <label className={"envelope-label"}>Attack</label>
                        <div className={"slider-container"}>
                            <input
                                type={"range"}
                                id={"attack-slider"}
                                min={"0.005"}
                                max={"3"}
                                defaultValue={synths[selectedSynth].synthEnvelope.attack}
                                step={"0.005"}
                                onChange={
                                    (e) => {
                                        handleEnvelopeChange("attack", e.target.value);
                                    }
                                }
                            />
                        </div>
                    </div>
                    <div className={"envelope-content"}>
                        <label className={"envelope-label"}>Decay</label>
                        <div className={"slider-container"}>
                            <input
                                type={"range"}
                                id={"decay-slider"}
                                min={"0.1"}
                                max={"3"}
                                defaultValue={synths[selectedSynth].synthEnvelope.decay}
                                step={"0.01"}
                                onChange={
                                    (e) => {
                                        handleEnvelopeChange("decay", e.target.value);
                                    }
                                }
                            />
                        </div>
                    </div>
                    <div className={"envelope-content"}>
                        <label className={"envelope-label"}>Sustain</label>
                        <div className={"slider-container"}>
                            <input
                                type={"range"}
                                id={"sustain-slider"}
                                min={"0"}
                                max={"1"}
                                defaultValue={synths[selectedSynth].synthEnvelope.sustain}
                                step={"0.01"}
                                onChange={
                                    (e) => {
                                        handleEnvelopeChange("sustain", e.target.value);
                                    }
                                }
                            />
                        </div>
                    </div>
                    <div className={"envelope-content"}>
                        <label className={"envelope-label"}>Release</label>
                        <div className={"slider-container"}>
                            <input
                                type={"range"}
                                id={"release-slider"}
                                min={"0.01"}
                                max={"5"}
                                defaultValue={synths[selectedSynth].synthEnvelope.release}
                                step={"0.01"}
                                onChange={
                                    (e) => {
                                        handleEnvelopeChange("release", e.target.value);
                                    }
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParameterBoard;