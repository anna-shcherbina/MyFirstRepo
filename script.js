'use strict';

const title = prompt("Как называется ваш проект?");
const screens = prompt("Какие типы экранов нужно разработать?");
const screenPrice = +prompt("Сколько будет стоить данная работа?");
const adaptive = confirm("Нужен ли адаптив на сайте?");
const service1 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice1 = +prompt("Сколько это будет стоить?");
const service2 = prompt("Какой дополнительный тип услуги нужен?");
const servicePrice2 = +prompt("Сколько это будет стоить?");
const rollback = 10;
let allServicePrices;
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = Math.ceil(fullPrice - fullPrice * (rollback / 100));

const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
};

function getServicePercentPrices() {
    return Math.ceil(fullPrice - fullPrice * (rollback / 100))
};

servicePercentPrice = getServicePercentPrices(fullPrice, rollback);

const getRollbackMessage = function (price) {
    switch (true) {
        case price >= 30000:
            return "Даем скидку в 10%";
            break;
        case 15000 <= price && price < 30000:
            return "Даем скидку в 5%";
            break;
        case 0 <= price && price < 15000:
            return "Скидка не предусмотрена";
            break;
        default:
            return "Что то пошло не так";
    }
};

const getAllServicePrices = function (servicePrice1, servicePrice2) {
    return servicePrice1 + servicePrice2
};

allServicePrices = getAllServicePrices(servicePrice1, servicePrice2);

function getFullPrice() {
    return screenPrice + allServicePrices
};

fullPrice = getFullPrice(screenPrice, allServicePrices);

function getTitle(str) {
    if (title != str)
        return title;
    return title[0].toUpperCase() + title.slice(1);
};

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