// ==UserScript==
// @name         JazzGadgets
// @namespace    https://github.com/SirPython/JazzGadgets
// @version      0.1
// @description  Jazz
// @author       SirPython
// @match        *://www.youtube.com/watch?v=*
// @grant        GM_getResourceText
// @resource     actionPanel https://raw.githubusercontent.com/SirPython/JazzGadgets/master/resources/action-panel.html
// ==/UserScript==

const injectActionPanel = () => {
	const button = document.createElement("button");
	button.className = "yt-uix-button yt-uix-button-size-default yt-uix-button-opacity yt-uix-button-has-icon no-icon-markup pause-resume-autoplay action-panel-trigger action-panel-trigger-share   yt-uix-tooltip";
	button.type = "button";
	button.onclick = "; return false;";
	button.title = "JazzGadgets";
	button.dataset.triggerFor = "action-panel-jazzgadgets";
	button.dataset.buttonToggle = true;
	
	const span = document.createElement("span");
	span.className = "yt-uix-button-content";
	span.innerText = "JazzGadgets";
	button.appendChild(span);
	
	const actionPanel = document.createElement("div");
	actionPanel.id = "action-panel-jazzgadgets";
	actionPanel.className = "action-panel-content hid";
	actionPanel.dataset.panelLoaded = true;
	actionPanel.innerHTML = GM_getResourceText("actionPanel");
	
	document.getElementById("watch8-secondary-actions").appendChild(button);
	document.getElementById("watch-action-panels").appendChild(actionPanel);
	
	return actionPanel.children[0];
};

const setLoop = ({times}) => {
	
};

const setSpeed = ({speed}) => {
	
};

const setVolume = ({volume}) => {
	
}

(function() {
    'use strict';
	const form = injectActionPanel();
	
	
})();
