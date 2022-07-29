export default class Rank {
    constructor() {
        this.submit = document.querySelector('.ipt_btn');
        this.usersList = document.querySelector('.users_scores');
        this.displayScore = document.querySelector('.display_score');
        this.nickname = document.querySelector('.ipt_name');
    }

    async importRankJson() {
        const response = await fetch('http://localhost:8080/rank', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response.json();
    }

    displayRank = (users) => {
        console.log(users);
        this.usersList.innerHTML = users.map(user => this.userHTML(user)).join('');
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
        } else {
            const usersData = {name, score};
            console.log(usersData);
            fetch('http://localhost:8080/rank', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usersData),
            })
            .then(response => response.json())
            .then(data => { console.log('성공', data)})
            .catch(console.error);

        }
    }

    userHTML(user) {
        return `
        <li class="line">
            <span class="user">${user.name}</span>
            <span class="scores">${user.score}</span>
            <span class="createdAt">${user.createdAt}</span>
        </li>
        `;
    }

    startRankSystem() {
        this.importRankJson()
        .then(this.displayRank);
    }
}