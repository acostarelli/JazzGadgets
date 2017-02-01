// ==UserScript==
// @name         JazzGadgets - Volume
// @namespace    https://github.com/SirPython/JazzGadgets/tree/master/volume
// @version      0.1
// @description  Changes the playback volume.
// @author       SirPython
// @match        *://www.youtube.com/watch?v=*
// @grant        none
// ==/UserScript==

const makePanelButton = (onclick) => {
    const button = document.createElement("button");
    button.className = "ytp-button";
    button.onclick = onclick;
    button.innerHTML = "JazzGadget\Volume";
    return button;
};

(function() {
    'use strict';

    let ctx = new AudioContext(), gain = ctx.createGain(), src, vol;
    document.getElementsByClassName("ytp-right-controls")[0].appendChild(makePanelButton(() => {
        
        vol = parseInt(prompt("Enter the playback volume you want.", `${vol*100}%`), 10) / 100;
        
        if(!confirm(`Are you sure you want to change the volume to ${vol*100}%? Extreme volumes can damage both your ears and sound equipment.`)) {
            return;
        }
        
        if(!src) {
            src = ctx.createMediaElementSource(document.getElementsByClassName("html5-main-video")[0]);
            src.connect(gain);
            gain.connect(ctx.destination);
        }
        
        gain.gain.value = vol;
        
    }));
})();
