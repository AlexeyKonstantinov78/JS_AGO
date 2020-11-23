'use strict';

let money = prompt('Ваш месячный доход'); 
let income = '30000'; 
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую (пример: "Квартплата, проездной, кредит")'); 
let deposit = confirm('Есть ли у вас депозит в банке'); 
let mission = 1500000; 
let period = 12;
let budgetDay = money / 30;
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется? ' + expenses1);
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('Во сколько это обойдется? ' + expenses2);
let budgetMonth = money - amount1 - amount2;

console.log('money: ', typeof money);30
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);
console.log('addExpenses.length: ', addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log('addExpenses.toLowerCase: ', addExpenses.toLowerCase().split(', '));
console.log('budgetDay: ', budgetDay);
console.log('Бюджет на месяц: ', budgetMonth);
console.log('будет достигнута цель: ' + mission + ' ' + Math.ceil(mission / budgetMonth) + ' месяца');
budgetDay = Math.floor(budgetMonth / 30);
console.log('Исправленный budgetDay: ', budgetDay);

if (budgetDay >= 1200) console.log('У вас высокий уровень дохода');
if (budgetDay > 600 && budgetDay < 1200) console.log('У вас средний уровень дохода');
if (budgetDay >=0 && budgetDay <= 600) console.log('К сожалению у вас уровень дохода ниже среднего');
if (budgetDay < 0) console.log('Что то пошло не так');



