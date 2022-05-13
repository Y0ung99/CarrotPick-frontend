const play = document.querySelector('.play');
const timer = document.querySelector('.timer');
const carrotNum = document.querySelector('.num_carrot');
const ground = document.querySelector('.ground');
const ui = document.querySelector('.ui');
let time = 9;
let carrotCnt = 9;
let clock = undefined;
const pause = document.createElement('button')
pause.setAttribute('class', 'play');
pause.innerHTML = `<i class="fa-solid fa-stop"></i>`;
ui.prepend(pause);
pause.style.display = `none`;

function gameStart() {
    createObstacle();
    
    pause.style.display = `block`;
    play.style.display = `none`;
    

    pause.addEventListener('click', gameLost);

    document.querySelector('.timer').innerHTML = `10`;
    clock = setInterval(() => {
        document.querySelector('.timer').innerHTML = `${time}`;
        time--;
        if (time < 0) {
            clearInterval(clock);
            console.log('hi');
            document.querySelector('.timer').innerHTML = '시간초과';
            return gameLost();
        }
    }, 1000);

    carrotNum.innerHTML = carrotCnt;
    ground.addEventListener('click', event => {
        if (event.target.dataset.id === 'carrot') {
            event.target.remove();
            carrotNum.innerHTML = --carrotCnt;
            clearInterval(clock);
            if (carrotCnt === 0) return gameLost(1);

        } else if (event.target.dataset.id === 'bug') {
            event.target.remove();
            clearInterval(clock);
            return gameLost();
        }
    })

}

function gameLost(Result) {
    !!Result ? Result = 'WIN' : Result = 'LOST';
    const endUI = document.createElement('div');
    endUI.setAttribute('class', 'endUI');
    endUI.innerHTML = `
    <button class="replay"><i class="fa-solid fa-arrow-rotate-left"></i></button>
    <span>YOU ${Result}</span>
    `;

    pause.removeEventListener('click', gameLost);
    ground.append(endUI);
    

    const replay = document.querySelector('.replay');
    replay.addEventListener('click', (event) => {
        history.go(0);
    });
}

function createObstacle() {
    ground.innerHTML = `
    <div class="bug" style="transform: ${randomXY()}" >
    <img src="/img/bug.png" data-id="bug" alt="bug" />
    </div>
    <div class="carrot" style="transform: ${randomXY()}">
    <img src="/img/carrot.png" data-id="carrot" alt="carrot" />
    </div>
    <div class="bug" style="transform: ${randomXY()}" >
    <img src="/img/bug.png" data-id="bug" alt="bug" />
    </div>
    <div class="carrot" style="transform: ${randomXY()}">
    <img src="/img/carrot.png" data-id="carrot" alt="carrot" />
    </div>
    <div class="bug" style="transform: ${randomXY()}" >
    <img src="/img/bug.png" data-id="bug" alt="bug" />
    </div>
    <div class="carrot" style="transform: ${randomXY()}">
    <img src="/img/carrot.png" data-id="carrot" alt="carrot" />
    </div>
    <div class="bug" style="transform: ${randomXY()}" >
    <img src="/img/bug.png" data-id="bug" alt="bug" />
    </div>
    <div class="carrot" style="transform: ${randomXY()}">
    <img src="/img/carrot.png" data-id="carrot" alt="carrot" />
    </div>
    <div class="bug" style="transform: ${randomXY()}" >
    <img src="/img/bug.png" data-id="bug" alt="bug" />
    </div>
    <div class="carrot" style="transform: ${randomXY()}">
    <img src="/img/carrot.png" data-id="carrot" alt="carrot" />
    </div>
    <div class="bug" style="transform: ${randomXY()}" >
    <img src="/img/bug.png" data-id="bug" alt="bug" />
    </div>
    <div class="carrot" style="transform: ${randomXY()}">
    <img src="/img/carrot.png" data-id="carrot" alt="carrot" />
    </div>
    <div class="carrot" style="transform: ${randomXY()}">
    <img src="/img/carrot.png" data-id="carrot" alt="carrot" />
    </div>
    <div class="carrot" style="transform: ${randomXY()}">
    <img src="/img/carrot.png" data-id="carrot" alt="carrot" />
    </div>
    <div class="carrot" style="transform: ${randomXY()}">
    <img src="/img/carrot.png" data-id="carrot" alt="carrot" />
    </div>`
    ;
}

function randomXY() {
    return `translate(${Math.floor(Math.random() * 740)}px, ${Math.floor(Math.random() * 155)}px);`;
}


play.addEventListener('click', () => {
    gameStart();
})