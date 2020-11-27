'use strict';

function start() {
    
    do{                                                                         
        money = prompt('Ваш месячный доход');
    }    
    while (!isNumbers(money));
}

let money, 
    budgetDay,
    accumulatedMonth,
    expensesAmount;
    
function isNumbers(n) { 
    return !isNaN(parseFloat(n)) && isFinite(n);   // isFinite булиевый оператор проверять счисло бесконечное или нет
}

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: [],
    addExpenses: [],
    deposit: false,
    mission: 1500000,
    period: 12,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую (пример: "Квартплата, проездной, кредит")'); 
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appaData.deposit = confirm('Есть ли у вас депозит в банке'); 
    }
}

function getExpensesMonth () {          // обязательные расходы в месяц
    let sum = 0, mon;

    for (let i = 0; i < 2; i++) {
                
        appData.expenses[i] =  prompt('Введите обязательную статью расходов?'); 

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
    let numbersOfMonths = appData.mission / accumulatedMonth;

    if (numbersOfMonths < 0) {return 'Цель не будет достигнута!';
        } else {return Math.ceil(appData.mission / accumulatedMonth);
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
console.log('income: ', showTypeOf(appData.income));
console.log('deposit: ',showTypeOf(appData.deposit));
console.log('Расходы за месяц: ' + expensesAmount);
// console.log('Возможные расходы в виде массива: ', addExpenses.toLowerCase().split(', '));
console.log('Cрок достижения цели в месяцах: ' + getTargetMonth());    
console.log('Бжюджет на день: ' + budgetDay.toFixed(2));
console.log(getStatusIncome(budgetDay));  // статус
