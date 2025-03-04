import {Synthesiser} from "../Synthesiser.tsx";
import OscillatorControls from "./OscillatorControls.tsx";

interface ParameterBoardProps {
    selectedSynth: Synthesiser | null;
}

const ParameterBoard = ({ selectedSynth }: ParameterBoardProps) => {
    return (
        <div id={"parameter-board-container"}>
            <div id={"parameter-board"}>
                {selectedSynth? (
                    <>
                        {/*{selectedSynth.id == 1 && (<div>Synth 1 parameters</div>)}*/}
                        {selectedSynth.id == 1 && (<OscillatorControls selectedSynth={0} />)}
                        {selectedSynth.id == 2 && (<OscillatorControls selectedSynth={1} />)}
                        {selectedSynth.id == 3 && (<OscillatorControls selectedSynth={2} />)}
                    </>
                ) : (<div>Nothing Selected</div>)}
            </div>
        </div>
    );
};

export default ParameterBoard;