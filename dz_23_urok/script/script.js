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

        const menu = document.querySelector('menu'),
            body = document.querySelector('body');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        body.addEventListener('click', (event) => {
            let target = event.target;
            if (!target.closest('.active-menu') && menu.classList.contains('active-menu') === true) handlerMenu();
            if (target.closest('.menu')) handlerMenu();
            if (target.closest('.close-btn')) handlerMenu();
            if (target.closest('ul') && target.closest('menu') !== null) handlerMenu()
        });
    };

    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupContent = document.querySelector('.popup-content'),
            popupBtn = document.querySelectorAll('.popup-btn');

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', (e) => {
                e.preventDefault();
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

        popup.addEventListener('click', (event) => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                }
            }
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
                target = target.closest('.service-header-tab'); // проверка селектора на селект. возвращает null tclb не нашол селектор и поднимается только вверх
            if (target){
                tab.forEach((item, i) => {
                    if (item === target) {
                        toogleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();

    //слайдер
    const slider = () => { 
        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content');

        let dot = document.querySelectorAll('.dot');

        const addDot = (index) => {
            for (let i = 0; i < index; i++) {
                let li = document.createElement('li');
                li.classList.add('dot');
                document.querySelector('.portfolio-dots').append(li);
            }
            dot = document.querySelectorAll('.dot');
            nextSlide(dot, 0, 'dot-active');
        };

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) currentSlide = 0;
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        };

        const startSlide = (time = 1500) => {
            if (dot.length === 0) addDot(slide.length);
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) currentSlide = 0;
            if (currentSlide < 0) currentSlide = slide.length - 1;

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn, .dot')) stopSlide();
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn, .dot')) startSlide();
        });

        startSlide(1500);

    };

    slider();

    // наша команда
    const blockOurTeam = () => {
        const command = document.querySelector('.command>.container>.row');
        let imgoriginal;
        command.addEventListener('mouseover', (event) => {
            if (event.target.matches('img')) {
                imgoriginal = event.target.src;
                event.target.src = event.target.dataset.img;
            }
        });
        command.addEventListener('mouseout', (event) => {
            if (event.target.matches('img')) {
                event.target.src = imgoriginal;
            }
        });
    };

    blockOurTeam();

    //калькулятор 
    const calc = () => {
        const calcBlock = document.querySelector('.calc-block'),
            calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day');

        calcBlock.addEventListener('input', (e) => {
            if (e.target.matches('.calc-square')) {
                calcSquare.value = calcSquare.value.replace(/\D/g, '');
            }
            if (e.target.matches('.calc-count')) {
                calcCount.value = calcCount.value.replace(/\D/g, '');
            }
            if (e.target.matches('.calc-day')) {
                calcDay.value = calcDay.value.replace(/\D/g, '');
            }
        });
    };

    calc();

});

