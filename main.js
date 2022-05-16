'use strict';

const play = document.querySelector('.play');
const timer = document.querySelector('.timer');
const carrotNum = document.querySelector('.num_carrot');
const ground = document.querySelector('.ground');
const ui = document.querySelector('.ui');
const variables = {time: null, carrotCnt: null, clock: null, move: null};
const audios = {alert: null, bg: null, bug: null, carrot:null, win: null};
const images = {bug: null, carrot: null};
const pause = document.createElement('button');

function declareVariables() {
    variables.time = 4.0;
    variables.carrotCnt = 9;
    variables.clock = undefined;
    variables.move = undefined;
}

function declareAudios() {
    audios.alert = new Audio('./sound/alert.wav');
    audios.bg = new Audio('./sound/bg.mp3');
    audios.bug = new Audio('./sound/bug_pull.mp3');
    audios.carrot = new Audio('./sound/carrot_pull.mp3');
    audios.win = new Audio('./sound/game_win.mp3');
    audios.bg.autoplay = true;
    audios.bg.loop = true;
}

function pauseBtnCreate() {
    pause.setAttribute('class', 'play');
    pause.innerHTML = `<i class="fa-solid fa-stop"></i>`;
    ui.prepend(pause);
    pause.style.display = `none`;
}

function changePlaytoPauseBtn() {
    pauseBtnCreate();
    pause.style.display = `block`;
    play.style.display = `none`;
    pause.addEventListener('click', gameResult);
}

function playTimer() {
    timer.innerHTML = `5`;
    variables.clock = setInterval(() => {
        timer.innerHTML = `${variables.time}`;
        variables.time = (variables.time - 0.1).toFixed(1);
        if (variables.time < 0) {
            clearInterval(variables.clock);
            timer.innerHTML = '시간초과';
            return gameResult();
        }
    }, 100);
}

function obstacleEvents() {
    carrotNum.innerHTML = variables.carrotCnt;
    ground.addEventListener('click', obstacleCliked);
}

function obstacleCliked(event) {
    
    if (event.target.dataset.id === 'carrot') {
        audios.carrot.pause();
        audios.carrot.currentTime = 0;
        audios.carrot.play();
        event.target.remove();
        carrotNum.innerHTML = --variables.carrotCnt;
        if (variables.carrotCnt === 0)  {
            return gameResult(false);
        }
    } else if (event.target.dataset.id === 'bug') {
        audios.bug.play();
        event.target.remove();
        return gameResult();
    }
    else {
        console.log(event);
    }
}

function createEndUI(Result) {
    const endUI = document.createElement('div');
    endUI.setAttribute('class', 'endUI');
    endUI.innerHTML = `
    <button class="replay"><i class="fa-solid fa-arrow-rotate-left"></i></button>
    <span>YOU ${Result}</span>
    `;
    ground.append(endUI);
}

function moveObstacle() {
    // 좌표를 지정
    // 벌레들을 좌표로 이동 시킨다
    // 이동이 끝나면 다시 좌표를 지정
    const bugs = document.querySelectorAll('.bug');
    variables.move = setInterval(() => {
        for(let i = 0; i < bugs.length; i++) {
            // const moveXY = {transform: randomXY()};
            // const moveOption = {
            //     duration: 1000,
            //     easing: 'linear',
            // }
            bugs[i].style.transform = randomXY();
            bugs[i].style.transition = `transform ease 0.5s 0s`;
        }     
    }, 500);
}

function gameStart() {
    audios.alert.play();
    audios.bg.play();
    createObstacle(); // 당근, 벌레 생성
    moveObstacle(); // 벌레 움직임
    changePlaytoPauseBtn(); // 플레이 버튼 -> 퍼즈 버튼 
    playTimer(); //  타이머 시작 이벤트
    obstacleEvents();// 당근, 벌레 클릭 이벤트
}

function gameResult(Result = true) {
    pause.removeEventListener('click', gameResult);
    ground.removeEventListener('click', obstacleCliked);
    clearInterval(variables.clock);
    clearInterval(variables.move);
    audios.bg.pause();
    !!Result ? Result = 'LOST' : Result = 'WIN';
    if (Result == 'WIN') audios.win.play();
    createEndUI(Result);
    const replay = document.querySelector('.replay');
    replay.addEventListener('click', () => {
        reStart();
    });
}

