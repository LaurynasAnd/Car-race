'use strict';

import Car from './renderCar.js';
const raceCars = [];
const carNames = ["Lightning",
                    "Thunder",
                    "Storm",
                    "Flash",
                    "Wind",
                    "Justice",
                    "Alfa",
                    "Omega"];
for (let i = 0; i < carNames.length; i++) {
    const car = new Car({
        name: carNames[i],
        maxSpeed: 250,
        carNo: `car${i+1}`
    });
    raceCars.push(car);
}
for(const car of raceCars) {
    car.render();
}

const button = document.querySelector('.start-button');
button.addEventListener('click', race);

function race() {
    const button = document.querySelector('.start-button');
    button.classList.add('hidden');
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
                button.removeEventListener('click', race);
                button.addEventListener('click', reset)
                clearInterval(interval);
            }
        }

    },500);
}

function reset(){
    const button = document.querySelector('.start-button');
    for (const car of raceCars){
        car.reset();
    }
    button.innerHTML = 'start race';
    button.removeEventListener('click', reset);
    button.addEventListener('click', race);

}