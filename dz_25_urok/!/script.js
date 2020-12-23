'use strict';

// const phone = document.getElementById('phone');

// //const showLog = e => console.log(e.type);

// const showLog = function(){
//     this.value = this.value.replace(/\D/g, '');
// }

// phone.addEventListener('keydown', showLog);
// phone.addEventListener('keyup', showLog); // можно использовать для блокировки символов
// phone.addEventListener('keypress', showLog);
// phone.addEventListener('input', showLog);

//maskPhone('#phone'); // вторым параметром можно передать маску ___ черточки снизу означают цифры пример 8 (___) ___-____

// валидация форм
const myForm = document.getElementById('myform');

myForm.addEventListener('submit', valied);

//console.log(myForm.elements);

const elementsForm = [];

for (const elem of myForm.elements){
  //  console.log(elem);
    if (elem.tagName.toLowerCase() != 'button' && elem.type !== 'button') {
        console.log(elem);
        elementsForm.push(elem);

    }
}

function valied(event) {
    const patternPhone = /^\d+$/;

    elementsForm.forEach(elem => {
        if (!elem.value) {
            elem.style.border = 'solid red';
            event.preventDefault();
        } else {
            elem.style.border = '';
        }

        if (elem.id === 'phone' && !patternPhone.test(elem.value)) {
            elem.style.border = 'solid red';
            event.preventDefault();
        } 
    });
}
