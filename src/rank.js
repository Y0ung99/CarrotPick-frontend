export default class Rank {
    constructor() {
        this.submit = document.querySelector('.ipt_btn');
        this.usersList = document.querySelector('.users_scores');
        this.displayScore = document.querySelector('.display_score');
        this.nickname = document.querySelector('.ipt_name');
    }

    async improtRankJson() {
        const response = await fetch('./json/rankdata.json');
        const json = await response.json();
        return json.users;
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
            event.preventDefault()
            this.addLine(rankedtime);
            
        });
    }
    
    addLine = (rankedtime) => {
        const name = this.nickname.value;
        const score = rankedtime;
        if (name.length > 19) {
            this.nickname.value = '';
            alert('닉네임은 18자 미만이라구~ 벌로 너의 점수는 벌레들이 먹었다구~');
            return;
        } else {
            const usersData = {rank_name: name, rank_score: score};
            console.log(usersData);
            fetch('ec2-3-34-46-255.ap-northeast-2.compute.amazonaws.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usersData),
            })
            .then(response => response.json())
            .then(data => { console.log('성공', data)})
            .catch(console.error);

            // JSON 파일에 userData 추가
        }
    }

    userHTML(user) {
        return `
        <li class="line">
            <span class="user">${user.rank_name}</span>
            <span class="scores">${user.rank_score}</span>
        </li>
        `;
    }

    startRankSystem() {
        this.improtRankJson()
        .then(this.displayRank);
    }
}
