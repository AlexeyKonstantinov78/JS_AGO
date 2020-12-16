/* eslint-disable strict */
/* eslint-disable space-before-blocks */
/* eslint-disable prefer-arrow-callback */
// eslint-disable-next-line arrow-parens
window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    //Timer
    function countTimer(deadline){
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        const idInterval = setInterval(countTimer, 1000, deadline);

        function getTimerRemin(){
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return {
                timeRemaining, hours, minutes, seconds
            };
        }

        function decZero(n) {
            if (n >= 0 && n < 10) {return '0'+n;}
            return n;
        }

        function updateClock(){
            const timer = getTimerRemin();

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
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', () => {
            handlerMenu();
        });
        closeBtn.addEventListener('click', () => {
            handlerMenu();
        });
        // eslint-disable-next-line arrow-parens
        menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));

    };

    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupContent = document.querySelector('.popup-content'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popUpClose = document.querySelector('.popup-close');

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
                popupContent.style.top = '30%';
                if (document.documentElement.offsetWidth >= 768) {
                    let count = 0;
                    requestAnimationFrame(function opac() {
                        count++;

                        popupContent.style.opacity = count / 100;

                        if (count < 100) {
                            setTimeout(opac, 2);
                        }
                    });
                }

            });
        });

        popUpClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };

    togglePopUp();

    //tab
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = document.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toogleTabContent = (index) => {
            for (let i = 0; i < tabContent.length; i++){
                if (index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            if(target.classList.contains('service-header-tab')){
                tab.forEach((item, i) => {
                    if (item === target) {
                        toogleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();
});