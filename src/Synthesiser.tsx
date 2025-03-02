import * as Tone from "tone";
import { effectValues, synthEnvelope, synth1Parameters } from "./utils/constants";
import { EffectTypes, EnvelopeTypes } from "./utils/types";
import $ from "jquery";

export class Synthesiser {
    private currentSynth: Tone.PolySynth;
    private readonly limiter: Tone.Limiter;
    private readonly moduleChain: Tone.ToneAudioNode[];
    private existingModules: { id: string, instance: Tone.ToneAudioNode }[] = [];
    private synthOn: boolean = false;
    public id: number;


    synthParameters = {
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

    synthEnvelope = {
        "attack": 0.005,
        "decay": 0.1,
        "sustain": 0.3,
        "release": 2,
    };

    constructor(id: number) {
        this.currentSynth = new Tone.PolySynth();
        this.currentSynth.volume.value = -6;
        this.id = id;

        this.limiter = new Tone.Limiter(-6);

        this.moduleChain = [this.currentSynth, this.limiter];

        this.updateSynth();
    }


    // ------------ Synth Functions ------------

    public turnOn(): void {
        this.synthOn = true;
    }

    public turnOff(): void {
        this.synthOn = false;
    }

    public updateSynth(): void {
        /*
        Updates the base synth object with all its parameters.
         */
        console.log("UPDATING SYNTH");
        this.currentSynth.dispose();
        let newSynth: Tone.PolySynth;

        switch (this.synthParameters.synth) {
            case "synth": {
                newSynth = new Tone.PolySynth(Tone.Synth);
                break;
            }
            case "amsynth": {
                newSynth = new Tone.PolySynth(Tone.AMSynth);
                (newSynth as Tone.PolySynth<Tone.AMSynth>).set({ harmonicity: this.synthParameters.harmonicity });
                break;
            }
            case "fmsynth": {
                newSynth = new Tone.PolySynth(Tone.FMSynth);
                (newSynth as Tone.PolySynth<Tone.FMSynth>).set({ harmonicity: this.synthParameters.harmonicity });
                (newSynth as Tone.PolySynth<Tone.FMSynth>).set({ modulationIndex: this.synthParameters.modulation_index });
                break;
            }
            default: {
                return;
            }
        }

        newSynth.volume.value = -6;

        this.moduleChain[0] = newSynth;
        this.currentSynth = newSynth;


        this.setEnvelope();
        this.resetPartials();
        this.setOscillatorType();
        this.connectChain();
    }


    public midiToFreq(number: number): number {
        /*
        Converts a MIDI note into the equivalent note frequency.
         */
        const a = 440;
        return (a / 32) * (2 ** ((number - 9) / 12));
    }

    public noteOn(note: number, velocity: number, octave: number = 0): void {
        /*
        Triggers a note.
         */
        if (this.synthOn) {
            this.currentSynth.triggerAttack(this.midiToFreq(note + octave * 12), Tone.now(), velocity / 127);
            console.log(this.currentSynth.activeVoices);
        }
    }

    public noteOff(note: number, octave: number = 0): void {
        /*
        Releases a note.
         */
        if (this.synthOn) {
            this.currentSynth.triggerRelease(this.midiToFreq(note + octave * 12));
        }
    }

    public updateHarmonicityAndModulation(element: keyof typeof this.synthParameters): void {
        /*
        Updates the harmonicity and modulation index for AM and FM synths
         */
        console.log(`Updating slider ${element}`);
        if (this.synthParameters.synth == "amsynth") {
            if (element == "harmonicity") {
                (this.currentSynth as Tone.PolySynth<Tone.AMSynth>).set({ harmonicity: this.synthParameters.harmonicity })
            }
        }

        else if (this.synthParameters.synth == "fmsynth") {
            if (element == "harmonicity") {
                (this.currentSynth as Tone.PolySynth<Tone.FMSynth>).set({ harmonicity: this.synthParameters.harmonicity })
            }

            else if (element == "modulation_index") {
                (this.currentSynth as Tone.PolySynth<Tone.FMSynth>).set({ modulationIndex: this.synthParameters.modulation_index })
            }
        }
    }

    public updateEnvelope(element: EnvelopeTypes): void {
        /*
        Updates an element from the synth's envelope
         */
        switch (element) {
            case "attack": {
                this.currentSynth.set({ envelope: { attack: this.synthEnvelope[element] } });
                break;
            }
            case "decay": {
                this.currentSynth.set({ envelope: { decay: this.synthEnvelope[element] } });
                break;
            }
            case "sustain": {
                this.currentSynth.set({ envelope: { sustain: this.synthEnvelope[element] } });
                break;
            }
            case "release": {
                this.currentSynth.set({ envelope: { release: this.synthEnvelope[element] } });
                break;
            }
            default: {
                return;
            }
        }
    }

    public setEnvelope(): void {
        /*
        Updates all envelope settings at once
         */
        this.currentSynth.set({
            envelope: {
                attack: this.synthEnvelope.attack,
                decay: this.synthEnvelope.decay,
                sustain: this.synthEnvelope.sustain,
                release: this.synthEnvelope.release
            }
        })
    }

    public setPartials(): void {
        /*
        Updates all oscillator partials at once
         */
        this.currentSynth.set({
            oscillator: {
                partials: [
                    this.synthParameters.partials1,
                    this.synthParameters.partials2,
                    this.synthParameters.partials3,
                    this.synthParameters.partials4
                ]
            }
        })
    }

    public resetPartials(): void {
        /*
        Resets oscillator partials to 0
         */
        this.synthParameters.partials1 = 0;
        this.synthParameters.partials2 = 0;
        this.synthParameters.partials3 = 0;
        this.synthParameters.partials4 = 0;

        $("#partials1-slider").val("0");
        $("#partials2-slider").val("0");
        $("#partials3-slider").val("0");
        $("#partials4-slider").val("0");

        this.setPartials();
    }

    public setOscillatorType(): void {
        /*
        Sets the oscillator waveform
         */
        let oscillatorType = this.synthParameters.waveform as EffectTypes;
        if (oscillatorType != "pulse" && oscillatorType != "pwm") {
            oscillatorType = this.synthParameters.oscillator_type + oscillatorType as EffectTypes;
        }
        this.currentSynth.set({ oscillator: { type: oscillatorType as EffectTypes } });
    }


    public setPreset(number: number): void {
        /*
        Sets the correct modules and parameters for each preset
         */
        this.resetChain();
        this.resetCheckboxes();
        switch (number) {
            case 0:
                this.setPresetRandom();
                break;
            case 1:
                this.setPreset1();
                break;
            case 2:
                this.setPreset2();
                break;
            case 3:
                this.setPreset3();
                break;
            case 4:
                this.setPreset4();
                break;
            case 5:
                this.setPreset5();
                break;
            case 6:
                this.setPreset6();
                break;
            default:
                break;
        }
        this.setSliders();
        this.connectChain();
        this.updateSynth();
    }

    public setPresetRandom(): void {
        /*
        Randomises which modules are active and all parameters linked to oscillator
         */
        let randomIsOn;
        const notModules = ["bitcrusher", "highpass", "lowpass", "notch", "bandpass", "phaser1", "phaser2", "feedback1", "feedback2", "pingpong1", "pingpong2", "chorus1", "chorus2", "vibrato1", "vibrato2"];

        const synthNumber = (Math.random() * 4).toFixed(0);
        switch (synthNumber) {
            case "0":
                synth1Parameters["synth"] = "synth";
                $("#synth1").prop("checked", true);
                break;
            case "1":
                synth1Parameters["synth"] = "amsynth";
                $("#synth2").prop("checked", true);
                break;
            case "2":
                synth1Parameters["synth"] = "fmsynth";
                $("#synth3").prop("checked", true);
                break;
        }

        const waveformNumber = (Math.random() * 7).toFixed(0);
        switch (waveformNumber) {
            case "0":
                synth1Parameters["waveform"] = "sine";
                $("#waveform1").prop("checked", true);
                break;
            case "1":
                synth1Parameters["waveform"] = "square";
                $("#waveform2").prop("checked", true);
                break;
            case "2":
                synth1Parameters["waveform"] = "sawtooth";
                $("#waveform3").prop("checked", true);
                break;
            case "3":
                synth1Parameters["waveform"] = "triangle";
                $("#waveform4").prop("checked", true);
                break;
            case "4":
                synth1Parameters["waveform"] = "pulse";
                $("#waveform5").prop("checked", true);
                break;
            case "5":
                synth1Parameters["waveform"] = "pwm";
                $("#waveform6").prop("checked", true);
                break;
        }

        const modifierNumber = (Math.random() * 5).toFixed(0);
        switch (modifierNumber) {
            case "0":
                synth1Parameters["oscillator_type"] = "";
                $("#modifier1").prop("checked", true);
                break;
            case "1":
                synth1Parameters["oscillator_type"] = "am";
                $("#modifier2").prop("checked", true);
                break;
            case "2":
                synth1Parameters["oscillator_type"] = "fm";
                $("#modifier3").prop("checked", true);
                break;
            case "3":
                synth1Parameters["oscillator_type"] = "fat";
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
                this.addModule(name);
            }
        }
    }

