// ==UserScript==
// @name         Jazz Gadget - Speed
// @namespace    https://github.com/SirPython/JazzGadgets/tree/master/speed
// @version      0.1
// @description  Changes the playback speed.
// @author       SirPython
// @match        *://www.youtube.com/watch?v=*
// @grant        none
// ==/UserScript==

const makePanelButton = (onclick) => {
    const button = document.createElement("button");
    button.className = "ytp-button";
    button.onclick = onclick;
    button.innerHTML = "JazzGadget\Speed";
    return button;
};

(function() {
    'use strict';

	let video, rate;
    document.getElementsByClassName("ytp-right-controls")[0].appendChild(makePanelButton(() => {
		
		rate = parseInt(prompt("Enter the playback speed you want.\n\nNote that for anything below 50%, the audio will cut.", "100%"), 10) / 100;
		video = video || document.getElementsByClassName("html5-main-video")[0];
		video.playbackRate = rate;
		
	}));
})();
