'ude strict';

const timeDays = document.querySelector('#time-days'),
    week = document.querySelector('#week'),
    time = document.querySelector('#time'),
    timeKol = document.querySelector('#time-kol'),
    weekTime = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    date = new Date(),    
    day = date.getDay(),
    count = Math.floor(((new Date('31 december 2020')).getTime() - date.getTime()) / 1000 / 60 / 60 /24);
        
    function partOfDay(){
        if (date.getHours() >= 4 && date.getHours() < 10) {return 'Доброе утро';}
        if (date.getHours() >= 10 && date.getHours() < 17) {return 'Добрый день';}
        if (date.getHours() >= 17 && date.getHours() < 21) {return 'Добрый вечер';}
        if (date.getHours() >= 21 && date.getHours() < 24) {return 'Добрый ночи';}
        if (date.getHours() >= 0 && date.getHours() < 10) {return 'Добрый ночи';}
    }

timeDays.textContent = partOfDay();
week.textContent = weekTime[day];
time.textContent = date.toLocaleTimeString('en');
timeKol.textContent = count;



