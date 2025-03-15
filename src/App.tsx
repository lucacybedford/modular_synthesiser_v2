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
    const [, setSelectedModuleType] = useState<string | null>(null);
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
        setSelectedModuleType(moduleType);
        console.log(`Module ${moduleType} selected`);
    };


    const addModule = (spaceId: number, moduleType: string) => {
        const {synth, row} = getSynthRow(spaceId);

        synth.addModule(moduleType, spaceId - row*6);
        setModules(prevModules => ({
            ...prevModules,
            [spaceId]: moduleType
        }));

    };

    const removeModule = (spaceId: number) => {

        const moduleToRemove = modules[spaceId];
        if (!moduleToRemove) {
            console.warn("No module in this slot to remove.");
            return;
        }

        const {synth, row} = getSynthRow(spaceId);

        synth.removeModule(spaceId - row * 6);
        setModules(prevModules => {
            const newModules = {...prevModules};
            delete newModules[spaceId];
            return newModules;
        });
    };

    const getSynthRow = (spaceId: number) => {
        let synth: Synthesiser = synth1;
        let row = 0;
        if (spaceId < 7) {
            synth = synth1;
            row = 0;
        } else if (spaceId > 6 && spaceId < 13) {
            synth = synth2;
            row = 1;
        } else if (spaceId > 12) {
            synth = synth3;
            row = 2;
        }

        return {synth, row};
    }


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