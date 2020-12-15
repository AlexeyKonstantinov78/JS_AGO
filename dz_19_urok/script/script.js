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
        const idInterval = setInterval(countTimer, 1000, deadline);

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

    }

    countTimer('15 december 2020');
    // setInterval(countTimer,1000, '31 december 2020');

    //menu
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            // menu.classList.toggle('active-menu');
            if (!menu.style.transform || menu.style.transform === 'translate(-100%)') {
                menu.style.transform = 'translate(0)';
                console.log(menu.getBoundingClientRect());
                if (document.documentElement.clientWidth > 768) {
                    let count = 0;

                    const timer = setInterval(function() {
                        count += +10;
                        const w = document.documentElement.clientWidth - menu.getBoundingClientRect().width;
                        if (count >= w) {
                            clearInterval(timer);
                        } else {
                            menu.style.left = count + 'px';
                        }
                    }, 20);
                    // menu.style.cssText = `-webkit-transition: 1s;
                    // transition: 1s;
                    // -webkit-transform: translateX(100%);
                    // transform: translateX(100%);`;
                } //else{
                //     // menu.style.cssText = `-webkit-transition: 0;
                //     // transition: 0;
                //     // -webkit-transform: translateX(0);
                //     // transform: translateX(0);`;
                // }
            } else {
                menu.style.transform = 'translate(-100%)';
                menu.style.left = '';
            }

        };

        btnMenu.addEventListener('click', () => {
            handlerMenu();
        });
        closeBtn.addEventListener('click', () => {
            handlerMenu();
        });

        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

    };

    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popUpClose = document.querySelector('.popup-close');

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
            });
        });

        popUpClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };

    togglePopUp();

});