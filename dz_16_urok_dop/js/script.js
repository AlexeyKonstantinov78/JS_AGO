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
        buttomCancel = document.querySelector('#cancel'),
        depositBank = document.querySelector('.deposit-bank'),
        depositAmount = document.querySelector('.deposit-amount'),
        depositPercen = document.querySelector('.deposit-percent');
          // кнопка скрыта.

let expensesItems = document.querySelectorAll('.expenses-items'),
    inputIncomeItems = document.querySelectorAll('.income-items'),
    temp;
    
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

    saveLocalStorage(){
        const appData = {};
        appData.inputBudgetMonthValue = this.budgetMonth;
        cookie('inputBudgetMonthValue', appData.inputBudgetMonthValue);
        appData.inputBudgetDayValue = this.budgetDay.toFixed(2);
        cookie('inputBudgetDayValue', appData.inputBudgetDayValue);
        appData.inputExpensesMonthValue = this.expensesMonth;
        cookie('inputExpensesMonthValue', appData.inputExpensesMonthValue);
        appData.inputAdditionalExpensesValue = this.addExpenses.join(', ');
        cookie('inputAdditionalExpensesValue', appData.inputAdditionalExpensesValue);
        appData.inputAdditionalIncomeValue = this.addIncome.join(', ');
        cookie('inputAdditionalIncomeValue', appData.inputAdditionalIncomeValue);
        appData.inputTargetMonthValue = this.getTargetMonth();
        cookie('inputTargetMonthValue', appData.inputTargetMonthValue);
        appData.inputIncomePeriodValue = this.calcSavedMoney(); 
        cookie('inputIncomePeriodValue', appData.inputIncomePeriodValue);
        cookie('isLoad', 'true');

        localStorage.setItem('appData', JSON.stringify(appData));

        function cookie(name, value){
            const cookieData = new Date(2021, 2, 1).toGMTString();
            document.cookie = `${name} = ${value}; expires=${cookieData}`;
        };

        
        // // document.cookie = `inputBudgetMonthValue = ${appData.inputBudgetMonthValue}; 
        //                     expires=${cookieData}`;

    }
}

AppData.prototype.start = function () {
    this.budget = +inputSalaryAmount.value.replace([1-90], '');
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBudget(); // результат в переменной нак. за мес. - расход
    this.showResult();
    this.saveLocalStorage();
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
    depositBank.setAttribute("disabled", "disabled");
    depositAmount.setAttribute("disabled", "disabled");
    depositPercen.setAttribute("disabled", "disabled");
    const _this = this;
    buttomCancel.addEventListener('click', this.cansel);
};
AppData.prototype.cansel = function(){    
    localStorage.removeItem('appData');
    function cookieDel() {
    cookie('inputBudgetMonthValue', '');
    cookie('inputBudgetDayValue', '');
    cookie('inputExpensesMonthValue', '');
    cookie('inputAdditionalExpensesValue', '');
    cookie('inputAdditionalIncomeValue', '');
    cookie('inputTargetMonthValue', '');
    cookie('inputIncomePeriodValue', '');
    cookie('isLoad', '');

        function cookie(name, value){
           
            document.cookie = `${name} = ${value}; max-age=-1`;
        }
    }   
    cookieDel();
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
    depositBank.removeAttribute("disabled");
    depositAmount.removeAttribute("disabled");
    depositPercen.removeAttribute("disabled");
    inputTargetAmount.value = '';
    document.querySelector('#deposit-check').checked = false;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.showResult();
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
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositPercen.style.display = 'none';
    depositBank.value = '';
    depositAmount.value = ''; 
    depositPercen.value = '';
    this.deposit = false;
    
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
AppData.prototype.addExpensesBlock = function(){
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttomBtnPlusExpensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            buttomBtnPlusExpensesAdd.style.display = 'none';
        }
};
AppData.prototype.getExpenses = function() {
    expensesItems.forEach(function(item){
        let itemExpensses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpensses !== '' && cashExpenses !== '') {
            appData.expenses[itemExpensses] = cashExpenses;
        }
    });
};
AppData.prototype.addIncomeBlock = function() {
    const cloneIncomeItem =  inputIncomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        inputIncomeItems[0].parentNode.insertBefore(cloneIncomeItem, buttomBtnPlusIncomeAdd);
        inputIncomeItems = document.querySelectorAll('.income-items');
        if(inputIncomeItems.length === 2) {
            buttomBtnPlusIncomeAdd.style.display = 'none';
        }
};
AppData.prototype.getIncome = function() { 
    const _this = this;                                     // домашнее задание выполняет также getExpenses
    inputIncomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = +cashIncome;
        }
        
    });

    for(let key in appData.income){
        this.incomeMonth += +this.income[key]; 
    }
};
AppData.prototype.getAddExpenses = function() {
    let addExpenses = inputAdditionalexpensesitem.value.split(',');
    const _this = this;
        addExpenses.forEach(function(item){
            item = item.trim();
            if(item !== '') {
                _this.addExpenses.push(item);
            }
        });
};
AppData.prototype.getAddIncome = function(){
    const _this = this;
    AdditionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if(item.value !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};
AppData.prototype.getExpensesMonth = function getExpensesMonth () {          // обязательные расходы в месяц
    let sum = 0;
    for ( let key in this.expenses) {
        sum += +this.expenses[key];
    }
    this.expensesMonth = sum;
    return '';
};
AppData.prototype.getBudget = function getBudget () {       // Накопления за месяц доход - расход бывшая getAccumulatedMonth

const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);  
this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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
    if(this.deposit){
        this.percentDeposit = depositPercen.value;
        this.moneyDeposit = depositAmount.value;
    }
};

