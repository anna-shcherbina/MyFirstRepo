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

    start: function () {
        appData.asking();
        appData.allServicePrices = appData.getAllServicePrices();
        appData.fullPrice = appData.getFullPrice(appData.screenPrice, appData.allServicePrices);
        appData.servicePercentPrice = appData.getServicePercentPrices(appData.fullPrice, appData.rollback);
        appData.title = appData.getTitle();
        appData.logger();
    },

    asking: function () {
        appData.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
        appData.screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные");

        do {
            appData.screenPrice = prompt("Сколько будет стоить данная работа?");

        } while (!appData.isNumber(appData.screenPrice));
        appData.screenPrice = +appData.screenPrice;

        appData.adaptive = confirm("Нужен ли адаптив на сайте?");
    },

    isNumber: function (num) {
        return (!isNaN(parseFloat(num)) && isFinite(num));
    },

    getServicePercentPrices: function (fullPrice, rollback) {
        return (Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100))));
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

    getAllServicePrices: function () {
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

            } while (!appData.isNumber(price))
            sum += +price; //если проверка на число проходит, то записываем в sum
        };

        return sum; //после 2х итераций возвращаем sum

    },

    getFullPrice: function (screenPrice, allServicePrices) {
        return appData.screenPrice + appData.allServicePrices
    },

    getTitle: function (str) {
        str = str.trim();
        return str[0].toUpperCase() + str.slice(1).toLowerCase();
    },

    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);

        for (let key in appData) {
            console.log("Ключ: " + key + " " + "Значение: " + appData[key]);
        };
    }

};

appData.start();

