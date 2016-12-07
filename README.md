# paper-cranes
## Introduction
An audio experiment of translating animations into musical ideas under the context of nature.
## Background
</br>Evoking the feeling of a broad, open space has been a device used by contemporary classical composers and ambient producers. ["Landscape Music"](http://landscapemusic.org/) often appears at interative installations to express aesthetic responses to nature. In these works, different sections or elements of the music are envisioned as responses to different areas within visual artworks built upon original photographs and videos.
<p>My intention is to create music that draws the listener into the world of digital artworks — music that "gives the listener a new lens" through which to see graphics that simulate nature. In this project, each controlling factor of the scene triggers a change to the music loop—a shift in texture, instrumentation, rhythm, melody, or harmony.</p>
## Method
The goal of this project is to find musical equivalents to color, texture, line, shape, etc., and fit them with each other in a landscape music context.
* <b>Visual Expression</b>:
<p>With this example I started from a flocking birds particle system  [three.js canvas - geometry - birds](https://threejs.org/examples/canvas_geometry_birds.html) , which plays as a role of scene generator. It contains algorithms focused on the calculation of the bird geometry using vector math and the disturbing functions to simulate flocking behavior in real world.</p>
<p>![Pic2](https://raw.githubusercontent.com/CandylabS/paper-cranes/master/img/flocking.png "geometry-birds")</p>
<p>A <b>BIRD</b> (geometry) or <b>BOID</b> (dynamics) instance is defined by several core features or factors, such as <code>color (rgb, hsb)</code>, <code>size</code> (how far away from camera), <code>phase</code> (waveform function of left and right bird wings), as well as <code>xy position</code> and <code>z depth</code>.
While “position” vector gives huge space for generating music changing in a “continuous” way. The chain reaction is <code>position <- velocity <- acceleration</code>, on each frame one updates depending on another. Direct control of acceleration can indirectly moves position to somewhere else. In flocking simulation, acceleration can be directly change in at least five ways: </p>
<ul>
<li>Movement controller 1 = <b>Separation</b> - move apart for comfort</li>
<li>Movement controller 2 = <b>Attraction</b> or <b>Cohesion</b> - move closer</li>
<li>Movement controller 3 = <b>Alignment</b> - fly towards the same direction</li>
<li>Movement controller 4 = <b>Repulsive force</b>  - using mousemove event to disturb birds away from event.center</li>
<li>Movement controller 5 = <b>Steering force</b> - set the goal or destination for birds’ flocking behavior</li>
</ul>
<p>These five factors also have interior interactions between some of each other.</p>
* <b>Sound Mapping</b>:
<p>mapping strategy</p>
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
<li>Camera position</li>
<li>Bounding box depth</li>
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
