import { synth1, synth2, synth3 } from "./audio.tsx";

export function updateDevices(event: MIDIConnectionEvent) {
    console.log(`Name: ${event.port?.name}$, Brand: ${event.port?.manufacturer}$, State: ${event.port?.state}$, Type: ${event.port?.type}$`);
}

export function handleInput(input: MIDIMessageEvent) {
    if (input.data) {
        const command = input.data[0];
        const note = input.data[1];
        if (command == 144) {
            const velocity = input.data[2];
            if (velocity > 0) {
                synth1.noteOn(note, velocity);
                synth2.noteOn(note, velocity);
                synth3.noteOn(note, velocity);
            } else {
                synth1.noteOff(note);
                synth2.noteOff(note);
                synth3.noteOff(note);
            }
        } else if (command == 128) {
            synth1.noteOff(note);
            synth2.noteOff(note);
            synth3.noteOff(note);
        }
    }
}

export function success(midiAccess: MIDIAccess) {
    console.log("success");
    midiAccess.addEventListener('statechange', (e) => updateDevices(e as MIDIConnectionEvent));

    const inputs = midiAccess.inputs;

    inputs.forEach((input) => {
        input.addEventListener('midimessage', handleInput)
    });
}

export function failure() {
    console.log("Failed ");
}

export function startupMIDI() {
    console.log("navigatorBegin");
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(success, failure);
    }
}