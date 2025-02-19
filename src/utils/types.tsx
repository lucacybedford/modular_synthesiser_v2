export type EffectTypes =
    "sine"
    | "square"
    | "sawtooth"
    | "triangle"

    | "fatsine"
    | "fatsquare"
    | "fatsawtooth"
    | "fattriangle"

    | "fmsine"
    | "fmsquare"
    | "fmsawtooth"
    | "fmtriangle"

    | "amsine"
    | "amsquare"
    | "amsawtooth"
    | "amtriangle"

    | "pulse"
    | "pwm";

export type EnvelopeTypes =
    "attack"
    | "decay"
    | "sustain"
    | "release";

export interface SynthType {
    synth: "synth" | "amsynth" | "fmsynth";
    waveform: EffectTypes;
    oscillator_type: "" | "am" | "fm" | "fat";
    harmonicity: number;
    modulation_index: number;
    partials1: number;
    partials2: number;
    partials3: number;
    partials4: number;
}

export interface SynthEnvelope {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
}

export interface EffectValues {
    highpass: number;
    lowpass: number;
    bandpass: number;
    notch: number;
    delay: number;
    reverb: number;
    feedback: number;
    feedback1: number;
    feedback2: number;
    pingpong: number;
    pingpong1: number;
    pingpong2: number;
    chorus: number;
    chorus1: number;
    chorus2: number;
    distortion: number;
    wah: number;
    phaser: number;
    phaser1: number;
    phaser2: number;
    widener: number;
    vibrato: number;
    vibrato1: number;
    vibrato2: number;
    bitcrusher: number;
    chebyshev: number;
}

export const synthType: SynthType = {
    "synth": "synth",
    "waveform": "sine",
    "oscillator_type": "",
    "harmonicity": 3,
    "modulation_index": 10,
    "partials1": 0,
    "partials2": 0,
    "partials3": 0,
    "partials4": 0
};

export const synthEnvelope: SynthEnvelope = {
    "attack": 0.005,
    "decay": 0.1,
    "sustain": 0.3,
    "release": 1,
};

export const effectValues: EffectValues = {
    "highpass": 1000,
    "lowpass": 1000,
    "bandpass": 1000,
    "notch": 1000,
    "delay": 0.5,
    "reverb": 1,
    "feedback": 0,
    "feedback1": 0.5,
    "feedback2": 0.5,
    "pingpong": 0,
    "pingpong1": 0.5,
    "pingpong2": 0.5,
    "chorus": 0,
    "chorus1": 10,
    "chorus2": 1,
    "distortion": 0.5,
    "wah": 1,
    "phaser": 0,
    "phaser1": 1,
    "phaser2": 1,
    "widener": 0.5,
    "vibrato": 0,
    "vibrato1": 5,
    "vibrato2": 0.1,
    "bitcrusher": 4,
    "chebyshev": 1
};