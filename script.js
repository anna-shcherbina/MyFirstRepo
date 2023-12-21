'use strict';

//const title = "JavaScript";
//const screens = "Простые, Сложные, Интерактивные";
//const screenPrice = 1000;
const rollback = 10;
//const fullPrice = 5000;
//const adaptive = true;

alert("Hello world!");
console.log("Hello console!");

//console.log(typeof title);
//console.log(typeof fullPrice);
//console.log(typeof adaptive);
//console.log(screens.length);
//console.log("Стоимость верстки экранов = " + screenPrice + " рублей");
//console.log("Стоимость разработки сайта = " + fullPrice + " рублей");
//console.log(screens.toLowerCase().split(", "));
//console.log(fullPrice * (rollback / 100));

const title = prompt("Как называется ваш проект?");
console.log(title);

const screens = prompt("Какие типы экранов нужно разработать?");
console.log(screens);

const screenPrice = +prompt("Сколько будет стоить данная работа?");
console.log(screenPrice);

const adaptive = confirm("Нужен ли адаптив на сайте?");
console.log(adaptive);


const service1 = prompt("Какой дополнительный тип услуги нужен?");
console.log(service1);

const servicePrice1 = +prompt("Сколько это будет стоить?");
console.log(servicePrice1);

const service2 = prompt("Какой дополнительный тип услуги нужен?");
console.log(service2);

const servicePrice2 = +prompt("Сколько это будет стоить?");
console.log(servicePrice2);


const fullPrice = screenPrice + servicePrice1 + servicePrice2;
console.log(fullPrice);

const servicePercentPrice = fullPrice - fullPrice * (rollback / 100);
console.log(Math.ceil(servicePercentPrice));

switch (true) {
    case fullPrice > 30000:
        console.log("Даем скидку в 10%");
        break;
    case 15000 < fullPrice && fullPrice < 30000:
        console.log("Даем скидку в 5%");
        break;
    case 0 < fullPrice && fullPrice < 15000:
        console.log("Скидка не предусмотрена");
        break;
    default:
        console.log("Что то пошло не так");
}