'use strict';

const inputSalaryAmount = document.querySelector('.salary-amount'),
        buttomBtnPlusIncomeAdd = document.getElementsByTagName('button')[0],
        AdditionalIncomeItem = document.querySelectorAll('.additional_income-item'),    
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

let expensesItems = document.querySelectorAll('.expenses-items'),
    inputIncomeItems = document.querySelectorAll('.income-items');
    
function isNumbers(n) { 
    return !isNaN(parseFloat(n)) && isFinite(n);   // isFinite булиевый оператор проверять счисло бесконечное или нет проверка на число
}

function isString(val) {
    return isNaN(val); // && !val.trim();
}

class AppData {
    constructor(){
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.addExpenses = [];
    }
}

AppData.prototype.start = function () {
    this.budget = +inputSalaryAmount.value.replace([1-90], '');
    this.getExpInc();
    this.getExpensesMonth();
    this.getAddExpInc();
    // this.getAddExpenses();
    // this.getAddIncome();
    this.getBudget(); // результат в переменной нак. за мес. - расход
    this.showResult();
    this.reset();
};

AppData.prototype.reset = function(){
    buttomStart.style.display = 'none';
    inputSalaryAmount.setAttribute("disabled", "disabled");
    buttomBtnPlusIncomeAdd.setAttribute("disabled", "disabled");
    buttomBtnPlusExpensesAdd.setAttribute("disabled", "disabled");
    document.getElementById('cancel').style.display = 'initial';
    AdditionalIncomeItem.forEach(function(item){
        item.setAttribute("disabled", "disabled");
    });
    document.querySelectorAll('.income-title').forEach(function(item){
        item.setAttribute("disabled", "disabled");
    });
    document.querySelectorAll('.income-amount').forEach(function(item){
        item.setAttribute("disabled", "disabled");
    });
    document.querySelectorAll('.expenses-title').forEach(function(item){
        item.setAttribute("disabled", "disabled");
    });
    document.querySelectorAll('.expenses-amount').forEach(function(item){
        item.setAttribute("disabled", "disabled");
    });
    inputAdditionalexpensesitem.setAttribute("disabled", "disabled");
    inputTargetAmount.setAttribute("disabled", "disabled");
    const _this = this;
    buttomCancel.addEventListener('click', function(){
        inputSalaryAmount.removeAttribute("disabled");
        buttomBtnPlusIncomeAdd.removeAttribute("disabled");
        buttomBtnPlusExpensesAdd.removeAttribute("disabled");
        document.getElementById('cancel').style.display = 'none';
        inputSalaryAmount.value = '';
        AdditionalIncomeItem.forEach(function(item){
            item.removeAttribute("disabled");
            item.value = '';
        });
        document.querySelectorAll('.income-title').forEach(function(item){
            item.removeAttribute("disabled");
            item.value = '';
        });
        document.querySelectorAll('.income-amount').forEach(function(item){
            item.removeAttribute("disabled");
            item.value = '';
        });
        document.querySelectorAll('.expenses-title').forEach(function(item){
            item.removeAttribute("disabled");
            item.value = '';
        });
        document.querySelectorAll('.expenses-amount').forEach(function(item){
            item.removeAttribute("disabled");
            item.value = '';
        });
        inputAdditionalexpensesitem.removeAttribute("disabled");
        inputAdditionalexpensesitem.value = '';
        inputTargetAmount.removeAttribute("disabled");
        inputTargetAmount.value = '';
        document.querySelector('#deposit-check').checked = false;
        _this.income = {};
        _this.incomeMonth = 0;
        _this.addIncome = [];
        _this.expenses = {};
        _this.addExpenses = [];
        _this.deposit = false;
        _this.percentDeposit = 0;
        _this.moneyDeposit = 0;
        _this.budget = 0;
        _this.budgetDay = 0;
        _this.budgetMonth = 0;
        _this.expensesMonth = 0;
        _this.showResult();
        inputTargetMonthValue.value = '';
        inputBudgetDayValue.value = '';
        inputIncomeItems = document.querySelectorAll('.income-items');
        if(inputIncomeItems.length > 1) {            
            inputIncomeItems[1].remove();
            buttomBtnPlusIncomeAdd.style.display = '';
        }
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length > 1) {
            for (let i = expensesItems.length - 1; i > 0 ; i--) {
            expensesItems[i].remove();
            }
            buttomBtnPlusExpensesAdd.style.display = '';
        }
    });

};
AppData.prototype.showResult = function(){
    inputBudgetMonthValue.value =this.budgetMonth;
    inputBudgetDayValue.value =this.budgetDay.toFixed(2);
    inputExpensesMonthValue.value =this.expensesMonth;
    inputAdditionalExpensesValue.value =this.addExpenses.join(', ');
    inputAdditionalIncomeValue.value =this.addIncome.join(', ');
    inputTargetMonthValue.value =this.getTargetMonth();
    inputIncomePeriodValue.value =this.calcSavedMoney();
    
};

