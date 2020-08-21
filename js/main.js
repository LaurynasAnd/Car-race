'use strict';

import Car from './renderCar.js';
console.log('Hello');
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
    console.log('trying to render');
    car.render();
}