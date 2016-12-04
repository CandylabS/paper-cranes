// =======================SYNTHESIZER=======================
/*
let synth = new Tone.MonoSynth({
oscillator: {type: 'sawtooth'},
envelope: {
attack: 0.1,
// if we set the release of the synth to happen over a linear curve of four seconds, we get a very slow fading out of the sound after it's released.
release: 4,
releaseCurve: 'linear'
},
filterEnvelope: {
baseFrequency: 200,
octaves: 2,
attack: 0,
delay: 0,
release: 1000
}
});
*/
function makeSynth() {
	let envelope = {
		attack: 0.1,
		release: 4,
		releaseCurve: 'linear'
	};
	let filterEnvelope = {
		baseFrequency: 200,
		octaves: 2, // this is really really important to make a MUFFLE sound
		attack: 0,
		delay: 0,
		release: 1000
	};
	return new Tone.DuoSynth({
		harmonicity: 1,
		volume: -20,
		voice0: {
			oscillator: {
				type: 'sawtooth'
			},
			envelope,
			filterEnvelope
		},
		voice1: {
			oscillator: {
				type: 'sine'
			},
			envelope,
			filterEnvelope
		},
		vibratoRate: 0.5,
		vibratoAmount: 0.1
	});
}

let leftSynth = makeSynth();
let rightSynth = makeSynth();

let leftPanner = new Tone.Panner(-0.5);
let rightPanner = new Tone.Panner(0.5);

// ================================ECHO============================
let echo = new Tone.FeedbackDelay('16n', 0.2);

let delay = Tone.context.createDelay(6.0);
let delayFade = Tone.context.createGain();

delay.delayTime.value = 6.0;
delayFade.gain.value = 0.75;

// ===========================AUDIO CONNECTION==============================
leftSynth.connect(leftPanner);
rightSynth.connect(rightPanner);
leftPanner.connect(echo);
rightPanner.connect(echo);

echo.toMaster();
echo.connect(delay);
delay.connect(Tone.context.destination);
delay.connect(delayFade);
delayFade.connect(delay);

// DEFAULT: bpm =120; measure 4/4
new Tone.Loop(time => {
	// We'll play leftSynth here
	// Trigger C5, and hold for a full note (measure) + two 1/4 notes
	leftSynth.triggerAttackRelease('C5', '1:2', time);
	// Switch note to D5 after two 1/4 notes without retriggering
	leftSynth.setNote('D5', '+0:2');
	// the pattern will be 1 2 - - - and after 68s again
	// Trigger E4 after 6 measures and hold for two 1/4 notes.
	leftSynth.triggerAttackRelease('E4', '0:2', '+6:0');

	// Trigger G4 after 11 measures + a two 1/4 notes, and hold for two 1/4 notes.
	leftSynth.triggerAttackRelease('G4', '0:2', '+11:2');

	// Trigger E5 after 19 measures and hold for 2 measures.
	// Switch to G5, A5, G5 after delay of a 1/4 note + two 1/16 notes each.
	leftSynth.triggerAttackRelease('E5', '2:0', '+19:0');
	leftSynth.setNote('G5', '+19:1:2');
	leftSynth.setNote('A5', '+19:3:0');
	leftSynth.setNote('G5', '+19:4:2');
}, '34m').start(); // duration of 68sec

new Tone.Loop(time => {
	// We'll play rightSynth here
	// Trigger D4 after 5 measures and hold for 1 full measure + two 1/4 notes
	rightSynth.triggerAttackRelease('D4', '1:2', '+5:0');
	// Switch to E4 after one more measure
	rightSynth.setNote('E4', '+6:0');

	// Trigger B3 after 11 measures + two 1/4 notes + two 1/16 notes. Hold for one measure
	rightSynth.triggerAttackRelease('B3', '1m', '+11:2:2');
	// Switch to G3 after a 1/2 note more
	rightSynth.setNote('G3', '+12:0:2');

	// Trigger G4 after 23 measures + two 1/4 notes. Hold for a half note.
	rightSynth.triggerAttackRelease('G4', '0:2', '+23:2');
}, '37m').start(); //duration of 74sec

// synth.toMaster();
// synth.triggerAttackRelease('C4', 1)

/*
new Tone.Loop(time => {
	// Trigger one quarter note from now, and hold for one eighth note
	synth.triggerAttackRelease('C4', '8n', '+4n')
}, '1m').start();
*/

// Tone's Transport needs to be started for any loops to become active
Tone.Transport.bpm.value = 120;
Tone.Transport.start();