'use strict';

const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    service1: '',
    service2: '',
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    asking: function () {
        appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
        appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные");

        do {
            appData.screenPrice = prompt("Сколько будет стоить данная работа?");

        } while (!isNumber(appData.screenPrice));
        appData.screenPrice = +appData.screenPrice;

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    }
}

const isNumber = function (num) {
    return (!isNaN(parseFloat(num)) && isFinite(num));
};



const getServicePercentPrices = function (fullPrice, rollback) {
    return (Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100))));
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
    let price = 0;

    for (let i = 0; i < 2; i++) {

        if (i === 0) {
            appData.service1 = prompt("Какой дополнительный тип услуги нужен?");
            price = 1000;
        } else if (i === 1) {
            appData.service2 = prompt("Какой дополнительный тип услуги нужен?");
            price = 2000;
        };

        do {
            price = prompt("Сколько это будет стоить?");

        } while (!isNumber(price))
        sum += +price; //если проверка на число проходит, то записываем в sum
    };

    return sum; //после 2х итераций возвращаем sum

};

const getFullPrice = function (screenPrice, allServicePrices) {
    return appData.screenPrice + appData.allServicePrices
};

const getTitle = function (str) {
    str = str.trim();
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
};

appData.asking();
appData.allServicePrices = getAllServicePrices();
appData.fullPrice = getFullPrice(appData.screenPrice, appData.allServicePrices);
appData.servicePercentPrice = getServicePercentPrices(appData.fullPrice, appData.rollback); //все переопределения переменных - под функциями

console.log(appData.fullPrice);
console.log(appData.servicePercentPrice);