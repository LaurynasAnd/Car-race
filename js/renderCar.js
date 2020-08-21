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
        const DOM = document.querySelector('.track');
        const HTML = `<img src="./img/cars/${this.carNo}.png" alt="" class="${this.carNo} car">`;
        DOM.innerHTML += HTML;
    }
    drive(){
        console.log('driving');
        const random = Math.random();
        if (random < 0.2) {
            this.decelerate(Math.trunc(Math.random()*5+1))
        } else if (random > 0.5){
            this.accelerate(Math.trunc(Math.random()*10+1))
        }
        this.go();
        const DOM = document.querySelector(`.${this.carNo}`);
        console.log(DOM);
        DOM.style.marginLeft = `${this.distance}px`;
    }
    decelerate(x){
        console.log('decelerate: ', x);
        this.speed = (this.speed - x > 0) ? this.speed - x : 0;
    }
    accelerate(x){
        console.log('accelerate: ', x);
        this.speed = (this.speed + x < this.maxSpeed) ? this.speed + x : this.maxSpeed;
    }
    go(){
        this.distance += this.speed;
        // const DOM = document.querySelector(`.${this.carNo}`);
        // console.log(DOM);
        // console.log(this.distance);
        // DOM.style.marginLeft = `${this.distance}`;
    }
}

export default Car;