// src/utils/midi.ts
import { noteOn, noteOff } from "./audio"; // Import the audio functions

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
                noteOn(note, velocity);
            } else {
                noteOff(note);
            }
        } else if (command == 128) {
            noteOff(note);
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

export function navigatorBegin() {
    console.log("navigatorBegin");
    if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(success, failure);
    }
}

export function startupMIDI() {
    navigatorBegin();
}