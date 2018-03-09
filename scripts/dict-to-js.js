// This script takes a dictionary as a command-line input and outputs
// a js file exporting the dictionary as an array of words.

const { readFileSync } = require('fs');

const dictPath = process.argv[2];

const dict = readFileSync(dictPath)
  .toString()
  .split(/\r|\n|\r\n|\n\r/)
  .filter(word => word.length >= 4)
  .map(word => `'${word}'`);

const js = `export default [${dict.join(',')}];`;

process.stdout.write(js);
