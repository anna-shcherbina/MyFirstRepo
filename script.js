'use strict';

let title = prompt("Как называется ваш проект?");
const screens = prompt("Какие типы экранов нужно разработать?");
const screenPrice = +prompt("Сколько будет стоить данная работа?");
const adaptive = confirm("Нужен ли адаптив на сайте?");
const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?");
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?");
const rollback = 10;
let allServicePrices;
let fullPrice;
let servicePercentPrice;

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
};

function getServicePercentPrices(fullPrice, rollback) {
    return Math.ceil(fullPrice - fullPrice * (rollback / 100))
};

const getRollbackMessage = function (price) {
    switch (true) {
        case price >= 30000:
            return "Даем скидку в 10%";
        case 15000 <= price && price < 30000:
            return "Даем скидку в 5%";
        case 0 <= price && price < 15000:
            return "Скидка не предусмотрена";
        default:
            return "Что то пошло не так";
    }
};

const getAllServicePrices = function (servicePrice1, servicePrice2) {
    return servicePrice1 + servicePrice2
};

function getFullPrice(screenPrice, allServicePrices) {
    return screenPrice + allServicePrices
};

const getTitle = function (str) {
    if (str != str) {
        return str;
    }
    str = str.trim();
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback); //все переопределения переменных - под функциями

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(getTitle(title));
console.log(getRollbackMessage(fullPrice));

console.log(typeof title);
console.log(typeof screenPrice);
console.log(typeof adaptive);

console.log(screens);
console.log(servicePercentPrice);