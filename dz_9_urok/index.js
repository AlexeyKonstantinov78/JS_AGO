'use strict';


const inputSalaryAmount = document.querySelector('.salary-amount');
const inputIncomeTitle = document.querySelector('.income-items>.income-title');
const inputIncomeAmount = document.querySelector('.income-amount');
const buttomBtnPlusIncomeAdd = document.getElementsByTagName('button')[0];
const fieldAdditionalIncomeItem0 = document.querySelectorAll('.additional_income-item')[0];
const fieldAdditionalIncomeItem1 = document.querySelectorAll('.additional_income-item')[1];
const inputExpensesTitle = document.querySelector('.expenses-items>.expenses-title');
const inputExpensesAmount = document.querySelector('.expenses-amount');
const buttomBtnPlusExpensesAdd = document.getElementsByTagName('button')[1];
const inputAdditionalexpensesitem = document.querySelector('.additional_expenses-item');
const depositCheck = document.querySelector('#deposit-check');
const inputDepositAmount = document.querySelector('.deposit-amount');
const inputDepositPercent = document.querySelector('.deposit-percent');
const inputTargetamount = document.querySelector('.target-amount');
const inputPeriodSelect = document.querySelector('.period-select');

const inputBudgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const inputBudgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const inputExpensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const inputAdditionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const inputAdditionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const inputIncomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const inputTargetMonthValue = document.getElementsByClassName('target_month-value')[0];
const buttomStart = document.querySelector('#start');
const buttomCancel = document.querySelector('#cancel');