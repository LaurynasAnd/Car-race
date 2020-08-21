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
for (let i = 0; i < 8; i++) {
    const car = new Car({
        name: carNames[i],
        maxSpeed: 250,
        carNo: `car${i+1}`
    });
    raceCars.push(car);
}
console.log(raceCars);
for(const car of raceCars) {
    car.render();
}

const button = document.querySelector('.start-button');
button.addEventListener('click', ()=>{
    console.log('click');
    
    const interval = setInterval(()=>{
        for(const car of raceCars){
            car.drive();
        }

        let isFinished = false;
        for(const car of raceCars){
            if(car.distance >= 650){
                isFinished = true;
                clearInterval(interval);
            }
        }

    },500)
        
    console.log(raceCars);
});

