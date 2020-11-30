'use strict';

function start() {
    do{                                                                         
        money = prompt('Ваш месячный доход', 30000);
    }    
    while (!isNumbers(money));
}

let money; 
    
function isNumbers(n) { 
    return !isNaN(parseFloat(n)) && isFinite(n);   // isFinite булиевый оператор проверять счисло бесконечное или нет проверка на число
}

function isString(val) {
    return isNaN(val); // && !val.trim();
}

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 1500000,
    period: 12,
    asking: function() {

        if (confirm('Есть ли у вас дополнительный заработок?')){
            let itemIncome,
                cashIncome;
            
            do {
                itemIncome = prompt('Какой есть дополнительный заработок?', 'Такси');
            }
            while(!isString(itemIncome));
            
            do {
            cashIncome = prompt('Сколько в месяц зарабатываете?', 10000);
            }
            while (!isNumbers(cashIncome))
            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую (пример: "Квартплата, проездной, кредит")', "Квартплата, проездной, кредит"); 
            appData.addExpenses = addExpenses.toLowerCase().split(', ');
            appData.deposit = confirm('Есть ли у вас депозит в банке'); 
        
        let mon,
            expenses1 = [];

            for (let i = 0; i < 2; i++) {

                do{
                expenses1 = prompt('Введите обязательную статью расходов?'); 
                }
                while (!isString(expenses1));
        
                do {
                    mon = Number(prompt('Во сколько это обойдется?'));
                }
                while (!isNumbers(mon));
                
                appData.expenses[expenses1] = mon;
            }
    },
    budget: {},
    budgetDay: 0, 
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function getExpensesMonth () {          // обязательные расходы в месяц
            let sum = 0;
        
            for ( let key in appData.expenses) {
                // console.log(appData.expenses[key]);
                sum += appData.expenses[key];
            }
            appData.expensesMonth = sum;
            return '';
    },
    getBudget: function getBudget () {       // Накопления за месяц доход - расход бывшая getAccumulatedMonth

        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = appData.budget / 30;        
            return '';
    },
    getTargetMonth: function getTargetMonth () {            //  достижение цели в месяцах
        let numbersOfMonths = appData.mission / appData.budgetMonth;
    
        if (numbersOfMonths < 0) {return 'Цель не будет достигнута!';
            } else {return Math.ceil(appData.mission / appData.budgetMonth);
            }
    },
    getStatusIncome: function getStatusIncome (date) {
        if (date >= 1200) return 'У вас высокий уровень дохода';
        if (date > 600 && date < 1200) return 'У вас средний уровень дохода';
        if (date >=0 && date <= 600) return 'К сожалению у вас уровень дохода ниже среднего';
        if (date < 0) return 'Что то пошло не так';
    },
    getInfoDeposit: function(){
        let percentDeposit,
        moneyDeposit;
        do{
        percentDeposit = prompt('Какой годовой процент?', '10');
        }
        while (!isNumbers(percentDeposit));
        appData.percentDeposit = appData.percentDeposit;
        do {
        moneyDeposit = prompt('Какая сумма залдоженна?', 10000);
        }
        while (!isNumbers(moneyDeposit));
        appData.moneyDeposit = moneyDeposit;
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }
}

appData.asking();

appData.budget = Number(money);

appData.getExpensesMonth();

appData.getBudget(); // результат в переменной нак. за мес. - расход

// budgetDay = accumulatedMonth / 30;    // бюджет надень за минусов расходов

console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log('Cрок достижения цели в месяцах: ' + appData.getTargetMonth());    
console.log('Бжюджет на день: ' + appData.budgetDay.toFixed(2));
console.log(appData.getStatusIncome(appData.budgetDay));  // статус
console.log(appData);

console.log('Наша программа включает в себя данные: ');
for ( let key in appData) {
    console.log(key + ' ' + appData[key]);
}
appData.getInfoDeposit();

// console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney);

// for (let i = 0; i< appData.addExpenses.length; i++) {
//     let mapTemp = [];
//         mapTemp = appData.addExpenses[i].toUpperCase;
//         console.log(mapTemp[i]);
// }

console.log(appData.addExpenses.map(n => `${n[0].toUpperCase()}${n.slice(1)}`).join(', ')); // join(', ').toLocaleUpperCase());
