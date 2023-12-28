'use strict';

let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 10;
let service1;
let service2;
let allServicePrices;
let fullPrice;
let servicePercentPrice;

const isNumber = function (num) {
    return (!isNaN(parseFloat(num)) && isFinite(num));
};

const asking = function () {
    title = prompt("Как называется ваш проект?", "Калькулятор верстки");
    screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные");

    do {
        screenPrice = +prompt("Сколько будет стоить данная работа?");

    } while (!isNumber(screenPrice));

    adaptive = confirm("Нужен ли адаптив на сайте?");
};

const getServicePercentPrices = function (fullPrice, rollback) {
    return fullPrice - (fullPrice * (rollback / 100));
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
            return "Что-то пошло не так";
    }
};

const getAllServicePrices = function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {

        if (i === 0) {
            service1 = prompt("Какой дополнительный тип услуги нужен?");
        } else if (i === 1) {
            service2 = prompt("Какой дополнительный тип услуги нужен?");
        };

        do {
            sum += +prompt("Сколько это будет стоить?");
        }
        while (sum === !isNumber(sum));

    };

    return sum;

};


const showTypeOf = function (variable) {
    console.log(variable, typeof variable);
};

const getFullPrice = function (screenPrice, allServicePrices) {
    return screenPrice + allServicePrices
};

const getTitle = function (str) {
    if (str != str) {
        return str;
    }
    str = str.trim();
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice(screenPrice, allServicePrices);
servicePercentPrice = getServicePercentPrices(fullPrice, rollback); //все переопределения переменных - под функциями

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("allServicePrices", allServicePrices);

console.log(getTitle(title));
console.log(getRollbackMessage(fullPrice));
console.log(typeof title);
console.log(typeof screenPrice);
console.log(typeof adaptive);

console.log(screens);
console.log(servicePercentPrice);

console.log("Стоимость верстки экранов " + screenPrice + " руб.", "Стоимость разработки сайта " + fullPrice + " руб.");