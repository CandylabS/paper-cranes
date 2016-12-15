var SCREEN_WIDTH = window.innerWidth,
	SCREEN_HEIGHT = window.innerHeight,
	SCREEN_WIDTH_HALF = SCREEN_WIDTH / 2,
	SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;

var camera, scene, renderer,
	birds, bird;

var boid, boids;
var bird_num = 70;

var bird_color = 0x000000;
var background = 0xffffff;
var back_colors = [0xffffff, 0xBAA693, 0xFFD9DA, 0x94A47D, 0xC3C3E6, 0x8997B4, 0x3C475D];
var bird_colors = [0xffffff, 0xA3A7B3, 0x000000];

var stats;
var gui;
var effectController;

var simulating = true;
var mTimer = 100;

var mEnv = false;
var mSyn = false;

var mMeasure = 0;
var indexScale = 0;
var mTimer = 160;
var mCycle, mVelocityX, mVelocityY;
var ratio = 0.5;

init();
animate();

function init() {
	camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
	camera.position.z = 1000;
	// vol.volume = (100 - camera.position.z) / 10;
	mTimer = 40;
	mCycle = 0;
	mVelocityX = 0;
	mVelocityY = 0;

	scene = new THREE.Scene();

	birds = [];
	boids = [];

	for (var i = 0; i < bird_num; i++) {

		boid = boids[i] = new Boid();
		boid.position.x = Math.random() * 400 - 200;
		boid.position.y = Math.random() * 400 - 200;
		boid.position.z = Math.random() * 400 - 200;
		boid.velocity.x = Math.random() * 2 - 1;
		boid.velocity.y = Math.random() * 2 - 1;
		boid.velocity.z = Math.random() * 2 - 1;
		boid.setAvoidWalls(true);
		boid.setWorldSize(500, 500, 400);

		bird = birds[i] = new THREE.Mesh(new Bird(), new THREE.MeshBasicMaterial({
			color: bird_color,
			side: THREE.DoubleSide
		}));
		bird.phase = Math.floor(Math.random() * 62.83);
		scene.add(bird);
	}

	renderer = new THREE.CanvasRenderer();
	renderer.setClearColor(background);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

	document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.body.appendChild(renderer.domElement);
	document.addEventListener('mouseup', valuesChanger, false);

	// stats = new Stats();
	// document.getElementById('container').appendChild(stats.dom);

	// gui
	gui = new dat.GUI();

	effectController = {
		chord: 2,
		scale: 0,
		camera: 800,
		bird_num: 70
	};


	gui.add(effectController, "chord", 1, 4, 1).onChange(valuesChanger);
	gui.add(effectController, "scale", 0, 6, 1).onChange(valuesChanger);
	gui.add(effectController, "camera", 100, 1000, 20).onChange(valuesChanger);
	gui.add(effectController, "bird_num", 10, 120, 5).onChange(valuesChanger);
	gui.close();

	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('keydown', checkKeyPressed, false);
}

function valuesChanger() {

	// velocityUniforms.seperationDistance.value = effectController.seperation;
	// velocityUniforms.alignmentDistance.value = effectController.alignment;
	// velocityUniforms.cohesionDistance.value = effectController.cohesion;
	if (effectController.scale != indexScale) {
		indexScale = effectController.scale;
		background = back_colors[indexScale]; //16777215
		renderer.setClearColor(background);
				// set scale
		mScale = findScale(indexScale);
		// console.log("mScle: " + findScale(index));
		mDivision = 360 / (mScale.length);
		mChords = makeChords(mScale, chordNum);
	}
	if (effectController.chord != chordNum) {
		chordNum = effectController.chord;
		mChords = makeChords(mScale, chordNum);
	}
	if (effectController.camera != camera.position.z) {
		camera.position.z = effectController.camera;
		gain = (500 - camera.position.z) / 50;
		piano.volume.value = -8 + gain;
		kick.volume.value = -10 + gain;
		snare.volume.value = -15 + gain;
	}
	if (effectController.bird_num != bird_num) {
		bird_num = effectController.bird_num;
		reset();
	}
	// reset();
	// init();

};

function reset() {
	scene = new THREE.Scene();
	// scene.add(group);
	Tone.Transport.bpm.value = bird_num / 2 + 55;
	// mTimer = 60 * 60 * 4 / Tone.Transport.bpm.value;
	// gain = (500 - camera.position.z) / 50;
	// piano.volume.value = -8 + gain;
	// kick.volume.value = -10 + gain;
	// snare.volume.value = -15 + gain;


	birds = [];
	boids = [];

	for (var i = 0; i < bird_num; i++) {

		boid = boids[i] = new Boid();
		boid.position.x = Math.random() * 400 - 200;
		boid.position.y = Math.random() * 400 - 200;
		boid.position.z = Math.random() * 400 - 200;
		boid.velocity.x = Math.random() * 2 - 1;
		boid.velocity.y = Math.random() * 2 - 1;
		boid.velocity.z = Math.random() * 2 - 1;
		boid.setAvoidWalls(true);
		boid.setWorldSize(500, 500, 400);

		bird = birds[i] = new THREE.Mesh(new Bird(), new THREE.MeshBasicMaterial({
			color: bird_color,
			side: THREE.DoubleSide
		}));
		bird.phase = Math.floor(Math.random() * 62.83);
		scene.add(bird);


	}
}

