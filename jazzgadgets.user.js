// ==UserScript==
// @name         Jazz Gadgets.
// @version      0.1
// @description  A transcription tool.
// @author       SirPython
// @match        *://www.youtube.com/watch?v=*
// @grant        none
// ==/UserScript==

/**
 * Instructions:
 *
 * i   --> set landmark in video timeline
 * o   --> jump to landmark
 * 1-9 --> playback speed
 * 0   --> reset playback speed
 *
 * Hold down ctrl when doing the numbers to prevent YT's features.
 */

(function() {
    const video = document.getElementsByClassName("html5-main-video")[0];
    let start = 0;

    document.onkeyup = ({key}) => {
        switch(key) {
            case 'i':
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
