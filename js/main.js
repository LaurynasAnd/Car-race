'use strict';

import Car from './renderCar.js';
const raceCars = [];    //array of all race cars

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

//add event listener for start button
const button = document.querySelector('.start-button');
button.addEventListener('click', race);

//function to start race after start button clicked
function race() {
    const button = document.querySelector('.start-button');
    button.classList.add('hidden');
    const carName = document.querySelectorAll('.car-name');
    for (const name of carName){
        name.classList.add('hidden');
    }
    const interval = setInterval(()=>{
        for(const car of raceCars){
            car.drive();
        }

        let isFinished = false;
        for(const car of raceCars){
            if(car.distance >= 650){
                isFinished = true;
                button.innerHTML = 'reset race';
                button.classList.remove('hidden');
                //now the start button will have new purpose as reset button
                //so event listener to start race is removed
                button.removeEventListener('click', race);
                //instead reset event listener is created
                button.addEventListener('click', reset);
                clearInterval(interval);
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
    setTimeout(()=>{
        button.innerHTML = 'start race';
        //reset event is removed, since it is no longer needed
        button.removeEventListener('click', reset);
        //race event listener is added 
        button.addEventListener('click', race);
        const carName = document.querySelectorAll('.car-name');
        //all car names are shown again
        for (const name of carName){
            name.classList.remove('hidden');
        }
    },300)
}