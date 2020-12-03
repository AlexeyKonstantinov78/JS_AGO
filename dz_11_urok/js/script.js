'use strict';

let inputSalaryAmount = document.querySelector('.salary-amount'),
    inputIncomeItems = document.querySelectorAll('.income-items'),
    incomeTitle = inputIncomeItems[0].querySelector('.income-title'),
    buttomBtnPlusIncomeAdd = document.getElementsByTagName('button')[0],
    AdditionalIncomeItem = document.querySelectorAll('.additional_income-item'),    
    expensesItems = document.querySelectorAll('.expenses-items'),
    buttomBtnPlusExpensesAdd = document.getElementsByTagName('button')[1],
    inputAdditionalexpensesitem = document.querySelector('.additional_expenses-item'),
    depositCheck = document.querySelector('#deposit-check'),
    inputDepositAmount = document.querySelector('.deposit-amount'),    // поле ввода скрыто
    inputDepositPercent = document.querySelector('.deposit-percent'),  // поле ввода скрыто
    inputTargetAmount = document.querySelector('.target-amount'),
    inputPeriodSelect = document.querySelector('.period-select'),
    periodAmount =document.querySelector('.period-amount'),
    inputBudgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    inputBudgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    inputExpensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    inputAdditionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    inputAdditionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    inputIncomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    inputTargetMonthValue = document.getElementsByClassName('target_month-value')[0],
    buttomStart = document.querySelector('#start'),
    buttomCancel = document.querySelector('#cancel');  // кнопка скрыта.
    
function isNumbers(n) { 
    return !isNaN(parseFloat(n)) && isFinite(n);   // isFinite булиевый оператор проверять счисло бесконечное или нет проверка на число
}

function isString(val) {
    return isNaN(val); // && !val.trim();
}

let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    start: function start() {

        appData.budget = +inputSalaryAmount.value.replace([1-90], '');
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget(); // результат в переменной нак. за мес. - расход
        appData.showResult();
    },
    showResult: function(){
        inputBudgetMonthValue.value = appData.budgetMonth;
        inputBudgetDayValue.value = appData.budgetDay.toFixed(2);
        inputExpensesMonthValue.value = appData.expensesMonth;
        inputAdditionalExpensesValue.value = appData.addExpenses.join(', ');
        inputAdditionalIncomeValue.value = appData.addIncome.join(', ');
        inputTargetMonthValue.value = appData.getTargetMonth();
        inputIncomePeriodValue.value = appData.calcSavedMoney();

    },
    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
            cloneExpensesItem.querySelector('.expenses-title').value = '';
            cloneExpensesItem.querySelector('.expenses-amount').value = '';
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttomBtnPlusExpensesAdd);
            expensesItems = document.querySelectorAll('.expenses-items');
            if(expensesItems.length === 3) {
                buttomBtnPlusExpensesAdd.style.display = 'none';
            }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
            let itemExpensses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpensses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpensses] = cashExpenses;
            }
        });
    },
    addIncomeBlock: function() {
        let cloneIncomeItem =  inputIncomeItems[0].cloneNode(true);
            cloneIncomeItem.querySelector('.income-title').value = '';
            cloneIncomeItem.querySelector('.income-amount').value = '';
            inputIncomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttomBtnPlusIncomeAdd);
            inputIncomeItems = document.querySelectorAll('.income-items');
            if(inputIncomeItems.length === 2) {
                buttomBtnPlusIncomeAdd.style.display = 'none';
            }
    },
    getIncome: function() {                                      // домашнее задание выполняет также getExpenses
        inputIncomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;
            }
            
        });

        for(let key in appData.income){
            appData.incomeMonth += +appData.income[key]; 
        }
    },
    getAddExpenses: function() {
        let addExpenses = inputAdditionalexpensesitem.value.split(',');
            addExpenses.forEach(function(item){
                item = item.trim();
                if(item !== '') {
                    appData.addExpenses.push(item);
                }
            });
    },
    getAddIncome: function(){
        AdditionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if(item.value !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    budget: 0,
    budgetDay: 0, 
    budgetMonth: 0,
    expensesMonth: 0,
    getExpensesMonth: function getExpensesMonth () {          // обязательные расходы в месяц
            let sum = 0;
        
            for ( let key in appData.expenses) {
                sum += +appData.expenses[key];
            }
            appData.expensesMonth = sum;
            return '';
    },
    getBudget: function getBudget () {       // Накопления за месяц доход - расход бывшая getAccumulatedMonth

        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = appData.budget / 30;        
            return '';
    },
    getTargetMonth: function getTargetMonth () {            //  достижение цели в месяцах
        let numbersOfMonths = inputTargetAmount.value / appData.budgetMonth;
    
        if (numbersOfMonths < 0) {return 'Цель не будет достигнута!';
            } else {return Math.ceil(numbersOfMonths);
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
    getPeriodAmount: function(){
        periodAmount.textContent = inputPeriodSelect.value;
        inputIncomePeriodValue.value = appData.calcSavedMoney();
    },
    calcSavedMoney: function(){                             // calcPeriod
        return appData.budgetMonth * inputPeriodSelect.value;
    }
}

document.addEventListener('DOMContentLoaded', function(){
    if(inputSalaryAmount.value === '') {
          buttomStart.style.display = 'none';
                
      } 
});   

buttomStart.addEventListener('click', appData.start);

buttomBtnPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock);

buttomBtnPlusIncomeAdd.addEventListener('click', appData.addIncomeBlock);

inputPeriodSelect.addEventListener('input', appData.getPeriodAmount);

inputSalaryAmount.addEventListener('input', function(){
    if(inputSalaryAmount.value !== '') {
        buttomStart.style.display = '';
        // console.log(inputSalaryAmount.value.replace(/[^1-9]/i, ''));
    } else {
        buttomStart.style.display = 'none';
    }
});

incomeTitle.addEventListener('input', function() {
    incomeTitle.value = incomeTitle.value.replace(/[^а-я]/,'');
})