AppData.prototype.getPeriodAmount = function(){
periodAmount.textContent = inputPeriodSelect.value;
inputIncomePeriodValue.value = this.calcSavedMoney();
};
AppData.prototype.calcSavedMoney = function(){ 
return this.budgetMonth * inputPeriodSelect.value;
};

AppData.prototype.chengePercent = function() {
    const valueSelect = this.value;
    if(valueSelect === 'other') {
        depositPercen.style.display = 'inline-block';
        
    } else {
        depositPercen.value = valueSelect;
    }
}

AppData.prototype.depositHandler = function(){
    if(depositCheck.checked) {
        console.log('check');
        depositBank.style.display = 'inline-block';
        depositAmount.style.display = 'inline-block';
        this.deposit = true;
        depositBank.addEventListener('change', this.chengePercent);
    } else {
        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercen.style.display = 'none';
        depositBank.value = '';
        depositAmount.value = ''; 
        this.deposit = false;
        depositBank.removeEventListener('change', this.chengePercent); 
    }
}

AppData.prototype.eventsListeners = function(){
    const _this = this;
    document.addEventListener('DOMContentLoaded', function(){
        const appData = JSON.parse(localStorage.getItem('appData'));

            function getCookie(){
                let rezult = document.cookie.split(';');

                for (let key in appData){
                    let rezultat  = false;
                    console.log(key, appData[key]);

                    rezult.forEach(function(item){
                        let i = item.split('=');
                                    
                        if (key === i[0].trim()) {rezultat = true;}

                    });
                    if(rezultat === false) {return rezultat;}
                }
                
            }
        
        if(JSON.parse(localStorage.getItem('appData')) !== null) {
            inputBudgetMonthValue.value = appData.inputBudgetMonthValue;
            inputBudgetDayValue.value = appData.inputBudgetDayValue;
            inputExpensesMonthValue.value = appData.inputExpensesMonthValue;
            inputAdditionalExpensesValue.value = appData.inputAdditionalExpensesValue;
            inputAdditionalIncomeValue.value = appData.inputAdditionalIncomeValue;
            inputTargetMonthValue.value = appData.inputTargetMonthValue;
            inputIncomePeriodValue.value = appData.inputIncomePeriodValue;
            _this.reset();
        }

        if (getCookie() === false) {
            _this.cansel();
        }

        if(inputSalaryAmount.value === '') {
              buttomStart.style.display = 'none';
        } 
        
    });   
    buttomStart.addEventListener('click', this.start.bind(this));
    buttomBtnPlusExpensesAdd.addEventListener('click', this.addExpensesBlock);
    buttomBtnPlusIncomeAdd.addEventListener('click', this.addIncomeBlock);
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

    depositCheck.addEventListener('change', this.depositHandler.bind(this));
    depositAmount.addEventListener('input', function() {
        depositAmount.value = depositAmount.value.replace(/[^0-9]/,'');
    });
    depositPercen.addEventListener('input', function() {
        depositPercen.value = depositPercen.value.replace(/[^0-9]/,'');
        next:
        for( ; ; ){
            if(depositPercen.value <0 || depositPercen.value >100) {
                buttomStart.setAttribute("disabled", "disabled");
                alert('Введите правильный процент! ');
                break next;
            } else {
                buttomStart.removeAttribute("disabled");
                break;
            }
        }
    });
};


let appData = new AppData();

appData.eventsListeners();









