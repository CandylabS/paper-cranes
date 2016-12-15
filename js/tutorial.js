// ***************** Tone.MetalSynth, Tone.MembraneSynth
// var bell = new Tone.MetalSynth({
// 	"harmonicity": 12,
// 	"resonance": 800,
// 	"modulationIndex": 20,
// 	"envelope": {
// 		"decay": 0.4,
// 	},
// 	"volume": -15
// }).toMaster();
// var bellPart = new Tone.Sequence(function(time, freq) {
// 	bell.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
// 	bell.triggerAttack(time);
// }, [300, null, 200, null, 200, 200, null, 200, null, 200, null, 200], "8t").start(0);
// // bellPart.loop = true;
// // bellPart.loopEnd = "1m";
// var conga = new Tone.MembraneSynth({
// 	"pitchDecay": 0.008,
// 	"octaves": 2,
// 	"envelope": {
// 		"attack": 0.0006,
// 		"decay": 0.5,
// 		"sustain": 0
// 	}
// }).toMaster();
// var congaPart = new Tone.Sequence(function(time, pitch) {
// 	conga.triggerAttack(pitch, time, Math.random() * 0.5 + 0.5);
// }, ["G3", "C4", "C4", "C4"], "4n").start(0);
// congaPart.loop = true;
// congaPart.loopEnd = "1m";
Tone.Transport.bpm.value = 180;

Tone.Transport.start();


//***************** pure Synth
var synth = new Tone.Synth().toMaster()
	.set("envelope.attack", 0.04);

//send audio to each of the effect channels
var chorusSend = synth.send("chorus", -Infinity);
var chebySend = synth.send("cheby", -Infinity);
var autowahSend = synth.send("autowah", -Infinity);
var reverbSend = synth.send("reverb", -Infinity);

//make some effects
var chorus = new Tone.Chorus()
	.receive("chorus")
	.toMaster();

var cheby = new Tone.Chebyshev(50)
	.receive("cheby")
	.toMaster();

var reverb = new Tone.Freeverb(0.9, 4000)
	.receive("reverb")
	.toMaster();

// **************** pantterns
var pattern = new Tone.Pattern(function(time, note){
    synth.triggerAttackRelease(note);
}, ["C4", "D4", "E4", "F4", "G4", "A4", "B4"], "randomWalk");
pattern.start(0);

// ****************** envelope
var env = new Tone.AmplitudeEnvelope({
	"attack": 0.11,
	"decay": 0.21,
	"sustain": 0.09,
	"release": 1.2
}).toMaster();

//create an oscillator and connect it to the envelope
var osc = new Tone.Oscillator({
	"partials": [3, 2, 1],
	"type": "custom",
	"frequency": "C#4",
	"volume": -8,
}).connect(env).start();