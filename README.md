# paper-cranes
## Introduction
An audio experiment of translating animations into musical ideas under the context of nature.
## Background
<p>Evoking the feeling of a broad, open space has been a device used by contemporary classical composers and ambient producers. Inspired by [Landscape Music](http://landscapemusic.org/) , the attempt of interative installations, in which different sections or elements of the music are envisioned as responses to different areas within the moving graphics.</p>
<p>My intention is to create music that draws the listener into the world of digital artworks — music that "gives the listener a new lens" through which to see graphics. Whithin this project, each controlling factor of the scene triggers a change to the music loop—a shift in texture, instrumentation, rhythm, melody, or harmony.</p>
## Method
The goal of this project is to find musical equivalents to color, texture, line, shape, etc., and fit them with each other in a landscape music context.
* <b>Visual Expression</b>:
<p>With this example I started from a flocking bids particle system  [three.js canvas - geometry - birds](https://threejs.org/examples/canvas_geometry_birds.html) , which plays as a role of scene generator. It contains algorithms focused on the calculation of the bird geometry using vector math and the disturbing functions to simulate flocking behavior in real world.</p>
<p>The movement itself has a bunch of options: </p>
1.number of birds, density
2.background color 
3.shape, size, alignment
4.directions, speed, attraction
5.mouse behavior: on hover, on click
</br>-- Movement mode 1 = All fish try to reach the center
</br>-- Movement mode 2 = All fish align along a noise field
</br>-- Movement mode 3 = All fish align along a radial vector field
<p>![Pic2](https://raw.githubusercontent.com/CandylabS/paper-cranes/master/img/flocking.png "geometry-birds")</p>
* <b>Sound Mapping</b>:
<p>mapping strategy</p>
* <b>User Control</b>:
</br>![Pic1](https://raw.githubusercontent.com/CandylabS/paper-cranes/master/img/datGUI1.png "dat-GUI")

## Technology
Javascript, WebGL, WebAudioAPI,  [Three.js](https://threejs.org/) , [Tone.js](https://github.com/Tonejs/Tone.js), [dat.GUI](https://github.com/dataarts/dat.gui)

## Reference
[Music Inspired by Visual Art | NewMusicBox](http://www.newmusicbox.org/articles/music-inspired-by-visual-art/)
</br>[Why Landscape Music is More Important Than Ever | NewMusicBox](http://www.newmusicbox.org/articles/why-landscape-music-is-more-important-than-ever/)
