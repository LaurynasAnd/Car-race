'use strict';

function renderTrack(){
    const DOM = document.querySelector('#screen');
    return DOM.insertAdjacentHTML("beforeend", `<div id="top_grass" class="grass"></div>
                <div id="top_side" class="side"></div>
                <div id="race_track" class="track">
                    <div class="start line"></div>
                    <div class="finish line"></div>
                </div>
                <div id="bot_side" class="side"></div>
                <div id="bot_grass" class="grass">
                    <div class="start-button">start race</div>
            </div>`);
}

export default renderTrack;