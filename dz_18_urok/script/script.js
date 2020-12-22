/* eslint-disable strict */
/* eslint-disable space-before-blocks */
/* eslint-disable prefer-arrow-callback */
window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    //Timer
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimerRemin(){
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return {timeRemaining, hours, minutes, seconds};
        }

        function decZero(n) {
            if (n >= 0 && n < 10) {return '0'+n;}
            return n;
        }

        function updateClock(){
            let timer = getTimerRemin();

            timerHours.textContent = decZero(timer.hours);
            timerMinutes.textContent = decZero(timer.minutes);
            timerSeconds.textContent = decZero(timer.seconds);
            if (timer.timeRemaining <= 0) {
            //     // setTimeout(updateClock, 1000);
                clearInterval(idInterval);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }

        updateClock();
        const idInterval = setInterval(countTimer, 1000, '31 december 2020');
    }

    countTimer('31 december 2020');
    // setInterval(countTimer,1000, '31 december 2020');
});