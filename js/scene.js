var SCREEN_WIDTH = window.innerWidth,
	SCREEN_HEIGHT = window.innerHeight,
	SCREEN_WIDTH_HALF = SCREEN_WIDTH / 2,
	SCREEN_HEIGHT_HALF = SCREEN_HEIGHT / 2;

var camera, scene, renderer,
	birds, bird;

var boid, boids;
var bird_num = 200;

var stats;
var gui;
var effectController

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000);
	camera.position.z = 1000;

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
			color: Math.random() * 0xffffff,
			side: THREE.DoubleSide
		}));
		bird.phase = Math.floor(Math.random() * 62.83);
		scene.add(bird);


	}

	renderer = new THREE.CanvasRenderer();
	renderer.setClearColor(0xffffff);
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
		seperation: 20.0,
		alignment: 20.0,
		cohesion: 20.0,
		bird_num: 200
	};


	gui.add(effectController, "seperation", 0.0, 100.0, 1.0).onChange(valuesChanger);
	gui.add(effectController, "alignment", 0.0, 100, 0.001).onChange(valuesChanger);
	gui.add(effectController, "cohesion", 0.0, 100, 0.025).onChange(valuesChanger);
	gui.add(effectController, "bird_num", 10, 250, 1).onChange(valuesChanger);
	gui.close();

	window.addEventListener('resize', onWindowResize, false);
}

function valuesChanger() {

	// velocityUniforms.seperationDistance.value = effectController.seperation;
	// velocityUniforms.alignmentDistance.value = effectController.alignment;
	// velocityUniforms.cohesionDistance.value = effectController.cohesion;
	// velocityUniforms.freedomFactor.value = effectController.freedom;
	bird_num = effectController.bird_num;
	resetBirds();
	// init();

};

function resetBirds() {
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
			color: Math.random() * 0xffffff,
			side: THREE.DoubleSide
		}));
		bird.phase = Math.floor(Math.random() * 62.83);
		scene.add(bird);


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
	render();
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

		color = bird.material.color;
		color.r = color.g = color.b = (500 - bird.position.z) / 1000;

		bird.rotation.y = Math.atan2(-boid.velocity.z, boid.velocity.x);
		bird.rotation.z = Math.asin(boid.velocity.y / boid.velocity.length());

		bird.phase = (bird.phase + (Math.max(0, bird.rotation.z) + 0.1)) % 62.83;
		bird.geometry.vertices[5].y = bird.geometry.vertices[4].y = Math.sin(bird.phase) * 5;
		// flying cycle phase

	}

	renderer.render(scene, camera);

}