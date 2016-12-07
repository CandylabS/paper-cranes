# paper-cranes
## Introduction
</br>Evoking the feeling of a broad, open space has been a device used by contemporary classical composers and ambient producers. ["Landscape Music"](http://landscapemusic.org/) often appears at interative installations to express aesthetic responses to nature. In these works, different sections or elements of the music are envisioned as responses to different areas within visual artworks built upon original photographs and videos.
<p>My intention is to create music that draws the listener into the world of digital artworks — music that "gives the listener a new lens" through which to see graphics that simulate nature. In this project, each controlling factor of the scene triggers a change to the music loop—a shift in texture, instrumentation, rhythm, melody, or harmony.</p>
## Method
The goal of this project is to find musical equivalents to color, texture, line, shape, etc., and fit them with each other in a landscape music context.
* <b>Visual Expression</b>:
<p>With this example I started from a flocking birds particle system  [three.js canvas - geometry - birds](https://threejs.org/examples/canvas_geometry_birds.html) , which plays as a role of scene generator. It contains algorithms focused on the calculation of the bird geometry using vector math and the disturbing functions to simulate flocking behavior in real world.</p>
<p>![Pic2](https://raw.githubusercontent.com/CandylabS/paper-cranes/master/img/flocking.png "geometry-birds")</p>
<p>A <b>BIRD</b> (geometry) or <b>BOID</b> (dynamics) instance is defined by several core features or factors, such as <code>color (rgb, hsb)</code>, <code>size</code> (how far away from camera), <code>phase</code> (waveform function of left and right bird wings), as well as <code>xy position</code> and <code>z depth</code>. “Position” vector has often been mapped to frequency in other interactive music works, but in this case I would like to try "velocity" direction as an indicator for notes. The reason is that bird position itself is too continuous to generate meaningful music, but will serve as a spatial cue to indicate where the sound comes from. The chain reaction is <code>position & rotaion <- velocity <- acceleration</code>, on each frame one updates depending on another. Direct control of acceleration can indirectly moves position to somewhere else. In flocking simulation, acceleration can be directly change in at least five ways: </p>
<ul>
<li>Movement controller 1 = <b>Separation</b> - move apart for comfort</li>
<li>Movement controller 2 = <b>Attraction</b> or <b>Cohesion</b> - move closer</li>
<li>Movement controller 3 = <b>Alignment</b> - fly towards the same direction</li>
<li>Movement controller 4 = <b>Repulsive force</b>  - using mousemove event to disturb birds away from event.center</li>
<li>Movement controller 5 = <b>Steering force</b> - set the goal or destination for birds’ flocking behavior</li>
</ul>
<p>These five factors also have interior interactions between some of each other.</p>
* <b>Sound Mapping</b>:
<p>Birds are generated randomly, but will be grouped together within neighborhoodRadius. If this realm is large enough, then all birds will form a single group - monophonic. Otherwise, they will move in several chunks - polyphonic. Each chunk serves as an audio source, generate by Tone.synth. Velocity.xy is mapped to the nearest note of scale, with all 360 degree divided into different regions of a scale, including 2octaves. Velocity vetor also affects phase by updating rotation vector.</p>
<p><b>Triggering</b> of sound is the result of wing phase. If phase didn’t change quicker than threshold rate, than birds will mute. While phase is a function of bird rotation.</p>
<p>All birds move in a bounding box predefined in width(500) x height(500) and depth(200). That means by changing position of camera, we can see birds from different positions and distance. Bird's position is mapped to spatial audio factor, which is represent in Tone.Panner3D. Bounding box depth is related to reverb, to create a sense of depth.</p>
<p>Bird color is mapped to <b>timbre</b>, which is generated by Tone.Instrument synthesizer (such as PluckSynth, MembraneSynth, MetalSynth etc).</p>
<p>Background color gradient represent for different scales. 5 hue values represent for 8 scales: Major/Minor, Hamonic(Major/Minor), Pentatonic(Major/Minor), Whole Tone and Blue scale. Saturation represent for "key"s C, D, F, G or A, etc. An average brightness of above 0.5 in Major, and brightness of below 0.5 in Minor.</p>
* <b>User Control</b>:
<p>User control panel will be developed using dat.GUI library.</p>
![Pic1](https://raw.githubusercontent.com/CandylabS/paper-cranes/master/img/datGUI1.png "dat-GUI")
<ul>
<li>Color [Hue, Saturation, Brightness]
    <ul>
    <li>background gradient</li>
    <li>bird color</li>
    </ul>
</li>
<li>Camera position \& Bounding box depth</li>
<li>Neighborhood radius</li>
<li>Movement Controllers
    <ul>
    <li>separation</li> 
    <li>attraction</li>
    <li>alignment</li>
    <li>disturbance</li>
    <li>steering</li>
    </ul>
</li>
</ul>
<p>Passive variables such as bird size / position / velocity and their musical equivalents will automatically change depending on the input and algorithm.</p>

## Technology
Javascript, WebGL, WebAudioAPI,  [Three.js](https://threejs.org/) , [Tone.js](https://github.com/Tonejs/Tone.js), [dat.GUI](https://github.com/dataarts/dat.gui)

## Reference
[Music Inspired by Visual Art | NewMusicBox](http://www.newmusicbox.org/articles/music-inspired-by-visual-art/)
</br>[Why Landscape Music is More Important Than Ever | NewMusicBox](http://www.newmusicbox.org/articles/why-landscape-music-is-more-important-than-ever/)
