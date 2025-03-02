// import { selectedObject } from "../utils/logic.tsx";
import {Synthesiser} from "../Synthesiser.tsx";

interface ParameterBoardProps {
    selectedSynth: Synthesiser | null;
}

const ParameterBoard = ({ selectedSynth }: ParameterBoardProps) => {
    return (
        <div id={"parameter-board-container"}>
            <div id={"parameter-board"}>
                {selectedSynth? (
                    <>
                        {selectedSynth.id == 1 && (<div>Synth 1 parameters</div>)}
                        {selectedSynth.id == 2 && (<div>Synth 2 parameters</div>)}
                        {selectedSynth.id == 3 && (<div>Synth 3 parameters</div>)}
                    </>
                ) : (<div>Nothing Selected</div>)}
            </div>
        </div>
    );
};

export default ParameterBoard;