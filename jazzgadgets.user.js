// ==UserScript==
// @name         Jazz Gadgets
// @version      0.1
// @description  A transcription tool.
// @author       SirPython
// @match        *://www.youtube.com/watch?v=*
// @grant        none
// ==/UserScript==

(function() {
    class Enum {
        constructor(...args) {
            for(const arg of args) {
                this[arg] = Symbol(arg);
            }
        }
    }

    const video = document.getElementsByClassName("html5-main-video")[0];
    let start = 0;
    let rate = 0;

    let paused = false;
    let vol = null;
    let now = null;

    const RecordingState = new Enum("NOT_RECORDING", "RECORDING", "PLAYBACK");
    const recState = RecordingState.NOT_RECORDING;
    const rec = null;
    const audio = null;
    const playbackInt = null;

    document.onkeyup = ({key}) => {
        switch(key) {
            case 'u':
                start = video.currentTime;
                break;

            case 'o':
                video.currentTime = start;
                break;

            case 'n':
                if(!paused) {
                    now = video.currentTime;
                    vol = video.volume;
                    video.volume = 0
                    paused = true
                } else {
                    video.currentTime = now;
                    video.volume = vol;
                    paused = false;
                }
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

            case 'r':
                switch(recState) {
                    case RecordingState.NOT_RECORDING:
                        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
                            rec = new MediaRecorder(stream);
                            const chunks = [];

                            rec.start();
                            rec.addEventListener("dataavailable", e => chunks.push(e.data));
                            rec.addEventListener("stop", _ => {
                                audio = new Audio(
                                    URL.createObjectURL(
                                        new Blob(chunks)
                                    )
                                )
                            });
                        });
                        break;
                    case RecordingState.RECORDING: {
                        rec.stop();

                        const recTime = video.currentTime;
                        video.currentTime = start;

                        const playback = () => {
                            while(video.currentTime < recTime);

                            audio.play()

                            playbackInt = setTimeout(playback, 0);
                        }

                        playbackInt = setTimeout(playback, 0);
                        break;
                    }
                    case RecordingState.PLAYBACK:
                        break;
                }

        }
    }
})();
