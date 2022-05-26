'use strict';
import * as sound from './sound.js';

export default class Ground {
    constructor() {
        this.ground = document.querySelector('.ground');
        this.move = null;
        this.ground.addEventListener('click', this.onClicked)
    }

    setClickListener(Itemscliked) {
        this.ItemsClicked = Itemscliked;
    }

    onClicked = (event) => {
        if (event.target.dataset.id === 'carrot') {
            sound.playCarrot();
            let result = this.ItemsClicked('carrot');
            result && event.target.remove();
        } else if (event.target.dataset.id === 'bug') {
            sound.playBug();
            let result = this.ItemsClicked('bug');
            result && event.target.remove();
            
        }
    }

    createObstacle(carrotCnt, bugCnt, carrotPath, bugPath) {
        this.ground.innerHTML = "";
        for (let i = 0; i < carrotCnt; i++) {
            const carrot = document.createElement('img');
            carrot.setAttribute('src', carrotPath);
            carrot.setAttribute('alt', 'carrot');
            carrot.setAttribute('class', 'carrot');
            carrot.setAttribute('data-id', 'carrot');
            carrot.style.cursor = `pointer`;
            carrot.style.position = `absolute`;
            carrot.style.transform = this.randomXY();
            this.ground.append(carrot);
        }
        for (let i = 0; i < bugCnt; i++) {
            const bug = document.createElement('img');
            bug.setAttribute('src', bugPath);
            bug.setAttribute('alt', 'bug');
            bug.setAttribute('class', 'bug');
            bug.setAttribute('data-id', 'bug');
            bug.style.cursor = `pointer`;
            bug.style.position = `absolute`;
            bug.style.transform = this.randomXY();
            this.ground.append(bug);
        }
    }

    moveObstacle() {
        this.bugs = document.querySelectorAll('.bug');
        this.move = setInterval(() => {
            for(let i = 0; i < this.bugs.length; i++) {
                this.bugs[i].style.transform = this.randomXY();
                this.bugs[i].style.transition = `transform ease 0.5s 0s`;
            }     
        }, 500);
    }
    
    stopObstacle() {
        clearInterval(this.move);
    }

    randomXY() {
        return `translate(${Math.floor(Math.random() * 740)}px, ${Math.floor(Math.random() * 155)}px)`;
    }
    
}