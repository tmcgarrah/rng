const fs = require('fs');
let randomItem = require('random-item');

let girls = fs.readFileSync('./names/girl.txt', 'utf-8').toString().toUpperCase().split('\n');
let boys = fs.readFileSync('./names/boy.txt', 'utf-8').toString().toUpperCase().split('\n');
let surnames = fs.readFileSync('./names/surname.txt', 'utf-8').toString().toUpperCase().split('\n');
let syllable = fs.readFileSync('./names/syllables.txt', 'utf-8').toString().toUpperCase().split('\n');
let words = fs.readFileSync('./names/words.txt', 'utf-8').toString().toUpperCase().split('\n');

console.log(randomItem(girls));
console.log(randomItem(boys));
console.log(randomItem(surnames));
console.log(randomItem(syllable));
console.log(randomItem(words));
