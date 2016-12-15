const OCTAVE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
// var scales = [];
// Scales based on key of “C”
const MAJOR = [0, 2, 2, 1, 2, 2, 2, 1];
// C Major : C D E F G A B
const m_NATURAL = [0, 2, 1, 2, 2, 1, 2, 2];
// A Minor Natural: A B C D E F G
const m_HARMONIC = [0, 2, 1, 2, 2, 1, 3, 1];
// A Minor Harmonic :  A B C D E F G# 
const m_MELODIC = [0, 2, 1, 2, 2, 2, 2, 1];
// A Minor Melodic: A B C D E F# G# 
const LYDIAN = [0, 2, 2, 2, 1, 2, 2, 1];
// C Major pentatonic: C D E F# G A B
const LOCRIAN = [0, 1, 2, 2, 1, 2, 2, 2];
// A Minor pentatonic: C C# D# F F# G# A#
const BLUE = [0, 3, 2, 1, 1, 3, 2];
// Blue Scale: C D# F F# G A#
// const CHROME = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
// Chromatic: C C# D D# E F F# G G# A A# B

// const F_MAJOR = ['F', 'G', 'A', 'A#', 'C', 'D', 'E'];
// const D_MINOR = ['D', 'E', 'F', 'G', 'A', 'A#', 'C'];

// const C_MAJOR = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
// const A_MINOR = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

// const G_MAJOR = ['G', 'A', 'B', 'C', 'D', 'E', 'F#'];
// const E_MINOR = ['E', 'F#', 'G', 'A', 'B', 'C', 'D'];

// const D_MAJOR = ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'];
// const B_MINOR = ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'];

var mScale = MAJOR;
var mDivision = 360 / (mScale.length);
var mPreNote;
// input example [BLUE, 'C', 4, 1], the 1st note in C-Major, index <= scale.length
function noteInScale(scale, _root, _octave, index) {
	var distance = 0;
	var octave = _octave;
	if (index >= scale.length) {
		index -= (scale.length - 1);
		distance += 12;
	}
	if (index > 0)
		for (var i = 0; i < index; i++) {
			distance += scale[i];
		}
	var root = OCTAVE.indexOf(_root);
	if (root == -1) {
		console.log("error: root not find");
		return;
	}
	var note = root + distance;
	if (note > 11) {
		note -= 12;
		octave += 1;
	}
	// console.log(OCTAVE[note] + octave);
	return OCTAVE[note] + octave;
}

// noteInScale(0, 'E#', 4, 7);
var mChords = makeChords(mScale, chordNum);
var chordNum = 1;

function makeChords(scale, num) {
	var chords = [];
	for (var j = 3; j < 5; j++) {
		for (var i = 1; i < scale.length; i++) {
			var chord;
			if (num == 1)
				chord = [noteInScale(scale, 'C', j, i + 4)];
			else if (num == 2)
				chord = [noteInScale(scale, 'C', j, i + 4), noteInScale(scale, 'C', j, i + 2)];
			else if (num == 3)
				chord = [noteInScale(scale, 'C', j, i), noteInScale(scale, 'C', j, i + 2), noteInScale(scale, 'C', j, i + 4)];
			else 
				chord = [noteInScale(scale, 'C', j, i), noteInScale(scale, 'C', j, i + 2), noteInScale(scale, 'C', j, i + 4), noteInScale(scale, 'C', j, i + 6)];
			chords.push(chord);
		}
	}
	// var cChord = [noteInScale(MAJOR, 'C', 4, 1), noteInScale(MAJOR, 'C', 4, 3), noteInScale(MAJOR, 'C', 4, 5), noteInScale(MAJOR, 'C', 4, 7)];
	// chords.push(cChord);
	// var dChord = ["D4", "F4", "A4", "C5"];
	// chords.push(dChord);
	// var gChord = ["B3", "D4", "E4", "A4"];
	// chords.push(gChord);
	return chords;
}

function findScale(_scale) {
	var scale;
	switch (_scale) {
		case 0:
			scale = MAJOR;
			break;
		case 1:
			scale = m_NATURAL;
			break;
		case 2:
			scale = m_HARMONIC;
			break;
		case 3:
			scale = m_MELODIC;
			break;
		case 4:
			scale = LYDIAN;
			break;
		case 5:
			scale = LOCRIAN;
			break;
		case 6:
			scale = BLUE;
			break;
		default:
			scale = [];
	};
	return scale;
}