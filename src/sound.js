const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');

export function playCarrot() {
    playSound(carrotSound);
}

export function playBug() {
    playSound(bugSound);
}

export function playAlert() {
    playSound(alertSound);
}

export function playBg() {
    playSound(bgSound);
}

export function playWin() {
    playSound(winSound);
}

export function stopBg() {
    stopSound(bgSound);
}

export function updateMusicVolume(value) {
    bgSound.volume = value * 0.01;
}

export function updateEffectVolume(value) {
    alertSound.volume = value * 0.01;
    bugSound.volume = value * 0.01;
    carrotSound.volume = value * 0.01;
    winSound.volume = value * 0.01;
}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}

