import { selectedObject } from "../utils/logic.tsx";

const ParameterBoard = () => {
    return (
        <div id={"parameter-board-container"}>
            <div id={"parameter-board"}>
                {selectedObject? (
                    <>
                        {selectedObject.id == 1 && (<div>Synth 1 parameters</div>)}
                        {selectedObject.id == 2 && (<div>Synth 2 parameters</div>)}
                        {selectedObject.id == 3 && (<div>Synth 3 parameters</div>)}
                    </>
                ) : (<div>Nothing Selected</div>)}
            </div>
        </div>
    );
};

export default ParameterBoard;