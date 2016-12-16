// ==UserScript==
// @name         JazzGadget - Loop
// @namespace    https://github.com/SirPython/JazzGadgets/tree/master/loop
// @version      0.2
// @description  Loops a time-segment.
// @author       SirPython
// @match        *://www.youtube.com/watch?v=*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

// IF YOU CHANGE THE TIME, THE CANCEL BUTTON BECOMES STUPID.

const [alert, prompt] = [window.alert, window.prompt];

const welcome = "Welcome to JazzGadget - Loop!\n\n" +
                "To start looping or change the current looping times, enter the starting and ending times below separated by a comma like so: 1:34,3:35.\n\n" +
                "When entering the times, use the format [[h]h:][[m]m:][s]s\n\n\n" +
                "If you wish to cancel the current loop, hit Cancel.\n\n" +
                "If you hit this button by accident, leave the textbox blank and hit OK.";

const makePanelButton = (onclick) => {
    const button = document.createElement("button");
    button.className = "ytp-button";
    button.onclick = onclick;
    button.innerHTML = "JG-Loop";
    return button;
};

/**
 * Parses a HH:MM:SS string, and returns a double of the equivalent amount of seconds.
 */
const timeToSeconds = (hhmmss) => {
    /**
     * Accepted formats:
     *
     * S
     * SS
     * M:SS
     * MM:SS
     * H:MM:SS
     * HH:MM:SS
     */
    const timeFormat = /^((\d?\d)|((\d?\d):(\d\d))|((\d?\d):(\d\d):(\d\d)))$/;
    if(!timeFormat.test(hhmmss)) {
        alert("String is not of the form [[h]h:][[m]m:][s]s\n\nHere are some sample times:\n\n1\n12\n1:23\n12:34\n1:23:45\n12:34:56");
        return null;
    }

    const mat = hhmmss.match(timeFormat);
    const time = { // Depending on which format is used, the minutes and seconds will be at varying points in the matches array.
        hours:   parseInt(mat[7] || 0               , 10),
        minutes: parseInt(mat[8] || mat[4] || 0     , 10),
        seconds: parseInt(mat[9] || mat[5] || mat[0], 10) 
    };
    
    return (
        (time.hours   * 3600) +
        (time.minutes * 60)   +
        (time.seconds)
    );
};

;(function() {
    let video, start, end, interval, resp;
    document.getElementsByClassName("ytp-right-controls")[0].appendChild(makePanelButton(() => {
        
        if((resp = prompt(welcome)) === null) { // hit cancel; wants to cancel loop
            clearInterval(interval);
            return;
        }
        if(resp === "") { // hit OK; accidentally hit button
            return;
        }
        
        resp = resp.split(/[^\d:]/g);
        start = timeToSeconds(resp[0]);
        end = timeToSeconds(resp.pop());
        
        if(start > end) {
            alert("The start time cannot come after the end time.");
        }
        if(start === null) { // entered wrong format
            return;
        }
        
        video = video || document.getElementsByClassName("html5-main-video")[0];
        video.currentTime = start;
        clearInterval(interval);
        interval = setInterval(() => video.currentTime >= end+1 ? video.currentTime = start : null, 1);
        
    }));
})();
