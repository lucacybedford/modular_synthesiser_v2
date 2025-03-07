import { ReactElement, useEffect, useState } from "react";
import './stylesheets/App.css';
import './stylesheets/index.css';
import './stylesheets/switch.css';
import './stylesheets/module.css';
import './stylesheets/parameterBoard.css';
import './stylesheets/radioButton.css';
import './stylesheets/slider.css';
import ModuleBoard from "./components/ModuleBoard";
import ParameterBoard from "./components/ParameterBoard";
import ModuleSelector from "./components/ModuleSelector";
import logo from './assets/logo.png';
import { keyToNote } from "./utils/constants";
import { synth1, synth2, synth3 } from "./utils/audio.tsx";
import {Synthesiser} from "./Synthesiser.tsx";


let isMIDICompatible = true;

if (!navigator.requestMIDIAccess) {
    isMIDICompatible = false;
    console.error("Web MIDI API is not supported in this browser.");
}


function App(): ReactElement {
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
    const [octave, setOctave] = useState(0);

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
                    synth1.noteOn(note, 127, octave);
                    synth2.noteOn(note, 127, octave);
                    synth3.noteOn(note, 127, octave);
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
                    synth1.noteOff(note, octave);
                    synth2.noteOff(note, octave);
                    synth3.noteOff(note, octave);
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

    const [selectedSynth, setSelectedSynth] = useState<Synthesiser | null>(null); // Initialize to null

    const handleSynthSelection = (synth: Synthesiser) => {
        setSelectedSynth(synth);
        console.log("Synth "+synth.id+" selected");
    };

    return (
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
                {!isMIDICompatible && (
                    <div id={"MIDI-warning"}>
                        This browser does not support Web MIDI API.
                    </div>
                )}
            </div>
            <div id={"horizontal-container"}>
                <div id={"vertical-container"}>
                    <ModuleBoard onSynthSelect = {handleSynthSelection}/>
                    <ParameterBoard selectedSynth = {selectedSynth}/>
                </div>
                <ModuleSelector />
            </div>
        </div>
    );
}

export default App;