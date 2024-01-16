'use strict';

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

        /*for (let key in appData) {
            console.log("Ключ: " + key + " " + "Значение: " + appData[key]);
        };*/
    }

};

appData.start();



