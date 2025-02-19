

// src/utils/audioUtils.ts

import * as Tone from "tone";
import { effectValues, synthType } from "./types";

// Initialize Tone.js context
Tone.setContext(new Tone.Context({ latencyHint: 'interactive' }));
Tone.getContext().lookAhead = 0.01;

// Synth and Effects Initialization

export let currentSynth = new Tone.PolySynth().toDestination();
currentSynth.volume.value = -6;

const limiter = new Tone.Limiter(-6);

export const moduleChain: Tone.ToneAudioNode[] = [currentSynth, limiter];

export const existingModules: { id: string; instance: Tone.ToneAudioNode }[] = [];

// ------------ Synth Functions ------------

export function updateSynth() {  // Add 'export'
    currentSynth.dispose();
    let newSynth: Tone.PolySynth;

    switch (synthType.synth) {
        case "synth": {
            newSynth = new Tone.PolySynth(Tone.Synth);
            break;
        }
        case "amsynth": {
            newSynth = new Tone.PolySynth(Tone.AMSynth);
            (newSynth as Tone.PolySynth<Tone.AMSynth>).set({harmonicity: synthType.harmonicity});
            break;
        }
        case "fmsynth": {
            newSynth = new Tone.PolySynth(Tone.FMSynth);
            (newSynth as Tone.PolySynth<Tone.FMSynth>).set({harmonicity: synthType.harmonicity});
            (newSynth as Tone.PolySynth<Tone.FMSynth>).set({modulationIndex: synthType.modulation_index});
            break;
        }
        default: {
            return;
        }
    }

    newSynth.volume.value = -6;

    moduleChain[0] = newSynth;
    currentSynth = newSynth;


    setEnvelope();
    resetPartials();
    updateButton();
    connectChain();
} // updates the base synth object with all its parameters

export function midiToFreq(number: number): number {  // Add 'export'
    const a = 440;
    return (a / 32) * (2 ** ((number - 9) / 12));
}

export function noteOn(note: number, velocity: number, octave: number = 0){ // ADD EXPORT
    currentSynth.triggerAttack(midiToFreq(note + octave * 12), Tone.now(), velocity / 127);
    console.log(currentSynth.activeVoices);
    // console.log(effectValues);
    // console.log(synthType);
} // triggers a note

export function noteOff(note: number, octave: number = 0) { // ADD EXPORT
    currentSynth.triggerRelease(midiToFreq(note + octave * 12), Tone.now());
} // releases the note
//... rest of the code...








//Functionality not converted: setPartials, resetPartials, setSliders, resetCheckboxes, setPreset
// ------------ Module Chain Functions ------------

export function connectChain() {
    for (let i = 0; i < moduleChain.length - 1; i++) {
        const first = moduleChain[i];
        const second = moduleChain[i+1];
        first.disconnect();
        first.connect(second);
        if (isDelayType(second)) {
            let y=i+2;
            while (isDelayType(moduleChain[y])) {
                y+=1;
            }
            first.connect(moduleChain[y]);
        }
    }
    moduleChain[moduleChain.length-1].toDestination();
}

export function resetChain() {
    console.log("RESETTING CHAIN of length "+ moduleChain.length);
    const originalChainLength = moduleChain.length;
    for (let i = 1; i < originalChainLength - 1; i++) {
        console.log("removing " + moduleChain[1]);
        removeModule({moduleObject: moduleChain[1]})
    }
    console.log("RESET CHAIN: " + moduleChain);
    connectChain();
}

export function addModule (moduleType: string) {
    let module: Tone.ToneAudioNode;

    switch (moduleType) {
        case "highpass":
            module = new Tone.Filter(effectValues.highpass, "highpass");
            break;
        case "lowpass":
            module = new Tone.Filter(effectValues.lowpass, "lowpass");
            break;
        case "bandpass":
            module = new Tone.Filter(effectValues.bandpass, "bandpass");
            break;
        case "notch":
            module = new Tone.Filter(effectValues.notch, "notch");
            break;
        case "delay":
            module = new Tone.Delay(effectValues.delay);
            break;
        case "reverb":
            module = new Tone.Reverb(effectValues.reverb);
            break;
        case "feedback":
            module = new Tone.FeedbackDelay(effectValues.feedback1, effectValues.feedback2);
            break;
        case "pingpong":
            module = new Tone.PingPongDelay(effectValues.pingpong1, effectValues.pingpong2);
            break;
        case "chorus":
            module = new Tone.Chorus(1.5, effectValues.chorus1, effectValues.chorus2);
            break;
        case "distortion":
            module = new Tone.Distortion(effectValues.distortion);
            break;
        case "wah":
            module = new Tone.AutoWah(100, effectValues.wah);
            break;
        case "phaser":
            module = new Tone.Phaser(effectValues.phaser1, effectValues.phaser2);
            break;
        case "widener":
            module = new Tone.StereoWidener(effectValues.widener);
            break;
        case "vibrato":
            module = new Tone.Vibrato(effectValues.vibrato1, effectValues.vibrato2);
            break;
        case "bitcrusher":
            module = new Tone.BitCrusher(effectValues.bitcrusher);
            break;
        case "chebyshev":
            module = new Tone.Chebyshev(effectValues.chebyshev);
            break;
        default:
            console.warn("Unknown module Type: "+moduleType);
            return;
    }
    existingModules.push({id: moduleType, instance: module});

    moduleChain.pop();
    moduleChain.push(module);
    moduleChain.push(limiter);

    connectChain();
    console.log(moduleChain);
}

export function removeModule ({ moduleType, moduleObject }: { moduleType?: string; moduleObject?: Tone.ToneAudioNode }) {
    if (moduleObject) {
        const moduleIndex = existingModules.findIndex(module => module.instance === moduleObject);
        if (moduleIndex === -1) {
            console.warn(`Module ${moduleType} not found`);
            return;
        }

        existingModules.splice(moduleIndex, 1);

        const chainIndex = moduleChain.indexOf(moduleObject);
        if (chainIndex === -1) {
            console.warn(`Module ${moduleType} not found`);
            return;
        }
        moduleObject.dispose();
        moduleChain.splice(chainIndex, 1);
    } else if (moduleType) {
        const moduleIndex = existingModules.findIndex(module => module.id == moduleType);
        if (moduleIndex === -1) {
            console.warn(`Module ${moduleType} not found`);
            return;
        }

        const {instance} = existingModules[moduleIndex];
        existingModules.splice(moduleIndex, 1);

        const chainIndex = moduleChain.indexOf(instance);
        if (chainIndex !== -1) {
            instance.dispose();
            moduleChain.splice(chainIndex, 1);
        }
    }

    connectChain();
    console.log(moduleChain);
}

export function isDelayType(module: Tone.ToneAudioNode) {
    // return typeof module == typeof Tone.Delay || typeof module == typeof Tone.FeedbackDelay || typeof module == typeof Tone.PingPongDelay;
    const delayNames = ["Delay", "FeedbackDelay", "PingPongDelay"]
    return delayNames.includes(module.name);
}