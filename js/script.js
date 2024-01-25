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

let screens = document.querySelectorAll('.screen');

const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    screensCount: 0,
    isError: true,
    adaptive: true,
    rollback: 0,
    servicesPercent: {},
    servicesNumber: {},
    servicePricesPercent: 0,
    servicePricesNumber: 0,
    fullPrice: 0,
    servicePercentPrice: 0,

    init: function () {
        appData.addTitle();
        inputRange.addEventListener("input", appData.getRollbackValue);
        buttonStart.addEventListener('click', appData.start);
        buttonPlus.addEventListener('click', appData.addScreenBlock);
    },

    addTitle: function () {
        document.title = title.textContent;
    },

    start: function () {
        appData.revise();
        if (!appData.isError) {
            appData.addScreens();
            appData.addServices();
            appData.addPrices();
            //appData.logger();
            appData.showResult();
        }
        console.log(appData);
    },

    revise: function () {

        screens = document.querySelectorAll(".screen");
        appData.isError = false;

        screens.forEach(function (screen) {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");

            if (select.value.trim().length === 0
                || input.value.trim().length === 0) {
                appData.isError = true;
                console.log('isError в функции revise: true');
            }
            select.addEventListener("change", appData.revise);
        })
    },

    showResult: function () {
        //alert('showResult');
        inputTotal.value = appData.screenPrice;
        inputTotalOther.value = appData.servicePricesPercent + appData.servicePricesNumber;
        inputFullCount.value = appData.fullPrice;
        inputTotalCount.value = appData.screensCount;
        inputCountRollback.value = appData.servicePercentPrice;
    },

    addScreens: function () {
        screens = document.querySelectorAll('.screen');

        screens.forEach(function (screen, index) {
            const select = screen.querySelector('select'); //выбор типов экрана
            const input = screen.querySelector('input'); //ввод кол-ва экранов
            const selectName = select.options[select.selectedIndex].textContent; // текcт 
            const count = +input.value; //заносится число а не строка

            screens = document.querySelectorAll('.screen');
            appData.screens.push({
                id: index,
                name: selectName,
                count: count,
                price: +select.value * +input.value
            });

        })
        console.log(appData.screens);

    },

    addServices: function () {
        otherItemsPersent.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text');

            if (check.checked) {
                appData.servicesPercent[label.textContent] = +input.value;
            }
        })
        otherItemsNumber.forEach(function (item) {
            const check = item.querySelector('input[type=checkbox');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text');

            if (check.checked) {
                appData.servicesNumber[label.textContent] = +input.value;
            }
        })
    },

    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);
        screens = document.querySelectorAll('.screen'); //нам надо обновлять коллекцию screens каждый раз перед тем, как добавить новый блок в конец, чтобы получать новую длину коллекции
        screens[screens.length - 1].after(cloneScreen);

    },

    addPrices: function () {

        for (let screen of appData.screens) {
            appData.screenPrice += +screen.price;
        }

        for (let screen of appData.screens) {
            appData.screensCount += +screen.count;
        }

        for (let key in appData.servicesNumber) {
            appData.servicePricesNumber += appData.servicesNumber[key];
        }

        for (let key in appData.servicesPercent) {
            appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100);
        }

        appData.fullPrice = +appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent;

        appData.servicePercentPrice = (Math.ceil(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100))));

    },

    getRollbackValue: function (event) {
        spanRangeValue.textContent = event.target.value + '%';
        appData.rollback = event.target.value;
    },

    logger: function () {
        console.log(appData.fullPrice);
        console.log(appData.servicePercentPrice);
        console.log(appData.screens);
    }

};

appData.init();