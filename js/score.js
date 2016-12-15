var gain = -10;
/*
				 KICK
				 */
var kick = new Tone.MembraneSynth({
	"volume": -16,
	"envelope": {
		"sustain": 0,
		"attack": 0.02,
		"decay": 0.8
	},
	"octaves": 10
}).toMaster()

var kickPart = new Tone.Loop(function(time) {
	kick.triggerAttackRelease("C2", "8n", time);
}, "2n").start(0);


/*
 SNARE
 */
var snare = new Tone.NoiseSynth({
	"volume": -21,
	"envelope": {
		"attack": 0.001,
		"decay": 0.2,
		"sustain": 0
	},
	"filterEnvelope": {
		"attack": 0.001,
		"decay": 0.1,
		"sustain": 0
	}
}).toMaster()

var snarePart = new Tone.Loop(function(time) {
	snare.triggerAttack(time);
}, "2n").start("4n");


/**
 *  PIANO
 */
var piano = new Tone.PolySynth(4, Tone.Synth, {
	"volume": -14,
	"oscillator": {
		"partials": [1, 2, 1],
	},
	"portamento": 0.05
}).toMaster()
// toMaster()

// var chords = [];

// var cChord = [noteInScale(MAJOR, 'C', 4, 1), noteInScale(MAJOR, 'C', 4, 3), noteInScale(MAJOR, 'C', 4, 5), noteInScale(MAJOR, 'C', 4, 7)];
// chords.push(cChord);
// var dChord = ["D4", "F4", "A4", "C5"];
// chords.push(dChord);
// var gChord = ["B3", "D4", "E4", "A4"];
// chords.push(gChord);
function playChord(root, index) {
	console.log("playChord");
	var pianoPart = new Tone.Part(function(time, chord) {
		piano.triggerAttackRelease(chord, "8n", time);
	}, [
		["0:0:2", mChords[1+root]],
		["0:1", mChords[1+root]],
		["0:1:3", mChords[2+root]],
		["0:2:2", mChords[1+root]],
		["0:3", mChords[1+root]],
		["0:3:2", mChords[3+root]]
	]).start(index+"m");

	// pianoPart.loop = false;
	// pianoPart.loopEnd = "1m";
	pianoPart.humanize = true;
}



/*
 BASS
 */
var bass = new Tone.MonoSynth({
	"volume": -10,
	"envelope": {
		"attack": 0.1,
		"decay": 0.3,
		"release": 2,
	},
	"filterEnvelope": {
		"attack": 0.001,
		"decay": 0.01,
		"sustain": 0.5,
		"baseFrequency": 200,
		"octaves": 2.6
	}
}).toMaster();

// var bassPart = new Tone.Sequence(function(time, note) {
// 	bass.triggerAttackRelease(note, "16n", time);
// }, ["C2", ["C3", ["C3", "D2"]], "E2", ["D2", "A1"]]).start(0);

// bassPart.probability = 1.0;

// instrument.chain(vol, Tone.Master);
//set the transport 
Tone.Transport.bpm.value = 90;
Tone.Transport.start();