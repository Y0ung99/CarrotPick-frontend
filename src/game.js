import EndUI from './endUI.js';
import Ground from './ground.js';
import Rank from './rank.js';
import * as sound from './sound.js';

const gameFinishBanner = new EndUI();
const groundEvents = new Ground();
const rankSystem = new Rank();

export default class GameBuilder {
    gameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }
    carrotCount(num) {
        this.carrotCount = num;
        return this;
    }
    bugCount(num) {
        this.bugCount = num;
        return this;
    }
    build() {
        return new Game(this.gameDuration, this.carrotCount, this.bugCount);
    }
}

class Game {
    constructor(duration, carrotCnt, bugCnt) {
        this.play = document.querySelector('.play');
        this.timer = document.querySelector('.timer');
        this.carrotNum = document.querySelector('.num_carrot');
        this.ui = document.querySelector('.ui');        
        this.pause = document.createElement('button'); 
        this.initvalues = {time: duration, carrotCnt: carrotCnt, bugCnt: bugCnt};
        this.running = null;
        this.clock = null;
        this.rankedtime = null;
        this.time = null;
        this.carrotCnt = null;
        this.bugCnt = null;
    }
    
    updateScore(score) {
        this.carrotNum.innerHTML = score;
    }

    gameResult(Result = true) {
        clearInterval(this.clock);
        groundEvents.stopObstacle();
        sound.stopBg();
        !!Result ? Result = 'LOST' : Result = 'WIN';
        if (Result == 'WIN') {
            sound.playWin();
            this.rankedtime = this.time;
            rankSystem.scoreToRanklist(this.rankedtime);  
        }
        gameFinishBanner.showWithResult(Result);
        this.running = false;
    }

    onItemClick = (item) => {
        if (this.running === true) {
            if (item === 'carrot') {
                this.updateScore(--this.carrotCnt);
                if (this.carrotCnt === 0)  {
                    this.gameResult(false);
                }
            } else if (item === 'bug') {
                this.gameResult(true);
            }
        }
        return this.running;
    }

    declareVariables() {
        this.running = true;
        this.time = this.initvalues.time;
        this.carrotCnt = this.initvalues.carrotCnt;
        this.bugCnt = this.initvalues.bugCnt;
        this.clock = undefined;
    }

    gameStart() {
        sound.playAlert();
        sound.playBg();
        this.carrotNum.innerHTML = `${this.carrotCnt}`;
        groundEvents.createObstacle(this.carrotCnt, this.bugCnt, `./img/carrot.png`, `./img/bug.png`); // 당근, 벌레 생성
        groundEvents.moveObstacle(); // 벌레 움직임
        this.changePlaytoPauseBtn(); // 플레이 버튼 -> 퍼즈 버튼 
        this.playTimer(); //  타이머 시작 이벤트
        groundEvents.setClickListener(this.onItemClick);
    }

    reStart() {
        this.declareVariables();
        this.gameStart();
    }

    playTimer() {
        this.clock = setInterval(() => {
            this.time = (this.time - 0.1).toFixed(1);
            this.timer.innerHTML = `${this.time}`;
            if (this.time < 0) {
                clearInterval(this.clock);
                this.timer.innerHTML = '시간초과';
                return this.gameResult();
            }
        }, 100);
    }

    changePlaytoPauseBtn() {
        this.pauseBtnCreate();
        this.pause.style.display = `block`;
        this.play.style.display = `none`;
        this.pause.addEventListener('click', () => this.gameResult());
    }

    pauseBtnCreate() {
        this.pause.setAttribute('class', 'play');
        this.pause.innerHTML = `<i class="fa-solid fa-stop"></i>`;
        this.ui.prepend(this.pause);
        this.pause.style.display = `none`;
    }

    uiInit() {
        gameFinishBanner.setClickListener(() => {
            this.reStart();
        });
        this.play.addEventListener('click', () => {
            this.declareVariables();
            this.gameStart();
        })
    }
}

