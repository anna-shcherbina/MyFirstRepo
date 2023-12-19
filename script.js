let title = "JavaScript";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 1000;
let rollback = 10;
let fullPrice = 5000;
let adaptive = true;

alert("Hello world!");
console.log("Hello console!");

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log("Стоимость верстки экранов = " + screenPrice + " рублей");
console.log("Стоимость разработки сайта = " + fullPrice + " рублей");
console.log(screens.toLowerCase().split(", "));
console.log(fullPrice * (rollback / 100));