import {Synthesiser} from "../Synthesiser.tsx";
import {synth1, synth2, synth3} from "../utils/audio.tsx";
import {useState} from "react";

const synths: Synthesiser[] = [synth1, synth2, synth3];

interface OscillatorControlsProps {
    selectedSynth: number
}

const ParameterBoard = ({selectedSynth}: OscillatorControlsProps) => {

    const [synthType, setSynthType] = useState(synths[selectedSynth].synthParameters.synth);
    const [waveformType, setWaveformType] = useState(synths[selectedSynth].synthParameters.waveform);
    const [modifierType, setModifierType] = useState(synths[selectedSynth].synthParameters.oscillator_type);

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
        synths[selectedSynth].synthParameters.oscillator_type = newModifierType;
        synths[selectedSynth].updateSynth();
    };

    return (
        <div id={"parameters-container"}>
            <div id={"synth-number"}>
                <h3>{ selectedSynth + 1 }</h3>
            </div>
            <div className={"parameter-column"}>
                <div className={"column-title"}>
                    <h3>Synthesiser</h3>
                </div>
                <div className={"column-content"}>
                    <input type="radio" id="synth1" name="synth" value="1" onClick={
                        () => {
                            handleSynthChange("synth");
                        }
                    } defaultChecked = {synthType === "synth"}/>
                    <label htmlFor="synth1" className="radio-label">Classic</label>

                    <input type="radio" id="synth2" name="synth" value="2" onClick={
                        () => {
                            handleSynthChange("amsynth");
                        }
                    } defaultChecked = {synthType === "amsynth"}/>
                    <label htmlFor="synth2" className="radio-label">AMSynth</label>

                    <input type="radio" id="synth3" name="synth" value="3" onClick={
                        () => {
                            handleSynthChange("fmsynth");
                        }
                    } defaultChecked = {synthType === "fmsynth"}/>
                    <label htmlFor="synth3" className="radio-label">FMSynth</label>



                </div>
            </div>
            <div className={"parameter-column"}>
                <div className={"column-title"}>
                    <h3>Waveform</h3>
                </div>
                <div className={"dual-column"}>
                    <div className={"dual-column-content"}>
                        <input type="radio" id="waveform1" name="waveform" value="1" onClick={
                            () => {
                                handleWaveformChange("sine");
                            }
                        } defaultChecked = {waveformType.includes("sine")}/>
                        <label htmlFor="waveform1" className="radio-label">Sine</label>

                        <input type="radio" id="waveform2" name="waveform" value="2" onClick={
                            () => {
                                handleWaveformChange("square");
                            }
                        } defaultChecked = {waveformType.includes("square")}/>
                        <label htmlFor="waveform2" className="radio-label">Square</label>

                        <input type="radio" id="waveform3" name="waveform" value="3" onClick={
                            () => {
                                handleWaveformChange("sawtooth");
                            }
                        } defaultChecked = {waveformType.includes("sawtooth")}/>
                        <label htmlFor="waveform3" className="radio-label">Sawtooth</label>
                    </div>

                    <div className={"dual-separator"}></div>

                    <div className={"dual-column-content"}>
                        <input type="radio" id="waveform4" name="waveform" value="4" onClick={
                            () => {
                                handleWaveformChange("triangle");
                            }
                        } defaultChecked = {waveformType.includes("triangle")}/>
                        <label htmlFor="waveform4" className="radio-label">Triangle</label>

                        <input type="radio" id="waveform5" name="waveform" value="5" onClick={
                            () => {
                                handleWaveformChange("pulse");
                            }
                        } defaultChecked = {waveformType.includes("pulse")}/>
                        <label htmlFor="waveform5" className="radio-label">Pulse</label>

                        <input type="radio" id="waveform6" name="waveform" value="6" onClick={
                            () => {
                                handleWaveformChange("pwm");
                            }
                        } defaultChecked = {waveformType.includes("pwm")}/>
                        <label htmlFor="waveform6" className="radio-label">PWM</label>
                    </div>
                </div>
            </div>
            <div className={"parameter-column"}>
                <div className={"column-title"}>
                    <h3>Modifier</h3>
                </div>
                <div className={"column-content"}>
                    <input type="radio" id="modifier1" name="modifier" value="1" onClick={
                        () => {
                            handleModifierChange("");
                        }
                    } defaultChecked = {modifierType === ""}/>
                    <label htmlFor="modifier1" className="radio-label">NONE</label>

                    <input type="radio" id="modifier2" name="modifier" value="2" onClick={
                        () => {
                            handleModifierChange("am");
                        }
                    } defaultChecked = {modifierType === "am"}/>
                    <label htmlFor="modifier2" className="radio-label">AM</label>

                    <input type="radio" id="modifier3" name="modifier" value="3" onClick={
                        () => {
                            handleModifierChange("fm");
                        }
                    } defaultChecked = {modifierType === "fm"}/>
                    <label htmlFor="modifier3" className="radio-label">FM</label>

                    <input type="radio" id="modifier4" name="modifier" value="4" onClick={
                        () => {
                            handleModifierChange("fat");
                        }
                    } defaultChecked = {modifierType === "fat"}/>
                    <label htmlFor="modifier4" className="radio-label">FAT</label>
                </div>
            </div>
            <div className={"parameter-column"}>
                <h3>Envelope</h3>
                <label className={"small-title"}>Harmonicity</label>
                {/*<input*/}
                {/*    type={"range"}*/}
                {/*    id={"harmonicity-slider"}*/}
                {/*    min={"1"}*/}
                {/*    max={"10"}*/}
                {/*    defaultValue={synths[selectedSynth].synthParameters.harmonicity}*/}
                {/*    step={"1"}*/}
                {/*    onChange={*/}
                {/*        (e) => {*/}
                {/*            synths[selectedSynth].synthParameters.harmonicity = parseFloat(e.target.value);*/}
                {/*            synths[selectedSynth].updateHarmonicityAndModulation("harmonicity");*/}
                {/*        }*/}
                {/*    }*/}
                {/*/>*/}
                {/*<input*/}
                {/*    type={"range"}*/}
                {/*    id={"modulation-index-slider"}*/}
                {/*    min={"1"}*/}
                {/*    max={"20"}*/}
                {/*    defaultValue={synths[selectedSynth].synthParameters.modulation_index}*/}
                {/*    step={"1"}*/}
                {/*    onChange={*/}
                {/*        (e) => {*/}
                {/*            synths[selectedSynth].synthParameters.modulation_index = parseFloat(e.target.value);*/}
                {/*            synths[selectedSynth].updateHarmonicityAndModulation("modulation_index");*/}
                {/*        }*/}
                {/*    }*/}
                {/*/>*/}
            </div>
        </div>
    );
};

export default ParameterBoard;