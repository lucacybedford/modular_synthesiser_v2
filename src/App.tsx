import './App.css'
import {ReactElement, useEffect, useState} from "react";
import keyboardMockup from './assets/keyboard_mockup.png';
import * as Tone from "tone";
import $ from "jquery";



// ------------ Synth Functions ------------

function updateSynth() {
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

function midiToFreq(number: number) {
    const a = 440;
    return (a/32) * (2 ** ((number - 9) / 12));
}

function noteOn(note: number, velocity: number, octave: number = 0){
    currentSynth.triggerAttack(midiToFreq(note + octave * 12), Tone.now(), velocity / 127);
    console.log(currentSynth.activeVoices);
    // console.log(effectValues);
    // console.log(synthType);
} // triggers a note

function noteOff(note: number, octave: number = 0) {
    currentSynth.triggerRelease(midiToFreq(note + octave * 12), Tone.now());
} // releases the note

function updateSynthSlider (element: keyof typeof synthType) {
    console.log(`Updating slider ${element}`);
    if (synthType.synth == "amsynth") {
        if (element == "harmonicity") {
            (currentSynth as Tone.PolySynth<Tone.AMSynth>).set({harmonicity: synthType.harmonicity})
        }
    }

    else if (synthType.synth == "fmsynth") {
        if (element == "harmonicity") {
            (currentSynth as Tone.PolySynth<Tone.FMSynth>).set({harmonicity: synthType.harmonicity})
        }

        else if (element == "modulation_index") {
            (currentSynth as Tone.PolySynth<Tone.FMSynth>).set({modulationIndex: synthType.modulation_index})
        }
    }
} // updates the sliders associated to the synth type

function updateEnvelope (element: EnvelopeTypes) {
    switch (element) {
        case "attack": {
            currentSynth.set({envelope: {attack: synthEnvelope[element]}});
            break;
        }
        case "decay": {
            currentSynth.set({envelope: {decay: synthEnvelope[element]}});
            break;
        }
        case "sustain": {
            currentSynth.set({envelope: {sustain: synthEnvelope[element]}});
            break;
        }
        case "release": {
            currentSynth.set({envelope: {release: synthEnvelope[element]}});
            break;
        }
        default: {
            return;
        }
    }
} // updates the synth's envelope

function setEnvelope () {
    currentSynth.set({
        envelope: {
            attack: synthEnvelope.attack,
            decay: synthEnvelope.decay,
            sustain: synthEnvelope.sustain,
            release: synthEnvelope.release
        }
    })
}

function setPartials () {
    currentSynth.set({
        oscillator: {
            partials: [
                synthType.partials1,
                synthType.partials2,
                synthType.partials3,
                synthType.partials4
            ]
        }
    })
}

function resetPartials() {
    synthType.partials1 = 0;
    synthType.partials2 = 0;
    synthType.partials3 = 0;
    synthType.partials4 = 0;

    $("#partials1-slider").val("0");
    $("#partials2-slider").val("0");
    $("#partials3-slider").val("0");
    $("#partials4-slider").val("0");

    setPartials();
}

function updateButton () {
    let oscillatorType = synthType.waveform as EffectTypes;
    if (oscillatorType!= "pulse" && oscillatorType != "pwm") {
        oscillatorType = synthType.oscillator_type+oscillatorType as EffectTypes;
    }
    currentSynth.set({oscillator: {type: oscillatorType as EffectTypes}});
} // sets the oscillator to the chosen type from buttons


function setPreset(number: number) {
    resetChain();
    resetCheckboxes();
    switch (number) {
        case 0:
            setPresetRandom();
            break;
        case 1:
            setPreset1();
            break;
        case 2:
            setPreset2();
            break;
        case 3:
            setPreset3();
            break;
        case 4:
            setPreset4();
            break;
        case 5:
            setPreset5();
            break;
        case 6:
            setPreset6();
            break;
        default:
            break;
    }
    setSliders();
    connectChain();
    updateSynth();
}

function setPresetRandom() {
    let randomIsOn;
    const notModules = ["bitcrusher", "highpass", "lowpass", "notch", "bandpass","phaser1", "phaser2", "feedback1", "feedback2", "pingpong1", "pingpong2", "chorus1", "chorus2", "vibrato1", "vibrato2"];

    const synthNumber = (Math.random() * 4).toFixed(0);
    switch (synthNumber) {
        case "0":
            synthType["synth"] = "synth";
            $("#synth1").prop("checked", true);
            break;
        case "1":
            synthType["synth"] = "amsynth";
            $("#synth2").prop("checked", true);
            break;
        case "2":
            synthType["synth"] = "fmsynth";
            $("#synth3").prop("checked", true);
            break;
    }

    const waveformNumber = (Math.random() * 7).toFixed(0);
    switch (waveformNumber) {
        case "0":
            synthType["waveform"] = "sine";
            $("#waveform1").prop("checked", true);
            break;
        case "1":
            synthType["waveform"] = "square";
            $("#waveform2").prop("checked", true);
            break;
        case "2":
            synthType["waveform"] = "sawtooth";
            $("#waveform3").prop("checked", true);
            break;
        case "3":
            synthType["waveform"] = "triangle";
            $("#waveform4").prop("checked", true);
            break;
        case "4":
            synthType["waveform"] = "pulse";
            $("#waveform5").prop("checked", true);
            break;
        case "5":
            synthType["waveform"] = "pwm";
            $("#waveform6").prop("checked", true);
            break;
    }

    const modifierNumber = (Math.random() * 5).toFixed(0);
    switch (modifierNumber) {
        case "0":
            synthType["oscillator_type"] = "";
            $("#modifier1").prop("checked", true);
            break;
        case "1":
            synthType["oscillator_type"] = "am";
            $("#modifier2").prop("checked", true);
            break;
        case "2":
            synthType["oscillator_type"] = "fm";
            $("#modifier3").prop("checked", true);
            break;
        case "3":
            synthType["oscillator_type"] = "fat";
            $("#modifier4").prop("checked", true);
            break;
    }

    for (const name of Object.keys(effectValues)) {

        randomIsOn = Math.random();
        if (randomIsOn > 0.66 && !notModules.includes(name)) {
            $("#" + name + "-toggle").prop("checked", true);


            if (name == "feedback" || name == "pingpong" || name == "chorus" || name == "vibrato" || name == "phaser") {
                const name1 = name + "1";
                const name2 = name + "2";
                const randomValue1 = Math.random();
                const randomValue2 = Math.random();
                const slider1 = $("#" + name1 + "-slider");
                const slider2 = $("#" + name2 + "-slider");

                const min1 = slider1.attr("min");
                const max1 = slider1.attr("max");
                const min2 = slider2.attr("min");
                const max2 = slider2.attr("max");

                const step1 = slider1.attr("step");
                const step2 = slider2.attr("step");
                if (min1 && max1 && min2 && max2 && step1 && step2) {
                    effectValues[name1] = parseFloat((randomValue1 * parseFloat(max1) + parseFloat(min1)).toFixed(Math.max(0, -Math.log10(parseFloat(step1)))));
                    effectValues[name2] = parseFloat((randomValue2 * parseFloat(max2) + parseFloat(min2)).toFixed(Math.max(0, -Math.log10(parseFloat(step2)))));
                }
            } else {
                const randomValue = Math.random();
                const slider = $("#" + name + "-slider");
                const min = slider.attr("min");
                const max = slider.attr("max");
                const step = slider.attr("step");

                if (min && max && step) {
                    effectValues[name] = parseFloat((randomValue * parseFloat(max) + parseFloat(min)).toFixed(Math.max(0, -Math.log10(parseFloat(step)))));
                }
            }
            addModule(name);
        }
    }
}

function setPreset1() {
    Object.assign(synthType,{
        "synth": "synth",
        "waveform": "sine",
        "oscillator_type": "fat",
        "partials1": 0,
        "partials2": 0,
        "partials3": 0,
        "partials4": 0
    });

    Object.assign(synthEnvelope, {
        "attack": 0.005,
        "decay": 0.1,
        "sustain": 0.3,
        "release": 1,
    });


    Object.assign(effectValues, {
        "reverb": 4.2,
        "pingpong1": 0.5,
        "pingpong2": 0.5,
    });

    $("#synth1").prop("checked", true);
    $("#waveform1").prop("checked", true);
    $("#modifier4").prop("checked", true);

    $("#reverb-toggle").prop("checked", true);
    addModule("reverb");
    $("#pingpong-toggle").prop("checked", true);
    addModule("pingpong");
}

function setPreset2() {
    Object.assign(synthType,{
        "synth": "synth",
        "waveform": "triangle",
        "oscillator_type": ""
    });

    Object.assign(synthEnvelope, {
        "attack": 0.005,
        "decay": 2.4,
        "sustain": 0.0,
        "release": 2.5,
    });

    Object.assign(effectValues, {
        "lowpass": 610,
        "feedback1": 0.04,
        "feedback2": 0.5,
        "widener": 1
    });

    $("#synth1").prop("checked", true);
    $("#waveform4").prop("checked", true);
    $("#modifier1").prop("checked", true);

    $("#lowpass-toggle").prop("checked", true);
    addModule("lowpass");
    $("#feedback-toggle").prop("checked", true);
    addModule("feedback");
    $("#widener-toggle").prop("checked", true);
    addModule("widener");
}

function setPreset3() {
    Object.assign(synthType,{
        "synth": "fmsynth",
        "waveform": "triangle",
        "oscillator_type": "fm"
    });

    Object.assign(synthEnvelope, {
        "attack": 0.005,
        "decay": 0.1,
        "sustain": 0.3,
        "release": 3,
    });

    Object.assign(effectValues, {
        "lowpass": 400,
        "wah": 9
    });

    $("#synth3").prop("checked", true);
    $("#waveform4").prop("checked", true);
    $("#modifier3").prop("checked", true);

    $("#lowpass-toggle").prop("checked", true);
    addModule("lowpass");
    $("#wah-toggle").prop("checked", true);
    addModule("wah");
}

function setPreset4() {
    Object.assign(synthType,{
        "synth": "amsynth",
        "waveform": "pwm",
        "oscillator_type": ""
    });

    Object.assign(synthEnvelope, {
        "attack": 0.005,
        "decay": 0.1,
        "sustain": 0.3,
        "release": 0.2,
    });

    Object.assign(effectValues, {
        "reverb": 4.5,
        "feedback1": 0.8,
        "feedback2": 0.5,
        "wah": 4.5,
        "phaser1": 2.2,
        "phaser2": 3.5
    });

    $("#synth2").prop("checked", true);
    $("#waveform6").prop("checked", true);
    $("#modifier1").prop("checked", true);

    $("#reverb-toggle").prop("checked", true);
    addModule("reverb");
    $("#feedback-toggle").prop("checked", true);
    addModule("feedback");
    $("#wah-toggle").prop("checked", true);
    addModule("wah");
    $("#phaser-toggle").prop("checked", true);
    addModule("phaser");
}

function setPreset5() {
    Object.assign(synthType,{
        "synth": "amsynth",
        "waveform": "sine",
        "oscillator_type": "fm"
    });

    Object.assign(synthEnvelope, {
        "attack": 0.05,
        "decay": 0.1,
        "sustain": 1,
        "release": 4,
    });

    Object.assign(effectValues, {
        "reverb": 5
    });

    $("#synth2").prop("checked", true);
    $("#waveform1").prop("checked", true);
    $("#modifier3").prop("checked", true);

    $("#reverb-toggle").prop("checked", true);
    addModule("reverb");
}

function setPreset6() {
    Object.assign(synthType,{
        "synth": "fmsynth",
        "waveform": "triangle",
        "oscillator_type": "am"
    });

    Object.assign(synthEnvelope, {
        "attack": 0.005,
        "decay": 0.1,
        "sustain": 0.3,
        "release": 0.2,
    });

    Object.assign(effectValues, {
        "reverb": 2,
        "chorus1": 53,
        "chorus2": 1.5,
        "distortion": 0.5,
        "widener": 0.8,
        "vibrato1": 1.7,
        "vibrato2": 0.52,
    });

    $("#synth3").prop("checked", true);
    $("#waveform4").prop("checked", true);
    $("#modifier2").prop("checked", true);


    $("#chorus-toggle").prop("checked", true);
    addModule("chorus");
    $("#distortion-toggle").prop("checked", true);
    addModule("distortion");
    $("#widener-toggle").prop("checked", true);
    addModule("widener");
    $("#vibrato-toggle").prop("checked", true);
    addModule("vibrato");
    $("#reverb-toggle").prop("checked", true);
    addModule("reverb");
}


function resetCheckboxes() {
    for (const name of Object.keys(effectValues)) {
        $("#"+name+"-toggle").prop("checked", false);
    }
}

function setSliders() {
    for (const [name, value] of Object.entries(effectValues)) {
        $("#" + name+"-slider").val(value);
    }
    for (const [name, value] of Object.entries(synthEnvelope)) {
        $("#" + name+"-slider").val(value);
    }
    for (const [name, value] of Object.entries(synthType)) {
        $("#" + name+"-slider").val(value);
    }
}

// ------------ Module Chain Functions ------------

function connectChain() {
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

function resetChain() {
    console.log("RESETTING CHAIN of length "+ moduleChain.length);
    const originalChainLength = moduleChain.length;
    for (let i = 1; i < originalChainLength - 1; i++) {
        console.log("removing " + moduleChain[1]);
        removeModule({moduleObject: moduleChain[1]})
    }
    console.log("RESET CHAIN: " + moduleChain);
    connectChain();
}

function addModule (moduleType: string) {
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

function removeModule ({ moduleType, moduleObject }: { moduleType?: string; moduleObject?: Tone.ToneAudioNode }) {
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

function isDelayType(module: Tone.ToneAudioNode) {
    // return typeof module == typeof Tone.Delay || typeof module == typeof Tone.FeedbackDelay || typeof module == typeof Tone.PingPongDelay;
    const delayNames = ["Delay", "FeedbackDelay", "PingPongDelay"]
    return delayNames.includes(module.name);
}



// ------------ API Functions ------------

function updateDevices(event: MIDIConnectionEvent) {
    console.log(`Name: ${event.port?.name}$, Brand: ${event.port?.manufacturer}$, State: ${event.port?.state}$, Type: ${event.port?.type}$`);
}

function handleInput(input: MIDIMessageEvent) {
    if (input.data) {
        const command = input.data[0];
        const note = input.data[1];
        if (command == 144) {
            const velocity = input.data[2];
            if (velocity > 0) {
                noteOn(note, velocity);
            }
        } else if (command == 128) {
            noteOff(note);
        }
    }
}

function success(midiAccess: MIDIAccess) {
    console.log("success");
    midiAccess.addEventListener('statechange', (e) => updateDevices(e as MIDIConnectionEvent));

    const inputs = midiAccess.inputs;

    inputs.forEach((input) => {
        input.addEventListener('midimessage', handleInput)
    });
}

function failure() {
    console.log("Failed ");
}

function navigatorBegin() {
    console.log("navigatorBegin");
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(success, failure);
    }
}

function startup() {

    navigatorBegin();

    connectChain();

    updateSynth();
}


type EffectTypes =
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

type EnvelopeTypes =
    "attack"
    | "decay"
    | "sustain"
    | "release";

const keyToNote: { [key: string]: number } = {
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



let firstTimeLoading = true;

Tone.setContext(new Tone.Context({ latencyHint: 'interactive' }));
Tone.getContext().lookAhead = 0.01;

let currentSynth = new Tone.PolySynth();
currentSynth.volume.value = -6;

const limiter = new Tone.Limiter(-6);

const moduleChain: Tone.ToneAudioNode[] = [currentSynth, limiter];

const existingModules: { id: string, instance: Tone.ToneAudioNode }[] = [];


const synthType = {
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

const synthEnvelope = {
    "attack": 0.005,
    "decay": 0.1,
    "sustain": 0.3,
    "release": 1,
};


const effectValues: Record<string, number> = {
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

startup();

function App(): ReactElement {
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
    const [octave, setOctave] = useState(0);
    const [isMIDICompatible, setIsMIDICompatible] = useState(true);


    if (firstTimeLoading) {
        const synthBox: HTMLInputElement = document.getElementById("synth1") as HTMLInputElement;
        const waveformBox: HTMLInputElement = document.getElementById("waveform1") as HTMLInputElement;
        const modifierBox: HTMLInputElement = document.getElementById("modifier1") as HTMLInputElement;
        if (synthBox) {
            synthBox.checked = true;
            waveformBox.checked = true;
            modifierBox.checked = true;
            firstTimeLoading = false;
        }
    }

    useEffect(() => {
        if (!navigator.requestMIDIAccess) {
            setIsMIDICompatible(false);
            console.error("Web MIDI API is not supported in this browser.");
        }
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key == 'ArrowDown') {
                setOctave(octave - 1);
            } else if (event.key == 'ArrowUp') {
                setOctave(octave + 1);
            } else {
                const note = keyToNote[event.key];
                if (note && !pressedKeys.has(event.key)) {
                    setPressedKeys((prev) => new Set(prev).add(event.key));
                    noteOn(note, 127, octave);
                }
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.key != 'ArrowDown' && event.key != 'ArrowUp') {
                const note = keyToNote[event.key];
                if (note) {
                    setPressedKeys((prev) => {
                        const updated = new Set(prev);
                        updated.delete(event.key);
                        return updated;
                    });
                    noteOff(note, octave);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [pressedKeys, octave]);

    return (
        <div id={"body"}>
            <h1>SynthWeb</h1>
            <h2>Modular Synthesiser</h2>
            <div className="keyboard-mockup">
                <img
                    src={keyboardMockup}
                    alt="Keyboard Mockup"
                    style={{
                        width: '100%',
                        maxWidth: '800px',
                        height: 'auto',
                        display: 'block',
                        margin: '0 auto',
                    }}
                />
            </div>
            <div className={"card"}>

                <div className={"vertical"} id={"synth-column"}>
                    <div className={"column-title"}>
                        <h3>Synth</h3>
                    </div>
                    <div className={"vertical"} id={"synth-choices"}>

                        <input type="radio" id="synth1" name="synth" value="1" onClick={
                            () => {
                                synthType.synth = "synth";
                                updateSynth();
                            }
                        }/>
                        <label htmlFor="synth1" className="radio-label">Classic</label>

                        <input type="radio" id="synth2" name="synth" value="2" onClick={
                            () => {
                                synthType.synth = "amsynth";
                                updateSynth();
                            }
                        }/>
                        <label htmlFor="synth2" className="radio-label">AMSynth</label>

                        <input type="radio" id="synth3" name="synth" value="3" onClick={
                            () => {
                                synthType.synth = "fmsynth";
                                updateSynth();
                            }
                        }/>
                        <label htmlFor="synth3" className="radio-label">FMSynth</label>


                        <label className={"small-title"}>Harmonicity</label>
                        <input
                            type={"range"}
                            id={"harmonicity-slider"}
                            min={"1"}
                            max={"10"}
                            defaultValue={synthType.harmonicity}
                            step={"1"}
                            onChange={
                                (e) => {
                                    synthType.harmonicity = parseFloat(e.target.value);
                                    updateSynthSlider("harmonicity");
                                }
                            }
                        />
                        <input
                            type={"range"}
                            id={"modulation-index-slider"}
                            min={"1"}
                            max={"20"}
                            defaultValue={synthType.modulation_index}
                            step={"1"}
                            onChange={
                                (e) => {
                                    synthType.modulation_index = parseFloat(e.target.value);
                                    updateSynthSlider("modulation_index");
                                }
                            }
                        />

                        <label className={"small-title"}>Partials</label>

                        <div className={"reset-button"} onClick={
                            () => {
                                // resetPartials();
                                updateSynth();
                            }
                        }>
                            <label id={"reset-label"}>Reset</label>
                        </div>

                        <div className={"vertical"}>
                            <input
                                type={"range"}
                                id={"partials1-slider"}
                                min={"0"}
                                max={"1"}
                                defaultValue={synthType.partials1}
                                step={"0.01"}
                                onChange={
                                    (e) => {
                                        synthType.partials1 = parseFloat(e.target.value);
                                        setPartials();
                                    }
                                }
                            />
                            <input
                                type={"range"}
                                id={"partials2-slider"}
                                min={"0"}
                                max={"1"}
                                defaultValue={synthType.partials2}
                                step={"0.01"}
                                onChange={
                                    (e) => {
                                        synthType.partials2 = parseFloat(e.target.value);
                                        setPartials();
                                    }
                                }
                            />
                            <input
                                type={"range"}
                                id={"partials3-slider"}
                                min={"0"}
                                max={"1"}
                                defaultValue={synthType.partials3}
                                step={"0.01"}
                                onChange={
                                    (e) => {
                                        synthType.partials3 = parseFloat(e.target.value);
                                        setPartials();
                                    }
                                }
                            />
                            <input
                                type={"range"}
                                id={"partials4-slider"}
                                min={"0"}
                                max={"1"}
                                defaultValue={synthType.partials4}
                                step={"0.01"}
                                onChange={
                                    (e) => {
                                        synthType.partials4 = parseFloat(e.target.value);
                                        setPartials();
                                    }
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className={"vertical"} id={"waveform-column"}>
                    <div className={"column-title"}>
                        <h3>Waveform</h3>
                    </div>
                    <div className={"vertical"} id={"waveform-choices"}>
                        <input type="radio" id="waveform1" name="waveform" value="1" onClick={
                            () => {
                                synthType.waveform = "sine";
                                updateSynth();
                            }
                        }/>
                        <label htmlFor="waveform1" className="radio-label">Sine</label>

                        <input type="radio" id="waveform2" name="waveform" value="2" onClick={
                            () => {
                                synthType.waveform = "square";
                                updateSynth();
                            }
                        }/>
                        <label htmlFor="waveform2" className="radio-label">Square</label>

                        <input type="radio" id="waveform3" name="waveform" value="3" onClick={
                            () => {
                                synthType.waveform = "sawtooth";
                                updateSynth();
                            }
                        }/>
                        <label htmlFor="waveform3" className="radio-label">Sawtooth</label>

                        <input type="radio" id="waveform4" name="waveform" value="4" onClick={
                            () => {
                                synthType.waveform = "triangle";
                                updateSynth();
                            }
                        }/>
                        <label htmlFor="waveform4" className="radio-label">Triangle</label>

                        <input type="radio" id="waveform5" name="waveform" value="5" onClick={
                            () => {
                                synthType.waveform = "pulse";
                                updateSynth();
                            }
                        }/>
                        <label htmlFor="waveform5" className="radio-label">Pulse</label>

                        <input type="radio" id="waveform6" name="waveform" value="6" onClick={
                            () => {
                                synthType.waveform = "pwm";
                                updateSynth();
                            }
                        }/>
                        <label htmlFor="waveform6" className="radio-label">PWM</label>

                    </div>
                    <div className={"vertical"} id={"envelope-choices"}>
                        <div className={"effect2"}>
                            <label>Attack</label>
                            <div className={"sliderContainer"}>
                                <input
                                    type={"range"}
                                    id={"attack-slider"}
                                    min={"0.005"}
                                    max={"3"}
                                    defaultValue={synthEnvelope.attack}
                                    step={"0.005"}
                                    onChange={
                                        (e) => {
                                            synthEnvelope.attack = parseFloat(e.target.value);
                                            updateEnvelope("attack");
                                        }
                                    }
                                />
                            </div>
                        </div>
                        <div className={"effect2"}>
                            <label>Decay</label>
                            <div className={"sliderContainer"}>
                                <input
                                    type={"range"}
                                    id={"decay-slider"}
                                    min={"0.1"}
                                    max={"3"}
                                    defaultValue={synthEnvelope.decay}
                                    step={"0.01"}
                                    onChange={
                                        (e) => {
                                            synthEnvelope.decay = parseFloat(e.target.value);
                                            updateEnvelope("decay");
                                        }
                                    }
                                />
                            </div>
                        </div>
                        <div className={"effect2"}>
                            <label>Sustain</label>
                            <div className={"sliderContainer"}>
                                <input
                                    type={"range"}
                                    id={"sustain-slider"}
                                    min={"0"}
                                    max={"1"}
                                    defaultValue={synthEnvelope.sustain}
                                    step={"0.01"}
                                    onChange={
                                        (e) => {
                                            synthEnvelope.sustain = parseFloat(e.target.value);
                                            updateEnvelope("sustain");
                                        }
                                    }
                                />
                            </div>
                        </div>
                        <div className={"effect2"}>
                            <label>Release</label>
                            <div className={"sliderContainer"}>
                                <input
                                    type={"range"}
                                    id={"release-slider"}
                                    min={"0.01"}
                                    max={"5"}
                                    defaultValue={synthEnvelope.release}
                                    step={"0.01"}
                                    onChange={
                                        (e) => {
                                            synthEnvelope.release = parseFloat(e.target.value);
                                            updateEnvelope("release");
                                        }
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <input type="radio" id="modifier1" name="modifier" value="1" onClick={
                        () => {
                            synthType.oscillator_type = "";
                            updateSynth();
                        }
                    }/>
                    <label htmlFor="modifier1" className="radio-label">NONE</label>

                    <input type="radio" id="modifier2" name="modifier" value="2" onClick={
                        () => {
                            synthType.oscillator_type = "am";
                            updateSynth();
                        }
                    }/>
                    <label htmlFor="modifier2" className="radio-label">AM</label>

                    <input type="radio" id="modifier3" name="modifier" value="3" onClick={
                        () => {
                            synthType.oscillator_type = "fm";
                            updateSynth();
                        }
                    }/>
                    <label htmlFor="modifier3" className="radio-label">FM</label>

                    <input type="radio" id="modifier4" name="modifier" value="4" onClick={
                        () => {
                            synthType.oscillator_type = "fat";
                            updateSynth();
                        }
                    }/>
                    <label htmlFor="modifier4" className="radio-label">FAT</label>

                </div>
                <div className={"vertical"} id={"effects-column"}>
                    <div className={"column-title"}>
                        <h3>Modular Effects</h3>
                    </div>
                    <div className={"horizontal"}>
                        <div className={"vertical"} id={"left"}>
                            <div className={"vertical"}>
                                <div className={"effectVertical"}>
                                    <label>Highpass</label>
                                    <div className={"effectHorizontal"}>
                                        <input
                                            type={"checkbox"}
                                            id={"highpass-toggle"}
                                            onChange={
                                                (e) => {
                                                    if (e.target.checked) {
                                                        addModule("highpass");
                                                    } else {
                                                        removeModule({moduleType: "highpass"});
                                                    }
                                                }
                                            }
                                        />
                                        <input
                                            type={"range"}
                                            id={"highpass-slider"}
                                            min={"20"}
                                            max={"5000"}
                                            defaultValue={effectValues.highpass}
                                            step={"1"}
                                            onChange={
                                                (e) => {
                                                    const value = parseFloat(e.target.value);
                                                    effectValues.highpass = value;
                                                    if (existingModules.some(module => module.id === "highpass")) {
                                                        const {instance} = existingModules.find(module => module.id === "highpass")!;
                                                        (instance as Tone.Filter).frequency.value = value;
                                                    }
                                                }
                                            }
                                        />
                                    </div>
                                </div>
                                <div className={"effectVertical"}>
                                    <label>Lowpass</label>
                                    <div className={"effectHorizontal"}>
                                        <input
                                            type={"checkbox"}
                                            id={"lowpass-toggle"}
                                            onChange = {
                                                (e) => {
                                                    if (e.target.checked) {
                                                        addModule("lowpass");
                                                    }
                                                    else {
                                                        removeModule({moduleType: "lowpass"});
                                                    }
                                                }
                                            }
                                        />
                                        <input
                                            type={"range"}
                                            id={"lowpass-slider"}
                                            min={"20"}
                                            max={"5000"}
                                            defaultValue={effectValues.lowpass}
                                            step={"1"}
                                            onChange = {
                                                (e) => {
                                                    const value = parseFloat(e.target.value);
                                                    effectValues.lowpass = value;
                                                    if (existingModules.some(module => module.id === "lowpass")) {
                                                        const { instance } = existingModules.find(module => module.id === "lowpass")!;
                                                        (instance as Tone.Filter).frequency.value = value;
                                                    }
                                                }
                                            }
                                        />
                                    </div>
                                </div>
                                <div className={"effectVertical"}>
                                    <label>Bandpass</label>
                                    <div className={"effectHorizontal"}>
                                        <input
                                            type={"checkbox"}
                                            id={"bandpass-toggle"}
                                            onChange = {
                                                (e) => {
                                                    if (e.target.checked) {
                                                        addModule("bandpass");
                                                    }
                                                    else {
                                                        removeModule({moduleType: "bandpass"});
                                                    }
                                                }
                                            }
                                        />
                                        <input
                                            type={"range"}
                                            id={"bandpass-slider"}
                                            min={"20"}
                                            max={"5000"}
                                            defaultValue={effectValues.bandpass}
                                            step={"1"}
                                            onChange = {
                                                (e) => {
                                                    const value = parseFloat(e.target.value);
                                                    effectValues.bandpass = value;
                                                    if (existingModules.some(module => module.id === "bandpass")) {
                                                        const { instance } = existingModules.find(module => module.id === "bandpass")!;
                                                        (instance as Tone.Filter).frequency.value = value;
                                                    }
                                                }
                                            }
                                        />
                                    </div>
                                </div>
                                <div className={"effectVertical"}>
                                    <label>Notch</label>
                                    <div className={"effectHorizontal"}>
                                        <input
                                            type={"checkbox"}
                                            id={"notch-toggle"}
                                            onChange = {
                                                (e) => {
                                                    if (e.target.checked) {
                                                        addModule("notch");
                                                    }
                                                    else {
                                                        removeModule({moduleType: "notch"});
                                                    }
                                                }
                                            }
                                        />
                                        <input
                                            type={"range"}
                                            id={"notch-slider"}
                                            min={"20"}
                                            max={"5000"}
                                            defaultValue={effectValues.notch}
                                            step={"1"}
                                            onChange = {
                                                (e) => {
                                                    const value = parseFloat(e.target.value);
                                                    effectValues.notch = value;
                                                    if (existingModules.some(module => module.id === "notch")) {
                                                        const { instance } = existingModules.find(module => module.id === "notch")!;
                                                        (instance as Tone.Filter).frequency.value = value;
                                                    }
                                                }
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={"separator"}></div>
                            <div className={"vertical"}>
                                <div className={"effectVertical"}>
                                    <label>Delay</label>
                                    <div className={"effectHorizontal"}>
                                        <input
                                            type={"checkbox"}
                                            id={"delay-toggle"}
                                            onChange = {
                                                (e) => {
                                                    if (e.target.checked) {
                                                        addModule("delay");
                                                    }
                                                    else {
                                                        removeModule({moduleType: "delay"});
                                                    }
                                                }
                                            }
                                        />
                                        <input
                                            type={"range"}
                                            id={"delay-slider"}
                                            min={"0"}
                                            max={"1"}
                                            defaultValue={effectValues.delay}
                                            step={"0.01"}
                                            onMouseUp={() => {
                                                if (existingModules.some(module => module.id === "delay")) {
                                                    const { instance } = existingModules.find(module => module.id === "delay")!;
                                                    (instance as Tone.Delay).delayTime.value = effectValues.delay;
                                                }
                                            }
                                            }
                                            onChange = {
                                                (e) => {
                                                    effectValues.delay = parseFloat(e.target.value);
                                                }
                                            }
                                        />
                                    </div>
                                </div>
                                <div className={"effectVertical"}>
                                    <label>Reverb</label>
                                    <div className={"effectHorizontal"}>
                                        <input
                                            type={"checkbox"}
                                            id={"reverb-toggle"}
                                            onChange = {
                                                (e) => {
                                                    if (e.target.checked) {
                                                        addModule("reverb");
                                                    }
                                                    else {
                                                        removeModule({moduleType: "reverb"});
                                                    }
                                                }
                                            }
                                        />
                                        <input
                                            type={"range"}
                                            id={"reverb-slider"}
                                            min={"0.01"}
                                            max={"5"}
                                            defaultValue={effectValues.reverb}
                                            step={"0.01"}
                                            onMouseUp={() => {
                                                if (existingModules.some(module => module.id === "reverb")) {
                                                    const { instance } = existingModules.find(module => module.id === "reverb")!;
                                                    (instance as Tone.Reverb).decay = effectValues.reverb;
                                                }
                                            }
                                            }
                                            onChange = {
                                                (e) => {
                                                    effectValues.reverb = parseFloat(e.target.value);
                                                }
                                            }
                                        />
                                    </div>
                                </div>
                                <div className={"effectVertical"}>
                                    <label>Feedback</label>
                                    <div className={"effectHorizontal"}>
                                        <input
                                            type={"checkbox"}
                                            id={"feedback-toggle"}
                                            onChange = {
                                                (e) => {
                                                    if (e.target.checked) {
                                                        addModule("feedback");
                                                    }
                                                    else {
                                                        removeModule({moduleType: "feedback"});
                                                    }
                                                }
                                            }
                                        />
                                        <div className={"vertical"}>
                                            <input
                                                type={"range"}
                                                id={"feedback1-slider"}
                                                min={"0"}
                                                max={"2"}
                                                defaultValue={effectValues.feedback1}
                                                step={"0.01"}
                                                onMouseUp={
                                                    () => {
                                                        if (existingModules.some(module => module.id === "feedback")) {
                                                            const { instance } = existingModules.find(module => module.id === "feedback")!;
                                                            (instance as Tone.FeedbackDelay).delayTime.value = effectValues.feedback1;
                                                        }
                                                    }
                                                }
                                                onChange = {
                                                    (e) => {
                                                        effectValues.feedback1 = parseFloat(e.target.value);
                                                    }
                                                }
                                            />
                                            <input
                                                type={"range"}
                                                id={"feedback2-slider"}
                                                min={"0"}
                                                max={"1"}
                                                defaultValue={effectValues.feedback2}
                                                step={"0.01"}
                                                onChange = {
                                                    (e) => {
                                                        const value = parseFloat(e.target.value);
                                                        effectValues.feedback2 = value;
                                                        if (existingModules.some(module => module.id === "feedback")) {
                                                            const { instance } = existingModules.find(module => module.id === "feedback")!;
                                                            (instance as Tone.FeedbackDelay).feedback.value = value;
                                                        }
                                                    }
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={"effectVertical"}>
                                    <label>PingPong</label>
                                    <div className={"effectHorizontal"}>
                                        <input
                                            type={"checkbox"}
                                            id={"pingpong-toggle"}
                                            onChange = {
                                                (e) => {
                                                    if (e.target.checked) {
                                                        addModule("pingpong");
                                                    }
                                                    else {
                                                        removeModule({moduleType: "pingpong"});
                                                    }
                                                }
                                            }
                                        />
                                        <div className={"vertical"}>
                                            <input
                                                type={"range"}
                                                id={"pingpong1-slider"}
                                                min={"0"}
                                                max={"2"}
                                                defaultValue={effectValues.pingpong1}
                                                step={"0.01"}
                                                onMouseUp={
                                                    () => {
                                                        if (existingModules.some(module => module.id === "pingpong")) {
                                                            const { instance } = existingModules.find(module => module.id === "pingpong")!;
                                                            (instance as Tone.PingPongDelay).delayTime.value = effectValues.pingpong1;
                                                        }
                                                    }
                                                }
                                                onChange = {
                                                    (e) => {
                                                        effectValues.pingpong1 = parseFloat(e.target.value);
                                                    }
                                                }
                                            />
                                            <input
                                                type={"range"}
                                                id={"pingpong2-slider"}
                                                min={"0"}
                                                max={"1"}
                                                defaultValue={effectValues.pingpong2}
                                                step={"0.01"}
                                                onChange = {
                                                    (e) => {
                                                        const value = parseFloat(e.target.value);
                                                        effectValues.pingpong2 = value;
                                                        if (existingModules.some(module => module.id === "pingpong")) {
                                                            const { instance } = existingModules.find(module => module.id === "pingpong")!;
                                                            (instance as Tone.PingPongDelay).feedback.value = value;
                                                        }
                                                    }
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"vertical"} id={"right"}>
                            <div className={"effectVertical"}>
                                <label>Chorus</label>
                                <div className={"effectHorizontal"}>
                                    <input
                                        type={"checkbox"}
                                        id={"chorus-toggle"}
                                        onChange = {
                                            (e) => {
                                                if (e.target.checked) {
                                                    addModule("chorus");
                                                }
                                                else {
                                                    removeModule({moduleType: "chorus"});
                                                }
                                            }
                                        }
                                    />
                                    <div className={"vertical"}>
                                        <input
                                            type={"range"}
                                            id={"chorus1-slider"}
                                            min={"0"}
                                            max={"100"}
                                            defaultValue={effectValues.chorus1}
                                            step={"1"}
                                            onMouseUp={
                                                () => {
                                                    if (existingModules.some(module => module.id === "chorus")) {
                                                        const { instance } = existingModules.find(module => module.id === "chorus")!;
                                                        (instance as Tone.Chorus).delayTime = effectValues.chorus1;
                                                    }
                                                }
                                            }
                                            onChange = {
                                                (e) => {
                                                    effectValues.chorus1 = parseFloat(e.target.value);
                                                }
                                            }
                                        />
                                        <input
                                            type={"range"}
                                            id={"chorus2-slider"}
                                            min={"0"}
                                            max={"5"}
                                            defaultValue={effectValues.chorus2}
                                            step={"0.1"}
                                            onMouseUp={
                                                () => {
                                                    if (existingModules.some(module => module.id === "chorus")) {
                                                        const { instance } = existingModules.find(module => module.id === "chorus")!;
                                                        (instance as Tone.Chorus).depth = effectValues.chorus2;
                                                    }
                                                }
                                            }
                                            onChange = {
                                                (e) => {
                                                    effectValues.chorus2 = parseFloat(e.target.value);

                                                }
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={"effectVertical"}>
                                <label>Distortion</label>
                                <div className={"effectHorizontal"}>
                                    <input
                                        type={"checkbox"}
                                        id={"distortion-toggle"}
                                        onChange = {
                                            (e) => {
                                                if (e.target.checked) {
                                                    addModule("distortion");
                                                }
                                                else {
                                                    removeModule({moduleType: "distortion"});
                                                }
                                            }
                                        }
                                    />
                                    <input
                                        type={"range"}
                                        id={"distortion-slider"}
                                        min={"0"}
                                        max={"1"}
                                        defaultValue={effectValues.distortion}
                                        step={"0.01"}
                                        onChange = {
                                            (e) => {
                                                const value = parseFloat(e.target.value);
                                                effectValues.distortion = value;
                                                if (existingModules.some(module => module.id === "distortion")) {
                                                    const { instance } = existingModules.find(module => module.id === "distortion")!;
                                                    (instance as Tone.Distortion).distortion = value;
                                                }
                                            }
                                        }
                                    />
                                </div>
                            </div>
                            <div className={"effectVertical"}>
                                <label>Wah</label>
                                <div className={"effectHorizontal"}>
                                    <input
                                        type={"checkbox"}
                                        id={"wah-toggle"}
                                        onChange = {
                                            (e) => {
                                                if (e.target.checked) {
                                                    addModule("wah");
                                                }
                                                else {
                                                    removeModule({moduleType: "wah"});
                                                }
                                            }
                                        }
                                    />
                                    <input
                                        type={"range"}
                                        id={"wah-slider"}
                                        min={"0"}
                                        max={"10"}
                                        defaultValue={effectValues.wah}
                                        step={"0.1"}
                                        onChange = {
                                            (e) => {
                                                const value = parseFloat(e.target.value);
                                                effectValues.wah = value;
                                                if (existingModules.some(module => module.id === "wah")) {
                                                    const { instance } = existingModules.find(module => module.id === "wah")!;
                                                    (instance as Tone.AutoWah).octaves = value;
                                                }
                                            }
                                        }
                                    />
                                </div>
                            </div>
                            <div className={"effectVertical"}>
                                <label>Phaser</label>
                                <div className={"effectHorizontal"}>
                                    <input
                                        type={"checkbox"}
                                        id={"phaser-toggle"}
                                        onChange = {
                                            (e) => {
                                                if (e.target.checked) {
                                                    addModule("phaser");
                                                }
                                                else {
                                                    removeModule({moduleType: "phaser"});
                                                }
                                            }
                                        }
                                    />
                                    <div className={"vertical"}>
                                        <input
                                            type={"range"}
                                            id={"phaser1-slider"}
                                            min={"0"}
                                            max={"3"}
                                            defaultValue={effectValues.phaser1}
                                            step={"0.01"}
                                            onChange = {
                                                (e) => {
                                                    const value = parseFloat(e.target.value);
                                                    effectValues.phaser1 = value;
                                                    if (existingModules.some(module => module.id === "phaser")) {
                                                        const { instance } = existingModules.find(module => module.id === "phaser")!;
                                                        (instance as Tone.Phaser).frequency.value = value;
                                                    }
                                                }
                                            }
                                        />
                                        <input
                                            type={"range"}
                                            id={"phaser2-slider"}
                                            min={"0"}
                                            max={"10"}
                                            defaultValue={effectValues.phaser2}
                                            step={"0.1"}
                                            onChange = {
                                                (e) => {
                                                    const value = parseFloat(e.target.value);
                                                    effectValues.phaser2 = value;
                                                    if (existingModules.some(module => module.id === "phaser")) {
                                                        const { instance } = existingModules.find(module => module.id === "phaser")!;
                                                        (instance as Tone.Phaser).octaves = value;
                                                    }
                                                }
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={"effectVertical"}>
                                <label>Widener</label>
                                <div className={"effectHorizontal"}>
                                    <input
                                        type={"checkbox"}
                                        id={"widener-toggle"}
                                        onChange = {
                                            (e) => {
                                                if (e.target.checked) {
                                                    addModule("widener");
                                                }
                                                else {
                                                    removeModule({moduleType: "widener"});
                                                }
                                            }
                                        }
                                    />
                                    <input
                                        type={"range"}
                                        id={"widener-slider"}
                                        min={"0"}
                                        max={"1"}
                                        defaultValue={effectValues.widener}
                                        step={"0.01"}
                                        onChange = {
                                            (e) => {
                                                const value = parseFloat(e.target.value);
                                                effectValues.widener = value;
                                                if (existingModules.some(module => module.id === "widener")) {
                                                    const { instance } = existingModules.find(module => module.id === "widener")!;
                                                    (instance as Tone.StereoWidener).width.value = value;
                                                }
                                            }
                                        }
                                    />
                                </div>
                            </div>
                            <div className={"effectVertical"}>
                                <label>Vibrato</label>
                                <div className={"effectHorizontal"}>
                                    <input
                                        type={"checkbox"}
                                        id={"vibrato-toggle"}
                                        onChange = {
                                            (e) => {
                                                if (e.target.checked) {
                                                    addModule("vibrato");
                                                }
                                                else {
                                                    removeModule({moduleType: "vibrato"});
                                                }
                                            }
                                        }
                                    />
                                    <div className={"vertical"}>
                                        <input
                                            type={"range"}
                                            id={"vibrato1-slider"}
                                            min={"1"}
                                            max={"20"}
                                            defaultValue={effectValues.vibrato1}
                                            step={"0.01"}
                                            onChange = {
                                                (e) => {
                                                    const value = parseFloat(e.target.value);
                                                    effectValues.vibrato1 = value;
                                                    if (existingModules.some(module => module.id === "vibrato")) {
                                                        const { instance } = existingModules.find(module => module.id === "vibrato")!;
                                                        (instance as Tone.Vibrato).frequency.value = value;
                                                    }
                                                }
                                            }
                                        />
                                        <input
                                            type={"range"}
                                            id={"vibrato2-slider"}
                                            min={"0"}
                                            max={"1"}
                                            defaultValue={effectValues.vibrato2}
                                            step={"0.01"}
                                            onChange = {
                                                (e) => {
                                                    const value = parseFloat(e.target.value);
                                                    effectValues.vibrato2 = value;
                                                    if (existingModules.some(module => module.id === "vibrato")) {
                                                        const { instance } = existingModules.find(module => module.id === "vibrato")!;
                                                        (instance as Tone.Vibrato).depth.value = value;
                                                    }
                                                }
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={"effectVertical"}>
                                <label>Bit Crusher</label>
                                <div className={"effectHorizontal"}>
                                    <input
                                        type={"checkbox"}
                                        id={"bitcrusher-toggle"}
                                        onChange = {
                                            (e) => {
                                                if (e.target.checked) {
                                                    addModule("bitcrusher");
                                                }
                                                else {
                                                    removeModule({moduleType: "bitcrusher"});
                                                }
                                            }
                                        }
                                    />
                                    <input
                                        type={"range"}
                                        id={"bitcrusher-slider"}
                                        min={"3"}
                                        max={"8"}
                                        defaultValue={effectValues.bitcrusher}
                                        step={"1"}
                                        onChange = {
                                            (e) => {
                                                const value = parseFloat(e.target.value);
                                                effectValues.bitcrusher = value;
                                                if (existingModules.some(module => module.id === "bitcrusher")) {
                                                    const { instance } = existingModules.find(module => module.id === "bitcrusher")!;
                                                    (instance as Tone.BitCrusher).bits.value = value;
                                                }
                                            }
                                        }
                                    />
                                </div>
                            </div>
                            <div className={"effectVertical"}>
                                <label>Chebyshev</label>
                                <div className={"effectHorizontal"}>
                                    <input
                                        type={"checkbox"}
                                        id={"chebyshev-toggle"}
                                        onChange = {
                                            (e) => {
                                                if (e.target.checked) {
                                                    addModule("chebyshev");
                                                }
                                                else {
                                                    removeModule({moduleType: "chebyshev"});
                                                }
                                            }
                                        }
                                    />
                                    <input
                                        type={"range"}
                                        id={"chebyshev-slider"}
                                        min={"1"}
                                        max={"100"}
                                        defaultValue={effectValues.chebyshev}
                                        step={"1"}
                                        onChange = {
                                            (e) => {
                                                const value = parseFloat(e.target.value);
                                                effectValues.chebyshev = value;
                                                if (existingModules.some(module => module.id === "chebyshev")) {
                                                    const { instance } = existingModules.find(module => module.id === "chebyshev")!;
                                                    (instance as Tone.Chebyshev).order = value;
                                                }
                                            }
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"separator"} />
                    <h3>Presets</h3>
                    <button onClick={
                        ()=> {
                            setPreset(0);
                        }
                    }>Randomise</button>
                    <div className={"horizontal"}>
                        <div className={"vertical"}>
                            <button onClick={
                                ()=> {
                                    setPreset(1);
                                }
                            }>Atmospheric</button>
                            <button onClick={
                                ()=> {
                                    setPreset(3);
                                }
                            }>Organic Bass</button>
                            <button onClick={
                                () => {
                                    setPreset(5);
                                }
                            }>Organ</button>
                        </div>
                        <div className={"vertical"}>
                            <button onClick={
                                ()=> {
                                    setPreset(2);
                                }
                            }>Harp</button>
                            <button onClick={
                                ()=> {
                                    setPreset(4);
                                }
                            }>Submarine</button>
                            <button onClick={
                                ()=> {
                                    setPreset(6);
                                }
                            }>Alien Violin</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {!isMIDICompatible && (
                    <div className="midi_warning">
                        <p>
                            This browser does not support the Web MIDI API.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default App;
