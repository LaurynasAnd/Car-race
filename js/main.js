'use strict';

import Car from './renderCar.js';
import renderTrack from './renderTrack.js';
// import racing from './racing.js';


const beginButton = document.querySelector('.begin-button');
beginButton.addEventListener('click', beginRace);

const raceCars = [];    //array of all race cars
let carsDOM = null;   //array of DOMs of all cars. Will be defined after cars are rendered

function beginRace(){
    renderTrack();
    
    const carNames = ["Lightning",
                        "Thunder",
                        "Storm",
                        "Flash",
                        "Wind",
                        "Justice",
                        "Alfa",
                        "Omega"];
    //fill caceCars array with Car objects
    for (let i = 0; i < carNames.length; i++) {
        const car = new Car({
            name: carNames[i],
            maxSpeed: 250,
            carNo: `car${i+1}`
        });
        raceCars.push(car);
    }
    
    //render all race cars
    for(const car of raceCars) {
        car.render();
    }
    //cars are rendered, now carsDOM can be assigned a value
    carsDOM = document.querySelectorAll('.car');
    
    //add event listener for start button
    const button = document.querySelector('.start-button');
    button.addEventListener('click', intro);

    //after 100ms welcome window starts fadeout
    setTimeout(()=>{
        const welcome = document.querySelector('.welcome');
        welcome.classList.add('disappear');
    },100);

    //when window has faded, welcome screen is removed
    setTimeout(() => {
        const welcome = document.querySelector('.welcome');
        welcome.remove();
    }, 1100);
}

//function before race
//this function will handle event before race, i.e. will start the race in a normal way
function intro(){
    const mainDOM = document.querySelector('#screen');
    mainDOM.insertAdjacentHTML('beforeend', `<div class="intro">
                                                <div class="text fadeout">racers...</div>
                                            </div>`);
    const textDOM = document.querySelector('.intro .text');
    const intro = document.querySelector('.intro');
    let lights = null;
    setTimeout(() => {
        textDOM.remove();
        intro.innerHTML='<div class="text fadeout">start...</div>'
    }, 500);
    setTimeout(() => {
        textDOM.remove();
        intro.innerHTML='<div class="text fadeout">your...</div>'
    }, 1000);
    setTimeout(() => {
        textDOM.remove();
        intro.innerHTML='<div class="text fadeout">engines...</div>'
    }, 1500);
    //start lights are created
    setTimeout(() => {
        for (const car of carsDOM){
            car.classList.add('engine-on');
        }
        intro.innerHTML = `<div class="lights">
                                <div class="light"></div>
                                <div class="light"></div>
                                <div class="light"></div>
                                <div class="light"></div>
                                <div class="light"></div>
                                <div class="light"></div>
                            </div>`
        
        
    }, 2000);
    //start lights start countdown to start
    setTimeout(() => {
        lights = document.querySelectorAll('.light');
        lights[0].classList.add('active');
        lights[1].classList.add('active');
    }, 3000);
    setTimeout(() => {
        lights[2].classList.add('active');
        lights[3].classList.add('active');
    }, 3500);
    setTimeout(() => {
        lights[4].classList.add('active');
        lights[5].classList.add('active');
    }, 4000);
    //all lights become green marking the start of the race
    setTimeout(() => {
        for(const light of lights){
            light.classList.remove('active');
            light.classList.add('green');
        }
    }, 4500);
    //intro  is removed and race begins
    setTimeout(() => {
        intro.remove();
        race();
    }, 5000);
}



//function to start race after start button clicked
function race() {
    //hide start button
    const button = document.querySelector('.start-button');
    button.classList.add('hidden');
    const carName = document.querySelectorAll('.car-name');
    for (const name of carName){
        name.classList.add('hidden');
    }
    //each car drives
    const interval = setInterval(()=>{
        for(const car of raceCars){
            car.drive();
        }

        //sort racer list
        for (let i = 0; i < raceCars.length-1; i++) {
            for (let j = i+1; j < raceCars.length; j++) {
                if(raceCars[i].distance < raceCars[j].distance){
                    const temp = raceCars[i];
                    raceCars[i] = raceCars[j];
                    raceCars[j] = temp;
                }
            }
        }

        //check if any car finish race
        const finish = document.querySelector('.finish').offsetX;
        console.log(finish);
        
        let isFinished = false;
        for(const car of raceCars){
            if(car.distance >= 650){
                isFinished = true;
                clearInterval(interval);
                //det timeout is used because earier following code was executed too soon
                setTimeout(() => {
                    button.innerHTML = 'reset race';
                    button.classList.remove('hidden');
                    //now the start button will have new purpose as reset button
                    //so event listener to start race is removed
                    button.removeEventListener('click', intro);
                    //instead reset event listener is created
                    button.addEventListener('click', reset);
                    for (const car of carsDOM){
                        car.classList.remove('engine-on');
                    }
                    printWinner();
                    
                }, 350);
            }
        }

    },500);
}

//function to reset all cars
function reset(){
    const button = document.querySelector('.start-button');
    for (const car of raceCars){
        car.reset();
    }
    removeWinner();
    setTimeout(()=>{
        button.innerHTML = 'start race';
        //reset event is removed, since it is no longer needed
        button.removeEventListener('click', reset);
        //race event listener is added 
        button.addEventListener('click', intro);
        const carName = document.querySelectorAll('.car-name');
        //all car names are shown again
        for (const name of carName){
            name.classList.remove('hidden');
        }
    },300)
}

//function to print winner
function printWinner(){
    const DOM = document.querySelector('.track');
    DOM.insertAdjacentHTML('beforeend', `<div class="winner"><div class="text">Winner:</div><div class="name text">${raceCars[0].name}</div></div>`)
}

function removeWinner(){
    const DOM = document.querySelector('.winner');
    DOM.remove();
}