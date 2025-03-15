import { startupMIDI } from "./midi";
import {Synthesiser} from "../Synthesiser.tsx";
import * as Tone from "tone";


function startup() {
    startupMIDI();
    console.log("Startup");
}

Tone.setContext(new Tone.Context({ latencyHint: 'interactive' }));
Tone.getContext().lookAhead = 0.01;
// Tone.getContext().lookAhead = 0.001;

export const synth1 = new Synthesiser(1);
export const synth2 = new Synthesiser(2);
export const synth3 = new Synthesiser(3);



startup();

synth2.synthParameters.waveform = "triangle";
synth2.synthParameters.synth = "fmsynth";
synth2.updateSynth();

synth3.synthParameters.modifier = "fat";
synth3.synthParameters.synth = "synth";
synth3.updateSynth();

