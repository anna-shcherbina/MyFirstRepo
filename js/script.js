'use strict';

const title = document.getElementsByTagName('h1')[0];

const buttonStart = document.getElementsByClassName('handler_btn')[0];
const buttonReset = document.getElementsByClassName('handler_btn')[1];
const buttonPlus = document.querySelector('.screen-btn');

const otherItems = document.querySelectorAll('.other-items');
const otherItemsPercent = document.querySelectorAll('.percent');
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
        this.addTitle();

        inputRange.addEventListener("input", this.getRollbackValue.bind(this));
        buttonStart.addEventListener('click', this.start.bind(this)); // привязка контекста вызова в первом запускающемся методе start
        buttonPlus.addEventListener('click', this.addScreenBlock);
        buttonReset.addEventListener('click', this.reset.bind(this));
    },

    addTitle: function () {
        document.title = title.textContent;
    },

    start: function () {
        this.revise();
        if (!this.isError) {
            this.addScreens();
            this.addServices();
            this.addPrices();
            this.blocking();
            this.showResult();
        }
        console.log(this);
        console.dir(this);
    },

    resetScreens: function () {
        this.screens = [];
        this.screensCount = 0;
        this.servicesNumber = {};
        this.servicesPercent = {};

        console.log(this);
    },

    revise: function () {

        screens = document.querySelectorAll(".screen");
        this.isError = false;

        screens.forEach((screen) => {
            const select = screen.querySelector("select");
            const input = screen.querySelector("input");

            if (select.value.trim().length === 0
                || input.value.trim().length === 0) {
                this.isError = true;
                console.log('isError в функции revise: true');
            }
            select.addEventListener("change", this.revise);
        })
    },

    showResult: function () {
        inputTotal.value = this.screenPrice;
        inputTotalOther.value = this.servicePricesPercent + this.servicePricesNumber;
        inputFullCount.value = this.fullPrice;
        inputTotalCount.value = this.screensCount;
        inputCountRollback.value = this.servicePercentPrice;
    },

    clearShowResult: function () {
        this.screenPrice = 0;
        this.servicePricesPercent = 0;
        this.servicePricesNumber = 0;
        this.fullPrice = 0;
        this.servicePercentPrice = 0;
        inputTotal.value = 0;
        inputTotalOther.value = 0;
        inputFullCount.value = 0;
        inputTotalCount.value = 0;
        inputCountRollback.value = 0;
    },

    clearInputRange: function () {
        inputRange.value = 0;
        spanRangeValue.innerText = 0 + "%";
    },

    addScreens: function () {
        screens = document.querySelectorAll('.screen');

        screens.forEach((screen, index) => { //стрелочная ф-ция, чтобы контекстом вызова был appData
            const select = screen.querySelector('select'); //выбор типов экрана            
            const input = screen.querySelector('input'); //ввод кол-ва экранов
            const selectName = select.options[select.selectedIndex].textContent;
            const count = +input.value; //заносится число а не строка

            screens = document.querySelectorAll('.screen');

            this.screens.push({
                id: index,
                name: selectName,
                count: count,
                price: +select.value * +input.value
            });
        });
        console.log(this.screens);
    },

    blocking: function () {
        const elemsInput = document.querySelectorAll('div.main-controls__input input[type = text]');
        const viewsSelect = document.querySelectorAll("div.main-controls__select select[name=views-select]");
        const check = document.querySelectorAll('div.main-controls__views.element input[type=checkbox]');

        elemsInput.forEach((input) => {
            input.disabled = true;
        });

        viewsSelect.forEach((select) => {
            select.disabled = true;
        });

        check.forEach((input) => {
            input.disabled = true;
        });

        buttonPlus.disabled = true;
        buttonStart.style.display = 'none';
        buttonReset.style.display = 'inline';
    },

    addServices: function () {
        otherItemsPercent.forEach((item) => {
            const check = item.querySelector('input[type=checkbox]');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text]');

            if (check.checked) {
                this.servicesPercent[label.textContent] = +input.value;
            }
        })
        otherItemsNumber.forEach((item) => {
            const check = item.querySelector('input[type=checkbox');
            const label = item.querySelector('label');
            const input = item.querySelector('input[type=text');

            if (check.checked) {
                this.servicesNumber[label.textContent] = +input.value;
            }
        })
    },

    addScreenBlock: function () {
        const cloneScreen = screens[0].cloneNode(true);
        screens = document.querySelectorAll('.screen'); //надо обновлять коллекцию screens каждый раз перед тем, как добавить новый блок в конец, чтобы получать новую длину коллекции
        screens[screens.length - 1].after(cloneScreen);
    },

    addPrices: function () {

        for (let screen of this.screens) {
            this.screenPrice += +screen.price;
        }
        for (let screen of this.screens) {
            this.screensCount += +screen.count;
        }
        for (let key in this.servicesNumber) {
            this.servicePricesNumber += this.servicesNumber[key];
        }
        for (let key in this.servicesPercent) {
            this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
        }
        this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

        this.servicePercentPrice = (Math.ceil(this.fullPrice - (this.fullPrice * (this.rollback / 100))));
    },

    getRollbackValue: function (event) {
        spanRangeValue.textContent = event.target.value + '%';
        this.rollback = event.target.value;
    },

    reset: function () {
        this.deleteScreenBlocks();
        this.clearBlock();
        this.clearCheckbox(otherItemsPercent);
        this.clearCheckbox(otherItemsNumber);
        this.unblocking();
        this.clearInputRange();
        this.clearShowResult();
        this.resetScreens();

        console.log(this);
        console.dir(this);
    },

    unblocking: function () {
        const elemInput = document.querySelectorAll('input');
        const viewsSelect = document.querySelectorAll("div.main-controls__select select[name=views-select]");
        const check = document.querySelectorAll('div.main-controls__views.element input[type=checkbox]');

        elemInput.forEach((input) => { //поля доп.услуг со значениями по умолчанию остаются в блоке
            input.disabled = false;
        });
        viewsSelect.forEach((select) => {
            select.disabled = false;
        });
        check.forEach((input) => {
            input.disabled = false;
        });
        buttonPlus.disabled = false;
    },

    deleteScreenBlocks: function () {
        screens = document.querySelectorAll('.screen');

        screens.forEach((screen, i) => {
            if (i !== 0) {
                screen.remove();
            }
        });

        buttonStart.style.display = 'inline';
        buttonReset.style.display = 'none';
    },

    clearBlock: function () {
        const screenBlock = document.querySelector('.screen');
        screenBlock.querySelector("select").selectedIndex = 0;
        screenBlock.querySelector("input").value = "";
    },

    clearCheckbox: function (listCheckbox, checked) { //???
        listCheckbox.forEach((checkbox) => {
            checkbox.querySelector("input[type='checkbox']").checked = checked;
        });
    },
};

appData.init();