    public setPreset1(): void {
        /*
        All settings for preset 1
         */
        Object.assign(synth1Parameters, {
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
        this.addModule("reverb");
        $("#pingpong-toggle").prop("checked", true);
        this.addModule("pingpong");
    }

    public setPreset2(): void {
        /*
        All settings for preset 2
         */
        Object.assign(synth1Parameters, {
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
        this.addModule("lowpass");
        $("#feedback-toggle").prop("checked", true);
        this.addModule("feedback");
        $("#widener-toggle").prop("checked", true);
        this.addModule("widener");
    }

    public setPreset3(): void {
        /*
        All settings for preset 3
         */
        Object.assign(synth1Parameters, {
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
        this.addModule("lowpass");
        $("#wah-toggle").prop("checked", true);
        this.addModule("wah");
    }

    public setPreset4(): void {
        /*
        All settings for preset 4
         */
        Object.assign(synth1Parameters, {
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
        this.addModule("reverb");
        $("#feedback-toggle").prop("checked", true);
        this.addModule("feedback");
        $("#wah-toggle").prop("checked", true);
        this.addModule("wah");
        $("#phaser-toggle").prop("checked", true);
        this.addModule("phaser");
    }

    public setPreset5(): void {
        /*
        All settings for preset 5
         */
        Object.assign(synth1Parameters, {
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
        this.addModule("reverb");
    }

    public setPreset6(): void {
        /*
        All settings for preset 6
         */
        Object.assign(synth1Parameters, {
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
        this.addModule("chorus");
        $("#distortion-toggle").prop("checked", true);
        this.addModule("distortion");
        $("#widener-toggle").prop("checked", true);
        this.addModule("widener");
        $("#vibrato-toggle").prop("checked", true);
        this.addModule("vibrato");
        $("#reverb-toggle").prop("checked", true);
        this.addModule("reverb");
    }


    public resetCheckboxes(): void {
        /*
        Turns all checkboxes off
         */
        for (const name of Object.keys(effectValues)) {
            $("#" + name + "-toggle").prop("checked", false);
        }
    }

    public setSliders(): void {
        /*
        Sets the sliders to the stored values
         */
        for (const [name, value] of Object.entries(effectValues)) {
            $("#" + name + "-slider").val(value);
        }
        for (const [name, value] of Object.entries(synthEnvelope)) {
            $("#" + name + "-slider").val(value);
        }
        for (const [name, value] of Object.entries(synth1Parameters)) {
            $("#" + name + "-slider").val(value);
        }
    }

    // ------------ Module Chain Functions ------------

    public connectChain(): void {
        /*
        Connects all the modules in the module chain
         */
        for (let i = 0; i < this.moduleChain.length - 1; i++) {
            const first = this.moduleChain[i];
            const second = this.moduleChain[i + 1];
            first.disconnect();
            first.connect(second);
            if (this.isDelayType(second)) {
                let y = i + 2;
                while (this.isDelayType(this.moduleChain[y])) {
                    y += 1;
                }
                first.connect(this.moduleChain[y]);
            }
        }
        this.moduleChain[this.moduleChain.length - 1].toDestination();
    }

    public resetChain(): void {
        /*
        Removes all modules from module chain
         */
        console.log("RESETTING CHAIN of length " + this.moduleChain.length);
        const originalChainLength = this.moduleChain.length;
        for (let i = 1; i < originalChainLength - 1; i++) {
            console.log("removing " + this.moduleChain[1]);
            this.removeModule({ moduleObject: this.moduleChain[1] })
        }
        console.log("RESET CHAIN: " + this.moduleChain);
        this.connectChain();
    }

    public addModule(moduleType: string): void {
        /*
        Adds a module to the module chain
         */
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
                console.warn("Unknown module Type: " + moduleType);
                return;
        }
        this.existingModules.push({ id: moduleType, instance: module });

        this.moduleChain.pop();
        this.moduleChain.push(module);
        this.moduleChain.push(this.limiter);

        this.connectChain();
        console.log(this.moduleChain);
    }

    public removeModule({ moduleType, moduleObject }: { moduleType?: string; moduleObject?: Tone.ToneAudioNode }): void {
        /*
        Removes a module based on the object or module type passed in
         */
        if (moduleObject) {
            const moduleIndex = this.existingModules.findIndex(module => module.instance === moduleObject);
            if (moduleIndex === -1) {
                console.warn(`Module ${moduleType} not found`);
                return;
            }

            this.existingModules.splice(moduleIndex, 1);

            const chainIndex = this.moduleChain.indexOf(moduleObject);
            if (chainIndex === -1) {
                console.warn(`Module ${moduleType} not found`);
                return;
            }
            moduleObject.dispose();
            this.moduleChain.splice(chainIndex, 1);
        } else if (moduleType) {
            const moduleIndex = this.existingModules.findIndex(module => module.id == moduleType);
            if (moduleIndex === -1) {
                console.warn(`Module ${moduleType} not found`);
                return;
            }

            const { instance } = this.existingModules[moduleIndex];
            this.existingModules.splice(moduleIndex, 1);

            const chainIndex = this.moduleChain.indexOf(instance);
            if (chainIndex !== -1) {
                instance.dispose();
                this.moduleChain.splice(chainIndex, 1);
            }
        }

        this.connectChain();
        console.log(this.moduleChain);
    }

    public isDelayType(module: Tone.ToneAudioNode): boolean {
        /*
        Checks if the selected module is a module which adds delay
         */
        const delayNames = ["Delay", "FeedbackDelay", "PingPongDelay"]
        return delayNames.includes(module.name);
    }
}