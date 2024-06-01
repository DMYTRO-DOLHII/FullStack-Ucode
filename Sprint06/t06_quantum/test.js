// test.js
const normal = require('./normal');
const quantum = require('./quantum');

const time = normal.calculateTime();
console.log(`In real life you were absent for ${time.years} years, ${time.months} months, ${time.days} days.`);

const quantumTime = quantum.calculateTime();
console.log(`In quantum space you were absent for ${quantumTime[0]} years, ${quantumTime[1]} months, ${quantumTime[2]} days.`);

