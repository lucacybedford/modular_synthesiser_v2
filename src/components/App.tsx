import React, { useState, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ModuleBoard from './ModuleBoard';
import ModuleSelector from './ModuleSelector';
import ParameterBoard from './ParameterBoard';
import logo from '../assets/logo.png';
import './App.css';
import { keyToNote } from "./../utils/noteUtils";
import { midiToFreq } from "../utils/noteUtils";
import * as Tone from "tone";
import { navigatorBegin } from "../utils/midiUtils";
import { addModule, connectChain, currentSynth, resetChain, setEnvelope, synthType, updateButton, updateSynth } from "../utils/audioUtils";
import $ from "jquery";
import { EffectTypes, EnvelopeTypes } from "../utils/types";

// ------------ Synth Functions ------------
// ------------ Module Chain Functions ------------
// ------------ API Functions ------------
// ------------ Types ------------

// ------------ Initialisation ------------

navigatorBegin();
connectChain();
updateSynth();

let firstTimeLoading = true;

function App(): React.ReactElement {
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
    const [octave, setOctave] = useState(0);
    const [isMIDICompatible, setIsMIDICompatible] = useState(true);

    const [moduleBoard, setModuleBoard] = useState<string[]>([
        'reverb',
        'delay',
        'distortion',
        'phaser',
        'chorus',
        'widener',
    ]);

    // const [initialModuleBoard, setInitialModuleBoard] = useState([
    //     null, // Slot 1
    //     null, // Slot 2
    //     null, // Slot 3
    //     null, // Slot 4
    //     null, // Slot 5
    //     null  // Slot 6
    // ]);

    // setPreset(-1);
    // updateEnvelope("sodifba" as EnvelopeTypes);
    // updateSynthSlider("oihwef" as "synth");

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

    function noteOn(note: number, velocity: number, octave: number = 0){
        currentSynth.triggerAttack(midiToFreq(note + octave * 12), Tone.now(), velocity / 127);
        console.log(currentSynth.activeVoices);
        // console.log(effectValues);
        // console.log(synthType);
    } // triggers a note

    function noteOff(note: number, octave: number = 0) {
        currentSynth.triggerRelease(midiToFreq(note + octave * 12), Tone.now());
    } // releases the note

    return (
        <DndProvider backend={HTML5Backend}>
            <div id={"body"}>
                <div id={"title-bar"}>
                    <img
                        src={logo}
                        alt="Logo"
                        style={{
                            height: '100%',
                            width: 'auto',
                            marginLeft: '6px',
                            marginRight: '6px'
                        }}
                    />
                    <h1>SynthWeb - Modular Synthesiser</h1>
                </div>
                <div id={"horizontal-container"}>
                    <div id={"vertical-container"}>
                        <ModuleBoard moduleBoard={moduleBoard} setModuleBoard={setModuleBoard} />
                        <ParameterBoard />
                    </div>
                    <ModuleSelector />
                </div>
            </div>
        </DndProvider>
    );
}

export default App;