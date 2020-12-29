/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable strict */
/* eslint-disable space-before-blocks */
/* eslint-disable prefer-arrow-callback */
// eslint-disable-next-line arrow-parens
/* eslint-disable */
window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    //Timer
    const dataTime = '31 december 2020',
        idInterval = setInterval(countTimer, 1000, dataTime);
    
    function countTimer(deadline){
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');
        
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
            
                clearInterval(idInterval);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }

        updateClock();
    }

    countTimer(dataTime);
    

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
            if (target.closest('a') && target.closest('menu') !== null && !target.closest('.close-btn')) handlerMenu();
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
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day'),
            totalValue = document.getElementById('total');

        const bruteForceNumbers = (total, count = 0) => {
            let time = 1,//ms
                step = Math.ceil((total / (time * 1000)) * 11);

            if (count < total) {
                count += +step;
            }

            if (count < total) {
                setTimeout(requestAnimationFrame(() => {
                    bruteForceNumbers(total, count);
                }), time);
            } else {
                totalValue.textContent = Math.round(total);
                return;    
            }
            totalValue.textContent = count;
        }; 

        const countSum = () => {
            let countValue = 1,
                dayValue = 1,
                total = 0;

            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
                requestAnimationFrame(() => {
                    bruteForceNumbers(total);
                });
            }

        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;
            // eslint-disable-next-line max-len
            if (target.matches('.calc-type') || target.matches('.calc-square') || target.matches('.calc-count') || target.matches('.calc-day')) {
                countSum();
            }

            // if (target.matches('.calc-square')) {
            //      calcSquare.value = calcSquare.value.replace(/\D/g, '');
            // }
            // if (target.matches('.calc-count')) {
                
            // }
            // if (target.matches('.calc-day')) {
            //     calcDay.value = calcDay.value.replace(/\D/g, '');
            // }
        });
    };

    calc(100);

    // отправка ajax form
    const sendForm = () => {
        const errorMessage = 'Что то пошло не так...',
            //loadMessage = 'Загрузка...',
            successMesage = 'Спсасибо! Мы скоро с вами свяжемся!',
            formAll = document.querySelectorAll('form'),
            preloader = document.createElement('div');
            preloader.classList.add('preloader');
            preloader.innerHTML = `
                <div class="circle circle-1"></div>
                <div class="circle circle-2"></div>
                <div class="circle circle-3"></div>
                <div class="circle circle-4"></div>
                <div class="circle circle-5"></div>                
                `;

        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = 'font-size: 2rem; color: #FFFFFF;';
        //form.appendChild(statusMessage);

        formAll.forEach((item) => {
            item.addEventListener('input', event => inputVerifi(event.target, item));
            
            item.addEventListener('submit', (event) => {
                event.preventDefault();
                
                item.appendChild(statusMessage);
                statusMessage.textContent = '';
                const formData = new FormData(item);
                //request.send(formData);
                let body = {};

                // for (let val of formData.entries()) {
                //     body[val[0]] = val[1];
                // }

                formData.forEach((val, key) => {
                    body[key] = val;
                });
                
                if ((body.user_name !== '' && body.user_email !== '' && body.user_phone !== '' && (body.user_message === undefined || body.user_message !== ''))) {
                    item.appendChild(preloader);
                    
                    postData(body)
                        .then((response) => {
                            if (response.status !== 200) throw new Error('status network not 200');
                            item.removeChild(preloader);
                            statusMessage.textContent = successMesage;
                            removeTheThankYouText(item);
                        }) 
                        .catch((error) => {
                                item.removeChild(preloader);
                                statusMessage.textContent = errorMessage;
                                removeTheThankYouText(item);
                                console.error(error);
                        })
                        .finally(() => {
                            inputItem(item);
                        });
                    
                } else { 
                    statusMessage.textContent = errorMessage;
                }
            });
        });
        
        const removeTheThankYouText = (item) => {
            setTimeout(() => {
                item.removeChild(statusMessage);
            }, 5000);
        }

        const inputVerifi = (item, form) => {

            if (item.closest('.form-phone')) { 
                item.value = item.value.substring(0, 12).replace(/[^\+0-9]/g, '') + item.value.substring(11, ).replace(/./g, '');
                    if (/^\+?([-()]*\d){8,11}$/.test(item.value) && item.value.length >= 8 && item.value.length <= 12) {
                        item.style.border = '';
                    } else {item.style.border = 'solid red';}  
            }
            
            if (item.closest('.form-name') || item.closest('#form2-name')) {
                item.value = item.value.replace(/[^А-Яа-яЁё ]/gi, '');
            } 
            
            if (item.closest('.form-email')) {
                item.value = item.value.replace(/[^\w+@\w+\.\w]/gi, '');
                
                if (/^\w+@\w+\.\w{2,}$/g.test(item.value)) {
                    item.style.border = '';
                } else {item.style.border = 'solid red';}  
            }
            
            if (item.closest('.mess')) {
                item.value = item.value.replace(/[^А-Яа-яЁё\d .,?!'"]/gi, '');}
        }

        const inputItem = (item) => {
            const inputAll = item.querySelectorAll('input');
            inputAll.forEach((elem) => {
                elem.value = '';
            });
        }

        const postData = (body) => {
            return fetch('./server.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });

            // return new Promise((resolve, reject) => {
            //     const request = new XMLHttpRequest();
            //     request.addEventListener('readystatechange', () => {
            //         if (request.readyState !== 4) {
            //             return;
            //         }
            //         if (request.status === 200) {
            //             return resolve();
            //             //outputData();
            //         } else {
            //             return reject();
            //             //errorData(request.status);
            //         }
            //     });
            //     request.open('POST', './server.php');
            //     request.setRequestHeader('Content-Type', 'application/json'); // multipart/form-data просто отправка formData
            //     request.send(JSON.stringify(body));
            // });
            
        };

    };

    sendForm();
});

