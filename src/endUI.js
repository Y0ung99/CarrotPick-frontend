'use strict';
export default class EndUI {
    constructor() {
        this.endUI = document.querySelector('.endUI');
        this.endText = document.querySelector('.endText');
        this.replay = document.querySelector('.replay');
        this.replay.addEventListener('click', () => {
            this.onClick && this.onClick();
            this.hide();
        })
    }
    setClickListener(onClick) {
        this.onClick = onClick;
    }

    hide() {
        this.endUI.style.visibility = 'hidden';
    }

    showWithResult(Result) {
        this.endUI.style.visibility = 'visible';
        this.endText.innerText = `YOU ${Result}`;
    }
}