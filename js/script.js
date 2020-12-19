let timer_left = document.querySelector(".timer-left");
let start = document.querySelector(".start-stop ");
let reset = document.querySelector(".reset");
let session = document.querySelector(".session");
let timeBreak = document.querySelector(".break");

let time = {
    min: session.value,
    seg: 0
};

let breakTime = timeBreak.value;

let counter; //used on setInterval
let running = false;
let Break = false;

let sound = new Audio("./audio/audio.mp3");

//This function return a number with SIZE digits
function pad(number, size) {
    number = number.toString();
    for (let i = 0; number.length < size; ++i) {
        number = `0${number}`;
    }
    return number;
}

//Decrase a time 1 sec per second
function timeDecrease() {
    if (time.seg <= 0) {
        --time.min;
        time.seg = 60;
    }
    --time.seg;
}

//Decrease the time and print into a timer label
function countdown() {
    timeDecrease();
    document.title = setTimerLabel();
}

function isItTheEnd() {
    if ((time.min <= 0) && (time.seg <= 0)) {
        sound.play();
        start.innerHTML = "Start";
        if(!Break){
            time.min = breakTime;
            timer_left.innerHTML = "Break Time";
        }else{
            time.min = session.value;
            timer_left.innerHTML = "Finished";
            Break = false;
        }
        running = false;
        Break = true;
        clearInterval(counter);
    }
}

function setTimerLabel() {
    return timer_left.innerHTML = `${pad(time.min, 2)}:${pad(time.seg, 2)}`;
}

start.addEventListener("click", function () {
    if (!running) {
        sound.pause();
        running = true;
        start.innerHTML = "Stop";
        counter = setInterval(function () {
            countdown();
            isItTheEnd();
        }, 1000);
    } else {
        running = false;
        start.innerHTML = "Start";
        clearInterval(counter);
    }
});

reset.addEventListener("click", function () {
    clearInterval(counter);
    start.innerHTML = "Start";
    running = false;
    time.min = session.value;
    time.seg = 0;
    setTimerLabel();
    document.title = "Pomodoro Timer";
});

session.addEventListener("keyup", function () {
    time.min = session.value;
    setTimerLabel();
});

timeBreak.addEventListener("keyup", function () {
    breakTime = timeBreak.value;
    timer_left.innerHTML = `${pad(timeBreak.value, 2)}:${pad(time.seg, 2)}`;
});