AppData.prototype.addExpIncBlock = function(){
    let item;    
    const startStr = this.className.split(' ')[1].split('_')[0];
    if (startStr === 'expenses') {item = expensesItems;}
    if (startStr === 'income') {item = inputIncomeItems;}
    const clone = item[0].cloneNode(true);
          clone.querySelector(`.${startStr}-title`).value = '';
          clone.querySelector(`.${startStr}-amount`).value = '';    
        item[0].parentNode.insertBefore(clone, this);
        item = document.querySelectorAll(`.${startStr}-items`);
        if(item.length === 3 && startStr === 'expenses') {
            buttomBtnPlusExpensesAdd.style.display = 'none';
        }
        if(item.length === 2 && startStr === 'income') {
            buttomBtnPlusIncomeAdd.style.display = 'none';
        }
};

AppData.prototype.getExpInc = function() {
    
    const count = item => {
        const startStr = item.className.split('-')[0];
        const itemTitle = item.querySelector(`.${startStr}-title`).value;
        const itemAmount = item.querySelector(`.${startStr}-amount`).value;
        if(itemTitle !== '' && itemAmount !== '') {
            this[startStr][itemTitle] = +itemAmount;
        }
    }

    inputIncomeItems.forEach(count);
    expensesItems.forEach(count);

    for(let key in appData.income){
        this.incomeMonth += +this.income[key]; 
    }
};

AppData.prototype.getAddExpInc = function() {
    const addExpenses = inputAdditionalexpensesitem.value.split(', ');
    const _this = this;

    const count = item => {
        if (item.className === 'additional_income-item')  {
            let itemValue = item.value.trim();
            if(item.value !== '') {
                _this.addIncome.push(itemValue);
            }
        } else {
            item = item.trim();
                 if(item !== '') {
                     _this.addExpenses.push(item);
                 }
        }
        
    }

    AdditionalIncomeItem.forEach(count);
    addExpenses.forEach(count);
}

