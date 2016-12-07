var gui = new dat.GUI();


var effectController = {
	seperation: 20.0,
	alignment: 20.0,
	cohesion: 20.0,
	bird_num: 200
};

var valuesChanger = function() {

	// velocityUniforms.seperationDistance.value = effectController.seperation;
	// velocityUniforms.alignmentDistance.value = effectController.alignment;
	// velocityUniforms.cohesionDistance.value = effectController.cohesion;
	// velocityUniforms.freedomFactor.value = effectController.freedom;
	bird_num = effectController.bird_num;

};

valuesChanger();


gui.add(effectController, "seperation", 0.0, 100.0, 1.0).onChange(valuesChanger);
gui.add(effectController, "alignment", 0.0, 100, 0.001).onChange(valuesChanger);
gui.add(effectController, "cohesion", 0.0, 100, 0.025).onChange(valuesChanger);
gui.add(effectController, "bird_num", 10, 250, 1).onChange(valuesChanger);
gui.close();

// from shader..
percent = distSquared / zoneRadiusSquared;

if (percent < separationThresh) { // low

	// Separation - Move apart for comfort
	f = (separationThresh / percent - 1.0) * delta;
	velocity -= normalize(dir) * f;

} else if (percent < alignmentThresh) { // high

	// Alignment - fly the same direction
	float threshDelta = alignmentThresh - separationThresh;
	float adjustedPercent = (percent - separationThresh) / threshDelta;

	birdVelocity = texture2D(textureVelocity, ref).xyz;

	f = (0.5 - cos(adjustedPercent * PI_2) * 0.5 + 0.5) * delta;
	velocity += normalize(birdVelocity) * f;

} else {

	// Attraction / Cohesion - move closer
	float threshDelta = 1.0 - alignmentThresh;
	float adjustedPercent = (percent - alignmentThresh) / threshDelta;

	f = (0.5 - (cos(adjustedPercent * PI_2) * -0.5 + 0.5)) * delta;

	velocity += normalize(dir) * f;

}
