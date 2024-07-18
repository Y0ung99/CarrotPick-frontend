import { configDotenv } from 'dotenv';
configDotenv();

const host = `https://api.carrotrank.store/rank` // 랭크시스템 이용을 위해서 입력

export default class Rank {
    constructor() {
        this.submit = document.querySelector('.ipt_btn');
        this.usersList = document.querySelector('.users_scores');
        this.displayScore = document.querySelector('.display_score');
        this.nickname = document.querySelector('.ipt_name');
        this.doubleSubmitFlag = false;
    }

    async importRankJson() {
        const response = await fetch(`${host}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response.json();
    }

    doubleSubmitCheck() {
        if (this.doubleSubmitFlag) {
            return this.doubleSubmitFlag;
        } else {
            this.doubleSubmitFlag = true;
            return false;
        }
    }

    displayRank = (users) => {
        this.usersList.innerHTML = users.map((user, index) => this.userHTML(index, user)).join('');
    }
    
    scoreToRanklist(rankedtime, carrotCnt, bugCnt, duration) {
        const carrotScore = Number(carrotCnt) * 10;
        const bugScore = bugCnt * 20;
        const timeScore = (Number(rankedtime) / duration) * 100;
        const timePanalty = duration * 2;
        let finalScore = (carrotScore + bugScore + timeScore - timePanalty).toFixed(2);
        console.log(timeScore, bugScore, carrotScore, Number(carrotCnt));
        console.log(finalScore);
        finalScore = finalScore < 0 ? 0 : finalScore;
        this.displayScore.innerHTML = `스코어 : ${finalScore}`;
        this.submitScore(finalScore);
    }

    submitScore(finalScore) {
        this.submit.addEventListener('click', () => {
            this.addLine(finalScore);
        });
    }
    
    addLine = (finalScore) => {
        if(this.doubleSubmitCheck()) return;
        const name = this.nickname.value;
        const score = finalScore;
        if (!name || !score) {
            alert('닉네임이나 스코어란이 비어있습니다.');
            return;
        }
        if (name.length > 11) {
            this.nickname.value = '';
            alert('닉네임은 10자 이하라구~ 벌로 너의 점수는 벌레들이 먹었다구~');
            return;
        }
        const usersData = {name, score};
        fetch(`${host}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usersData),
        });
    }

    userHTML(index, user) {
        const dbDate = new Date(user.createdAt);
        const koreaDate = `${dbDate.getFullYear()}년 ${dbDate.getMonth()+1}월 ${dbDate.getDate()}일 ${dbDate.getHours() < 10 ? `0${dbDate.getHours()}` : dbDate.getHours()}:${dbDate.getMinutes() < 10 ? `0${dbDate.getMinutes()}` : dbDate.getMinutes()}`; 
        const img = [0, 1, 2].includes(index) ? `<img class="prize" src="img/prize_${index+1}.png" alt="prize_${index+1}"></img>` : `<div class="prize"></div>`;
        return `
        <li class="line">
            ${img}
            <span class="user">${user.name}</span>
            <span class="scores">${user.score.toFixed(2)}점</span>
            <span class="createdAt">${koreaDate}</span>
        </li>
        `;
    }

    startRankSystem() {
        this.importRankJson()
        .then(this.displayRank);
    }
}