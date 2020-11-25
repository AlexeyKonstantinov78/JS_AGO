'use strict';

let money, 
    income = '30000', 
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую (пример: "Квартплата, проездной, кредит")'), 
    deposit = confirm('Есть ли у вас депозит в банке'), 
    mission = 1500000, 
    period = 12,
    budgetDay,
    // expenses1,
    // expenses2,
    expenses = [],
    accumulatedMonth,
    expensesAmount;
    
function isNumbers(n) { 
    return !isNaN(parseFloat(n)) && isFinite(n);   // isFinite булиевый оператор проверять счисло бесконечное или нет
}


function start() {
    // money = prompt('Ваш месячный доход'); за коментировал т.к. два раза спрашвает из-за цикла do while

    do{                                                                         
        money = prompt('Ваш месячный доход');
    }    
    while (!isNumbers(money));

    // while (!isNumbers(money)) {                                              // 3 вариант
    //     money = prompt('Ваш месячный доход');
    // }

    // while (isNaN(parseFloat(money))) {                                              // 2 вариант parseFloat конвертирует в число isNaN проверка на число
    //     money = prompt('Ваш месячный доход');
    // }
    
    // while (isNaN(money) || money.trim() === ' ' || money.trim() === null) {     1 вариант
    //     money = prompt('Ваш месячный доход');
    // }
}

start();

function getExpensesMonth () {          // обязательные расходы в месяц
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        let mon;
        // if (i === 0) {                                                           для себя на память
        //     expenses1 = prompt('Введите обязательную статью расходов?'); 
        // } else if (i === 1) {
        //     expenses2 = prompt('Введите обязательную статью расходов?');
        // }
        expenses[i] =  prompt('Введите обязательную статью расходов?'); 

        do {
            mon = prompt('Во сколько это обойдется?');
        }
        while (!isNumbers(mon));
        sum += +mon;
    }

    return sum;
}

expensesAmount = getExpensesMonth();

function getAccumulatedMonth () {       // Накопления за месяц доход - расход
    return money - expensesAmount;
}

accumulatedMonth = getAccumulatedMonth(); // результат в переменной нак. за мес. - расход

function getTargetMonth () {            //  достижение цели в месяцах
    let numbersOfMonths = mission / accumulatedMonth;

    if (numbersOfMonths < 0) {return 'Цель не будет достигнута!';
        } else {return Math.ceil(mission / accumulatedMonth);
        }
}

budgetDay = accumulatedMonth / 30;    // бюджет надень за минусов расходов

function showTypeOf(arg) {      
    return typeof arg;
}

function getStatusIncome (date) {
    if (date >= 1200) return 'У вас высокий уровень дохода';
    if (date > 600 && date < 1200) return 'У вас средний уровень дохода';
    if (date >=0 && date <= 600) return 'К сожалению у вас уровень дохода ниже среднего';
    if (date < 0) return 'Что то пошло не так';
}

console.log('money: ', showTypeOf(money));
console.log('income: ', showTypeOf(income));
console.log('deposit: ',showTypeOf(deposit));
console.log('Расходы за месяц: ' + expensesAmount);
console.log('Возможные расходы в виде массива: ', addExpenses.toLowerCase().split(', '));
console.log('Cрок достижения цели в месяцах: ' + getTargetMonth());    
console.log('Бжюджет на день: ' + budgetDay.toFixed(2));
console.log(getStatusIncome(budgetDay));  // статус
