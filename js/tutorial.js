var bell = new Tone.MetalSynth({
	"harmonicity": 12,
	"resonance": 800,
	"modulationIndex": 20,
	"envelope": {
		"decay": 0.4,
	},
	"volume": -15
}).toMaster();
var bellPart = new Tone.Sequence(function(time, freq) {
	bell.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
	bell.triggerAttack(time);
}, [300, null, 200, null, 200, 200, null, 200, null, 200, null, 200], "8t").start(0);
// bellPart.loop = true;
// bellPart.loopEnd = "1m";
var conga = new Tone.MembraneSynth({
	"pitchDecay": 0.008,
	"octaves": 2,
	"envelope": {
		"attack": 0.0006,
		"decay": 0.5,
		"sustain": 0
	}
}).toMaster();
var congaPart = new Tone.Sequence(function(time, pitch) {
	conga.triggerAttack(pitch, time, Math.random() * 0.5 + 0.5);
}, ["G3", "C4", "C4", "C4"], "4n").start(0);
// congaPart.loop = true;
// congaPart.loopEnd = "1m";
Tone.Transport.bpm.value = 115;