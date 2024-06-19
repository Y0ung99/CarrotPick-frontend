const host = '';

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
    
    scoreToRanklist(rankedtime) {
        this.displayScore.innerHTML = `남은시간 : ${rankedtime}`;
        this.submitScore(rankedtime);
    }

    submitScore(rankedtime) {
        this.submit.addEventListener('click', () => {
            this.addLine(rankedtime);
        });
    }
    
    addLine = (rankedtime) => {
        if(this.doubleSubmitCheck()) return;
        const name = this.nickname.value;
        const score = rankedtime;
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
        const koreaDate = `${dbDate.getFullYear()}년 ${dbDate.getMonth()+1}월 ${dbDate.getDate()}일 ${dbDate.getHours()}시 ${dbDate.getMinutes()}분`; 
        const img = [0, 1, 2].includes(index) ? `<img class="prize" src="img/prize_${index+1}.png" alt="prize_${index+1}"></img>` : `<div class="prize"></div>`;
        return `
        <li class="line">
            ${img}
            <span class="user">${user.name}</span>
            <span class="scores">${user.score.toFixed(2)}초</span>
            <span class="createdAt">${koreaDate}</span>
        </li>
        `;
    }

    startRankSystem() {
        this.importRankJson()
        .then(this.displayRank);
    }
}