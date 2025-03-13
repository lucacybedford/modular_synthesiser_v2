import { useEffect, useState } from "react";
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


function App() {
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
    const [octave, setOctave] = useState(0);

    const [selectedSynth, setSelectedSynth] = useState<Synthesiser | null>(null);
    const [selectedSpace, setSelectedSpace] = useState<number | null>(null);
    const [, setSelectedModule] = useState<string | null>(null);
    const [modules, setModules] = useState<{[key: number]: string | null}>({});


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


    const handleSynthSelection = (synth: Synthesiser) => {
        setSelectedSynth(synth);
        console.log("Synth "+synth.id+" selected");
    };

    const handleSpaceSelection = (id: number) => {
        setSelectedSpace(id);
        console.log("Space "+id+" selected");
    };

    const handleModuleSelection = (moduleType: string) => {
        setSelectedModule(moduleType);
        console.log(`Module ${moduleType} selected`);
    };


    const addModule = (spaceId: number, moduleType: string) => {
        setModules(prevModules => ({
            ...prevModules,
            [spaceId]: moduleType
        }));
        console.log(`Adding module ${moduleType} to space ${spaceId}`);



        // Additional logic here to update synth parameters based on the new module.
        // This is where you'd connect the module to the synth's audio graph.
    };

    const removeModule = (spaceId: number) => {
        setModules(prevModules => {
            const newModules = {...prevModules};
            delete newModules[spaceId];
            return newModules;
        });
        console.log(`Removing module from space ${spaceId}`);
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
                    <ModuleBoard
                        onSynthSelect = {handleSynthSelection}
                        selectedSpace={selectedSpace}
                        onSpaceSelect={handleSpaceSelection}
                        modules={modules}
                        addModule={addModule}
                        removeModule={removeModule}
                    />
                    <ParameterBoard selectedSynth = {selectedSynth}/>
                </div>
                <ModuleSelector onModuleSelect={handleModuleSelection}/>
            </div>
        </div>
    );
}

export default App;