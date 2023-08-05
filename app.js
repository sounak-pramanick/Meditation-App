const song = document.querySelector('.song');
const playBtn = document.querySelector('.play');
const outline = document.querySelector('.moving-outline circle');
const video = document.querySelector('.video-container video');
const sounds = document.querySelectorAll('.sound-picker-container button');
const timeDisplay = document.querySelector('.time-display');
let timeSelect = document.querySelectorAll('.time-select-container button');



const outlineLength = outline.getTotalLength();

let defaultDuration = 180;

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;


const checkPlaying = song => {
    if(song.paused) {
        song.play();
        video.play();
        playBtn.src = './assets/svg/pause.svg';
    }
    else {
        song.pause();
        video.pause();
        playBtn.src = './assets/svg/play.svg';
    }
}


playBtn.addEventListener('click', () => {
    checkPlaying(song);
})

timeSelect.forEach(option => {
    option.addEventListener('click', function() {
        defaultDuration = this.getAttribute('data-time');
        
        let {seconds, minutes} = calculateSecondsAndMinutes(defaultDuration);
        timeDisplay.textContent = `${minutes}:${seconds}`;
    })
})

song.addEventListener('timeupdate', () => {
    let currentTime = song.currentTime;
    let elapsedTime = defaultDuration - currentTime;

    let {seconds, minutes} = calculateSecondsAndMinutes(elapsedTime);
    
    let progress = outlineLength - (currentTime / defaultDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    timeDisplay.textContent = `${minutes}:${seconds}`;

    if(currentTime >= defaultDuration) {
        song.pause();
        video.pause();
        song.currentTime = 0;
        playBtn.src = './assets/svg/play.svg'
    }
})


sounds.forEach(sound => {
    sound.addEventListener('click', function() {
        song.src = this.getAttribute('data-sound');
        video.src = this.getAttribute('data-video');
        // checkPlaying(song);
    })
})

let calculateSecondsAndMinutes = (time) => {
    let seconds = Math.floor(time % 60);
    let minutes = Math.floor(time / 60);

    if(minutes < 10) minutes = `0${minutes}`;
    if(seconds < 10) seconds = `0${seconds}`;

    return {
        seconds,
        minutes
    };
}