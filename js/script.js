let timer_left = document.querySelector(".timer-left");
let startBtn = document.querySelector(".start-stop");
let resetBtn = document.querySelector(".reset");
let session = document.querySelector(".session");
let shortBreak = document.querySelector(".shortBreak");
let longBreak = document.querySelector(".longBreak");

let time = {
    min: session.value,
    seg: 0
};

let shortTime = shortBreak.value;
let longTime = longBreak.value;
let breakTime = 3;
let bufBreakTime = breakTime;

let counter;            //used on setInterval
let running = false;

let sound = new Audio("./audio/audio.mp3");

//This function return a number with SIZE digits
function digitSize(number, size) {
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
        return true;
    }
    return false;
}

//Put timer object on screen
function setTimerLabel(min = time.min, seg = time.seg) {
    return timer_left.innerHTML = `${digitSize(min, 2)}:${digitSize(seg, 2)}`;
}

function reset() {
    clearInterval(counter);
    document.title = "Pomodoro Timer";
    setTimerLabel();
    running = false;
    startBtn.innerHTML = "Start";
}

startBtn.addEventListener("click", function () {
    if (running) {
        reset();
    } else {
        sound.pause();
        running = true;
        startBtn.innerHTML = "Stop";
        counter = setInterval(function () {
            countdown();
            if (isItTheEnd()) {
                --bufBreakTime;
                sound.play();
                if (bufBreakTime>0) {
                    time.min = shortTime;
                    time.seg = 0;
                    reset();
                } else {
                    if (bufBreakTime < 0) {
                        time.min = session.value;
                        time.seg = 0;
                        bufBreakTime = breakTime;
                        reset();
                    } else {
                        time.min = longTime;
                        time.seg = 0;
                        reset();
                    }
                }

            }
        }, 1000);
    }
});

resetBtn.addEventListener("click", function () {
    time.min = session.value;
    time.seg = 0;
    reset();
});
session.addEventListener("keyup", function () {
    time.min = session.value;
    setTimerLabel();
});
shortBreak.addEventListener("keyup", function () {
    shortTime = shortBreak.value;
    setTimerLabel(shortTime, 0);
});
longBreak.addEventListener("keyup", function () {
    longTime = longBreak.value;
    setTimerLabel(longTime, 0);
});