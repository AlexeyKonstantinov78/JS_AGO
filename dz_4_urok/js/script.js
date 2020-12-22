'use strict';

let money = Number(prompt('Ваш месячный доход')); 
let income = '30000'; 
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую (пример: "Квартплата, проездной, кредит")'); 
let deposit = confirm('Есть ли у вас депозит в банке'); 
let mission = 1500000; 
let period = 12;
let budgetDay;
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = Number(prompt('Во сколько это обойдется? ' + expenses1));
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = Number(prompt('Во сколько это обойдется? ' + expenses2));
// let budgetMonth = money - amount1 - amount2; удаленно по ТЗ
let accumulatedMonth;

function getExpensesMonth () {          // обязательные расходы в месяц
    return amount1 + amount2;
}

function getAccumulatedMonth () {       // Накопления за месяц доход - расход
    return money - getExpensesMonth();
}

accumulatedMonth = getAccumulatedMonth(); // результат в переменной нак. за мес. - расход

function getTargetMonth () {            //  достижение цели в месяцах
    return mission / accumulatedMonth;
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
console.log('Расходы за месяц: ' + getExpensesMonth());
console.log('Возможные расходы в виде массива: ', addExpenses.toLowerCase().split(', '));
console.log('Cрок достижения цели в месяцах: ' + Math.ceil(getTargetMonth()));    
console.log('Бжюджет на день: ' + budgetDay.toFixed(2));
console.log(getStatusIncome(budgetDay));  // статус

// За коментированное будет удалено после проверки !!! временно необходимо для исправления в случае доработок.

// console.log('addExpenses.length: ', addExpenses.length);
// console.log('Период равен ' + period + ' месяцев');
// console.log('Цель заработать ' + mission + ' рублей');

// console.log('budgetDay: ', budgetDay);
// console.log('Бюджет на месяц: ', budgetMonth);   // перемнная удалена budgetMonth accumulatedMonth
// console.log('будет достигнута цель: ' + mission + ' ' + Math.ceil(mission / budgetMonth) + ' месяца');   // перемнная удалена budgetMonth accumulatedMonth
// budgetDay = Math.floor(budgetMonth / 30); // перемнная удалена budgetMonth accumulatedMonth
// console.log('Исправленный budgetDay: ', budgetDay);

// if (budgetDay >= 1200) console.log('У вас высокий уровень дохода');
// if (budgetDay > 600 && budgetDay < 1200) console.log('У вас средний уровень дохода');
// if (budgetDay >=0 && budgetDay <= 600) console.log('К сожалению у вас уровень дохода ниже среднего');
// if (budgetDay < 0) console.log('Что то пошло не так');



