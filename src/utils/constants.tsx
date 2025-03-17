
export const keyToNote: { [key: string]: number } = {
    q: 48, // C3
    2: 49, // C#3
    w: 50, // D3
    3: 51, // D#3
    e: 52, // E3
    r: 53, // F3
    5: 54, // F#3
    t: 55, // G3
    6: 56, // G#3
    y: 57, // A3
    7: 58, // A#3
    u: 59, // B3
    i: 60, // Middle C4
    9: 61, // C#4
    o: 62, // B4
    0: 63, // B#4
    p: 64, // E4
    z: 65, // F4
    s: 66, // F#4
    x: 67, // G4
    d: 68, // G#4
    c: 69, // A4
    f: 70, // A#4
    v: 71, // B4
    b: 72, // C5
    h: 73, // C#5
    n: 74, // D5
    j: 75, // D#5
    m: 76, // E5
};

export const synth1Parameters = {
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

export const synth2Parameters = {
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

export const synth3Parameters = {
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

export const synthEnvelope = {
    "attack": 0.005,
    "decay": 0.1,
    "sustain": 0.3,
    "release": 1,
};

export const effectValues: Record<string, number> = {
    "highpass": 1000,
    "lowpass": 500,
    "bandpass": 600,
    "notch": 700,
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
    "wah": 8,
    "phaser": 0,
    "phaser1": 1,
    "phaser2": 1,
    "widener": 0.8,
    "vibrato": 0,
    "vibrato1": 5,
    "vibrato2": 0.1,
    "bitcrusher": 4,
    "chebyshev": 3
};