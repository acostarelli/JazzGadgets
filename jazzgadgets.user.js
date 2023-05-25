// ==UserScript==
// @name         Jazz Gadgets
// @version      0.1
// @description  A transcription tool.
// @author       SirPython
// @match        *://www.youtube.com/watch?v=*
// @grant        none
// ==/UserScript==

(function() {
    const video = document.getElementsByClassName("html5-main-video")[0];
    let start = 0;
    const comments = [];
    let now = 0;
    let choice = 0;

    document.onkeyup = (e) => {
        if(e.ctrlKey) {
            return;
        }
        const key = e.key;
        switch(key) {
            case 'u':
                start = video.currentTime;
                break;

            case 'o':
                video.currentTime = start;
                break;
            case '0':
                video.playbackRate = 1;
                break;

            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                video.playbackRate = (+key) / 10;
                break;
        }
    }
})();
