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
const M_PENTA = [0, 2, 2, 3, 2, 3];
// C Major pentatonic: C D E G A 
const m_PENTA = [0, 3, 2, 2, 3, 2];
// A Minor pentatonic: A C D E G
const BLUE = [0, 3, 2, 1, 1, 3, 2];
// Blue Scale: C D# F F# G A#
const CHROME = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
// Chromatic: C C# D D# E F F# G G# A A# B

// input example [0, 'C', 4, 1], the 1st note in C-Major, index <= scale.length
function noteInScale(_scale, _root, _octave, index) {
	var distance = 0;
	var scale = findScale(_scale);
	if (index > scale.length) {
		console.log("error: out of index!");
		return;
	}
	for (var i = 0; i < index; i++) {
		distance += scale[i];
	}
	var root = OCTAVE.indexOf(_root);
	if (root = -1) {
		console.log("error: root not find");
		return;
	}
	var note = root + distance;
	var octave = _octave;
	if (note > 11) {
		note -= 12;
		octave += 1;
	}
	console.log(OCTAVE[note] + octave);
	return OCTAVE[note] + octave;
}

// noteInScale(0, 'E#', 4, 7);

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
			scale = M_PENTA;
			break;
		case 5:
			scale = m_PENTA;
			break;
		case 6:
			scale = BLUE;
			break;
		case 7:
			scale = CHROME;
			break;
		default:
			scale = [];
	};
	return scale;
}