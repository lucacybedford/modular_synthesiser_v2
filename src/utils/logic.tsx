import {Synthesiser} from "../Synthesiser.tsx";


export let selectedObject: Synthesiser;

export function setSelectedSynth(synth: Synthesiser) {
    selectedObject = synth;
    console.log("Synth "+selectedObject.id+" selected");
}
