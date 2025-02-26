import { ReactElement, useEffect, useState } from "react";
import './App.css';
import './index.css';
import './switch.css';


import ModuleBoard from "./components/ModuleBoard";
import ParameterBoard from "./components/ParameterBoard";
import ModuleSelector from "./components/ModuleSelector";
import { startup, noteOn, noteOff } from "./utils/audio"; // Import audio functions
import logo from './assets/logo.png';
import { keyToNote } from "./utils/constants";

function App(): ReactElement {
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
    const [octave, setOctave] = useState(0);
    const [, setIsMIDICompatible] = useState(true);

    useEffect(() => {
        startup(); // Initialize audio context and MIDI
    }, []); // Run once on mount

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
                    noteOn(note, 127, octave); // Use imported function
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
                    noteOff(note, octave); // Use imported function
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
                    <ModuleBoard />
                    <ParameterBoard />
                </div>
                <ModuleSelector />
            </div>
        </div>
    );
}

export default App;