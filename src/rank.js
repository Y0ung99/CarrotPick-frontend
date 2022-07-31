
    
export default class Rank {
    constructor() {
        this.submit = document.querySelector('.ipt_btn');
        this.usersList = document.querySelector('.users_scores');
        this.displayScore = document.querySelector('.display_score');
        this.nickname = document.querySelector('.ipt_name');
        this.doubleSubmitFlag = false;
    }

    async importRankJson() {
        const response = await fetch('https://www.main-bvxea6i-7gdoaw63nhdqe.au.platformsh.site/rank', {
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
        this.usersList.innerHTML = users.map(user => this.userHTML(user)).join('');
    }
    
    scoreToRanklist(rankedtime) {
        this.displayScore.innerHTML = `남은시간 : ${rankedtime}`;
        this.submitScore(rankedtime);
    }

    submitScore(rankedtime) {
        this.submit.addEventListener('click', (event) => {
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
        fetch('https://www.main-bvxea6i-7gdoaw63nhdqe.au.platformsh.site/rank', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usersData),
        });
    }

    userHTML(user) {
        const dbDate = new Date(user.createdAt);
        const koreaDate = `${dbDate.getFullYear()}. ${dbDate.getMonth()+1}. ${dbDate.getDate()}. ${dbDate.getHours()}:${dbDate.getMinutes()}:${dbDate.getSeconds()}`; 
        return `
        <li class="line">
            <span class="user">${user.name}</span>
            <span class="scores">${user.score}</span>
            <span class="createdAt">${koreaDate}</span>
        </li>
        `;
    }

    startRankSystem() {
        this.importRankJson()
        .then(this.displayRank);
    }
}