function checkKeyPressed(e) {
	if (e.keyCode == "32") {
		simulating = !simulating;
		console.log("The space key is pressed.");
		if (simulating) {
			Tone.Transport.start();
		} else {
			Tone.Transport.stop();
			mMeasure = 0;
		}
	}
	// all test keys
	if (e.keyCode == "69") { // e
		mEnv = !mEnv;
		if (mEnv) {
			env.triggerAttack();
		} else {
			env.triggerRelease();
		}

	}

	if (e.keyCode == "83") { // s
		mSyn = !mSyn;
		if (mSyn) {
			synth.triggerAttack(400);
		} else {
			synth.triggerRelease();
		}

	}
	if (e.keyCode == "49") {
		// console.log("chordNum");
		chordNum = 1;
		mChords = makeChords(mScale, chordNum);
		// console.log("The space key is pressed.");
	}
	if (e.keyCode == "50") {
		chordNum = 2;
		mChords = makeChords(mScale, chordNum);
		// console.log("The space key is pressed.");
	}
	if (e.keyCode == "51") {
		chordNum = 3;
		mChords = makeChords(mScale, chordNum);
		// console.log("The space key is pressed.");
	}
	if (e.keyCode == "52") {
		chordNum = 4;
		mChords = makeChords(mScale, chordNum);
		// console.log("The space key is pressed.");
	}
	if (e.keyCode == "13") {
		var root = Math.round(Math.random() * 6);
		var index = Math.round(Math.random() * 20);
		playChord(root, index); // index do not repeat!
		// console.log("The space key is pressed.");
	}
	if (e.keyCode == "65") {
		//set background color
		var index = Math.round(Math.random() * 6);
		background = back_colors[index]; //16777215
		renderer.setClearColor(background);
		console.log("background: " + background);
		// set scale
		mScale = findScale(index);
		console.log("mScle: " + findScale(index));
		mDivision = 360 / (mScale.length);
		mChords = makeChords(mScale, chordNum);
		// noteInScale(mScale, 'E', 4, 2);
	}
	if (e.keyCode == "66") {
		var index = Math.round(Math.random() * 2);
		bird_color = bird_colors[index]; //16777215
		console.log("bird: " + index);
	}
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}

function onDocumentMouseMove(event) {

	var vector = new THREE.Vector3(event.clientX - SCREEN_WIDTH_HALF, -event.clientY + SCREEN_HEIGHT_HALF, 0);

	// move mouse to disturb birds
	for (var i = 0, il = boids.length; i < il; i++) {

		boid = boids[i];

		vector.z = boid.position.z;

		boid.repulse(vector);

	}

}

//

function animate() {

	requestAnimationFrame(animate);

	// stats.begin();
	if (simulating) {
		render();
	}
	// stats.end();

}

function render() {

	for (var i = 0, il = birds.length; i < il; i++) {
		// boid calculate position of bird
		boid = boids[i];
		boid.run(boids);
		// bird show on the screen
		bird = birds[i];
		bird.position.copy(boids[i].position);

		color = bird_color;
		// color.alpha = 0.1;

		color.r = color.g = color.b = (500 - bird.position.z) / 1000;

		bird.rotation.y = Math.atan2(-boid.velocity.z, boid.velocity.x);
		bird.rotation.z = Math.asin(boid.velocity.y / boid.velocity.length());

		// test
		// bird 1
		boid.cycle = Math.max(0, bird.rotation.z);
		mCycle += boid.cycle;
		mVelocityY += boid.velocity.y;
		mVelocityX += boid.velocity.x;

		bird.phase = (bird.phase + (Math.max(0, bird.rotation.z) + 0.1)) % 62.83;
		bird.geometry.vertices[5].y = bird.geometry.vertices[4].y = Math.sin(bird.phase) * 5;
		// flying cycle phase

	}
	mTimer--;
	if (mTimer < 0) {
		mMeasure++;
		// arc tangent, -180 to 180 mScale.length
		// var note = Math.floor(((Math.atan2(boid.velocity.y, boid.velocity.x) * 180 / Math.PI) + 180) / mDivision);
		// console.log("output: " + note);
		if (mCycle > (ratio * bird_num)) {
			var note = Math.floor(((Math.atan2(mVelocityY, mVelocityX) * 180 / Math.PI) + 180) / mDivision);
			console.log("hit!" + note);
			console.log("measure: " + mMeasure);
			playChord(note, mMeasure);
			// if (mPreNote != note) {
			// pattern.start();
			// synth.triggerAttack(noteInScale(mScale, 'C', 4, note));
			// mPreNote = note;
			// }
		} else {
			console.log("miss!");
			//mute the output
			// vol.mute = true;
		}
		mTimer = 60 * 60 * 4 / Tone.Transport.bpm.value;
		mCycle = 0;
		mVelocityX = 0;
		mVelocityY = 0;
	}

	renderer.render(scene, camera);

}