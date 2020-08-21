'use strict';

class Car{
    constructor(data){
        this.name= data.name;
        this.maxSpeed = data.maxSpeed;
        this.speed = 0;
        this.distance = 0;
        this.carNo = data.carNo;
    }
    render(){
        console.log('rendering');
        const DOM = document.querySelector('.track');
        const HTML = `<img src="./img/cars/${this.carNo}.png" alt="" class="${this.carNo} car">`;
        DOM.innerHTML += HTML;
    }
    drive(){
        const random = Math.random();
        if (random < 0.2) {
            
        }
    }
}

export default Car;