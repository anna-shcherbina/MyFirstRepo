'use strict';

const title = document.getElementsByTagName('h1')[0];
const buttonStart = document.getElementsByClassName('handler_btn')[0];
const buttonReset = document.getElementsByClassName('handler_btn')[1];
const buttonPlus = document.querySelector('.screen-btn');
const otherItems = document.querySelectorAll('.other-items');
const otherItemsPersent = document.querySelectorAll('.percent');
const otherItemsNumber = document.querySelectorAll('.number');
const inputRange = document.querySelector("div.main-controls__item.rollback input[type=range]");
const spanRangeValue = document.querySelector("div.main-controls__item.rollback span[class=range-value]");
const inputTotal = document.getElementsByClassName("total-input")[0];
const inputTotalCount = document.getElementsByClassName("total-input")[1];
const inputTotalOther = document.getElementsByClassName("total-input")[2];
const inputFullCount = document.getElementsByClassName("total-input")[3];
const inputCountRollback = document.getElementsByClassName("total-input")[4];

let divScreens = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    adaptive: true,
    rollback: 10,
    services: {},
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,

    start: function () {
        appData.asking();
        appData.addPrices();
        appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
        appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
        appData.getTitle();
        appData.logger();
    },

    asking: function () {
        appData.title = prompt("Как называется ваш проект?");

        while (appData.isNumber(appData.title) || !appData.isString(appData.title)) {
            appData.title = prompt("Как называется ваш проект?");
        };

        console.log(typeof appData.title);

        for (let i = 0; i < 2; i++) {
            let name = prompt("Какие типы экранов нужно разработать?");
            let price = 0;

            while (appData.isNumber(name) || !appData.isString(name)) {
                name = prompt("Какие типы экранов нужно разработать?");
            };

            console.log(typeof name);

            do {
                price = prompt("Сколько будет стоить данная работа?");
            } while (!appData.isNumber(price));
            price = +price;

            console.log(typeof price);

            appData.screens.push({ id: i, name: name, price: price });
        };

        for (let i = 0; i < 2; i++) {
            let name = prompt("Какой дополнительный тип услуги нужен?");
            let price = 0;

            while (appData.isNumber(name) || !appData.isString(name)) {
                name = prompt("Какой дополнительный тип услуги нужен?");
            };

            console.log(typeof name);

            do {
                price = prompt("Сколько это будет стоить?");
            } while (!appData.isNumber(price))
            price = +price;

            appData.services[name] = +price;
            console.log(typeof price);

        };

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },

    addPrices: function () {

        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }

        for (let key in appData.services) {
            appData.allServicePrices += appData.services[key];
        }
    },

    isString: function (value) { //проверка не пропустит пробел, наж.Отмены, пробелЧисло
        return isNaN(value);
    },

    isNumber: function (num) {
        return (!isNaN(parseFloat(num)) && isFinite(num));
    },

    getServicePercentPrices: function (fullPrice, rollback) {
        appData.servicePercentPrice = (Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100))));
    },

    getRollbackMessage: function (price) {
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
    },

    getFullPrice: function (screenPrice, allServicePrices) {
        appData.fullPrice = appData.screenPrice + appData.allServicePrices
    },

    getTitle: function () {
        appData.title = appData.title.trim().toUpperCase().slice(0, 1)
            + appData.title.trim().toLowerCase().substring(1);
    },

    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
    }

};

//appData.start();

otherItemsPersent.forEach(function (items) {
    console.log(items);
});

otherItemsNumber.forEach(function (items) {
    console.log(items);
});

console.log(title);
console.log(buttonStart);
console.log(buttonReset);
console.log(buttonPlus);
console.log(otherItems);
console.log(inputRange);
console.log(spanRangeValue);
console.log(divScreens);
console.log(inputTotal);
console.log(inputTotalCount);
console.log(inputTotalOther);
console.log(inputFullCount);
console.log(inputCountRollback);





