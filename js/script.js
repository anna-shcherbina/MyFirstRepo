'use strict';

const container = document.querySelectorAll('.books');
const books = document.querySelectorAll('.book');
const lists = document.querySelectorAll('ul');
const advertising = document.querySelector('.adv');
const elems = document.querySelectorAll('li');
const cloneElem = elems[25].cloneNode(true);

container[0].append(books[2]);
container[0].prepend(books[1]);
books[3].before(books[4]);
document.body.style.backgroundImage = 'url(./image/you_dont_know_js.jpg)';
advertising.remove();
books[4].childNodes[1].childNodes[1].childNodes[0].textContent = "Книга 3. this и Прототипы Объектов";
elems[10].before(elems[2]);
elems[7].before(elems[8]);
elems[8].after(elems[4]);
elems[4].after(elems[5]);
elems[47].after(elems[55]);
elems[50].after(elems[48]);
elems[53].after(elems[51]);
lists[2].append(cloneElem);
lists[2].append(elems[26]);
cloneElem.textContent = "Глава 8: За пределами ES6";

console.log(books);
console.log(lists);
console.log(elems);