AppData.prototype.getExpensesMonth = function getExpensesMonth () {          // обязательные расходы в месяц
    let sum = 0;
    for ( let key in this.expenses) {
        sum += +this.expenses[key];
    }
    this.expensesMonth = sum;
    return '';
};
AppData.prototype.getBudget = function getBudget () {       // Накопления за месяц доход - расход бывшая getAccumulatedMonth
this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
this.budgetDay = this.budget / 30;        
    return '';
};
AppData.prototype.getTargetMonth = function getTargetMonth () {            //  достижение цели в месяцах
    
let numbersOfMonths = inputTargetAmount.value / this.budgetMonth;

if (numbersOfMonths < 0) {return 'Цель не будет достигнута!';
    } else {return Math.ceil(numbersOfMonths);
    }
};
AppData.prototype.getStatusIncome = function getStatusIncome (date) {
if (date >= 1200) return 'У вас высокий уровень дохода';
if (date > 600 && date < 1200) return 'У вас средний уровень дохода';
if (date >=0 && date <= 600) return 'К сожалению у вас уровень дохода ниже среднего';
if (date < 0) return 'Что то пошло не так';
};
AppData.prototype.getInfoDeposit = function(){
let percentDeposit,
    moneyDeposit;
do{
percentDeposit = prompt('Какой годовой процент?', '10');
}
while (!isNumbers(percentDeposit));
this.percentDeposit = percentDeposit;
do {
moneyDeposit = prompt('Какая сумма залдоженна?', 10000);
}
while (!isNumbers(moneyDeposit));
this.moneyDeposit = moneyDeposit;
};
AppData.prototype.getPeriodAmount = function(){
periodAmount.textContent = inputPeriodSelect.value;
inputIncomePeriodValue.value = this.calcSavedMoney();
};
AppData.prototype.calcSavedMoney = function(){ 
return this.budgetMonth * inputPeriodSelect.value;
};
AppData.prototype.eventsListeners = function(){
    document.addEventListener('DOMContentLoaded', function(){
            if(inputSalaryAmount.value === '') {
              buttomStart.style.display = 'none';
                    
          } 
    });   
    buttomStart.addEventListener('click', this.start.bind(this));
    buttomBtnPlusExpensesAdd.addEventListener('click', this.addExpIncBlock);
    buttomBtnPlusIncomeAdd.addEventListener('click', this.addExpIncBlock);
    inputPeriodSelect.addEventListener('input', this.getPeriodAmount.bind(this));
    inputSalaryAmount.addEventListener('input', function(){
        if(inputSalaryAmount.value !== '') {
            inputSalaryAmount.value = inputSalaryAmount.value.replace(/[^0-9]/,'');
            if(inputSalaryAmount.value !== ''){
                buttomStart.style.display = '';
                }         
        } else {
            buttomStart.style.display = 'none';
        }
    });
    inputAdditionalexpensesitem.addEventListener('input', function() {
        inputAdditionalexpensesitem.value = inputAdditionalexpensesitem.value.replace(/[^А-Яа-я, ]/,'');
    });
    inputTargetAmount.addEventListener('input', function() {
        inputTargetAmount.value = inputTargetAmount.value.replace(/[^0-9]/,'');
    });
    AdditionalIncomeItem[0].addEventListener('input', function() {
        AdditionalIncomeItem[0].value = AdditionalIncomeItem[0].value.replace(/[^А-Яа-я]/,'');
    });
    AdditionalIncomeItem[1].addEventListener('input', function() {
        AdditionalIncomeItem[1].value = AdditionalIncomeItem[1].value.replace(/[^А-Яа-я]/,'');
    });
    document.querySelector('.income').addEventListener('input', function(){
        inputIncomeItems = document.querySelectorAll('.income-items');
        for (let i = 0; i < inputIncomeItems.length; i++) {
            inputIncomeItems[i].querySelector('.income-title').value = inputIncomeItems[i].querySelector('.income-title').value.replace(/[^А-Яа-я]/,'');
            inputIncomeItems[i].querySelector('.income-amount').value = inputIncomeItems[i].querySelector('.income-amount').value.replace(/[^0-9]/,'');
        }
    });
    document.querySelector('.expenses').addEventListener('input', function(){
        expensesItems = document.querySelectorAll('.expenses-items');
        for (let i = 0; i < expensesItems.length; i++) {
            expensesItems[i].querySelector('.expenses-title').value = expensesItems[i].querySelector('.expenses-title').value.replace(/[^А-Яа-я]/,'');
            expensesItems[i].querySelector('.expenses-amount').value = expensesItems[i].querySelector('.expenses-amount').value.replace(/[^0-9]/,'');
        }
    });
};

const appData = new AppData();

appData.eventsListeners();