function reStart() {
    declareVariables();
    gameStart();
    audios.bg.load();
}

function randomXY() {
    return `translate(${Math.floor(Math.random() * 740)}px, ${Math.floor(Math.random() * 155)}px)`;
}

function createObstacle() {
    ground.innerHTML = `
    
    <div class="carrot" data-id="carrot" style="transform: ${randomXY()};">
    <img src="img/carrot.png" data-id="carrot" alt="carrot" />
    </div>
    <div class="bug" data-id="bug" style="transform: ${randomXY()};" >
    <img src="img/bug.png" data-id="bug" data-pair="0" alt="bug" />
    </div>
    <div class="carrot" data-id="carrot" style="transform: ${randomXY()};">
    <img src="img/carrot.png" data-id="carrot" alt="carrot" />
    </div>
    <div class="bug" data-id="bug" style="transform: ${randomXY()};" >
    <img src="img/bug.png" data-id="bug" data-pair="0" alt="bug" />
    </div>
    <div class="carrot" data-id="carrot" style="transform: ${randomXY()};">
    <img src="img/carrot.png" data-id="carrot" alt="carrot" />
    </div>
    <div class="bug" data-id="bug" style="transform: ${randomXY()};" >
    <img src="img/bug.png" data-id="bug" data-pair="0" alt="bug" />
    </div>
    <div class="bug" data-id="bug" style="transform: ${randomXY()};" >
    <img src="img/bug.png" data-id="bug" data-pair="0" alt="bug" />
    </div>
    <div class="carrot" data-id="carrot" style="transform: ${randomXY()};">
    <img src="img/carrot.png" data-id="carrot" alt="carrot" />
    </div>
    <div class="bug" data-id="bug" style="transform: ${randomXY()};" >
    <img src="img/bug.png" data-id="bug" data-pair="0" alt="bug" />
    </div>
    <div class="carrot" data-id="carrot" style="transform: ${randomXY()};">
    <img src="img/carrot.png" data-id="carrot" alt="carrot" />
    </div>
    <div class="bug" data-id="bug" style="transform: ${randomXY()};" >
    <img src="img/bug.png" data-id="bug" data-pair="0" alt="bug" />
    </div>
    <div class="bug" data-id="bug" style="transform: ${randomXY()};" >
    <img src="img/bug.png" data-id="bug" data-pair="0" alt="bug" />
    </div>
    <div class="carrot" data-id="carrot" style="transform: ${randomXY()};">
    <img src="img/carrot.png" data-id="carrot" alt="carrot" />
    </div>
    <div class="bug" data-id="bug" style="transform: ${randomXY()};" >
    <img src="img/bug.png" data-id="bug" data-pair="0" alt="bug" />
    </div>
    <div class="carrot" data-id="carrot" style="transform: ${randomXY()};">
    <img src="img/carrot.png" data-id="carrot" alt="carrot" />
    </div>
    <div class="bug" data-id="bug" style="transform: ${randomXY()};" >
    <img src="img/bug.png" data-id="bug" data-pair="0" alt="bug" />
    </div>
    <div class="carrot" data-id="carrot" style="transform: ${randomXY()};">
    <img src="img/carrot.png" data-id="carrot" alt="carrot" />
    </div>
    <div class="bug" data-id="bug" style="transform: ${randomXY()};" >
    <img src="img/bug.png" data-id="bug" data-pair="0" alt="bug" />
    </div>
    <div class="carrot" data-id="carrot" style="transform: ${randomXY()};">
    <img src="img/carrot.png" data-id="carrot" alt="carrot" />
    </div>
    <div class="bug" data-id="bug" style="transform: ${randomXY()};" >
    <img src="img/bug.png" data-id="bug" data-pair="0" alt="bug" />
    </div>
    <div class="bug" data-id="bug" style="transform: ${randomXY()};" >
    <img src="img/bug.png" data-id="bug" data-pair="0" alt="bug" />
    </div>`;
}

play.addEventListener('click', () => {
    declareAudios();
    declareVariables();
    gameStart();
})