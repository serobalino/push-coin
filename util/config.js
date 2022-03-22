const fs = require('fs');
const chalk = require("chalk");
const load = require('loading-cli');
const {file} = require("./en");

const printInfo = chalk.bgBlack.green;
const printError = chalk.bgBlack.bold.red;

const spinner = load({
    "text": file.loading,
    "color": "green",
    "interval": 1000,
    "frames": ["🕐 ", "🕑 ", "🕒 ", "🕓 ", "🕔 ", "🕕 ", "🕖 ", "🕗 ", "🕘 ", "🕙 ", "🕚 "]
});

function getKey(path, key) {
    let value = undefined;
    try {
        const data = fs.readFileSync(path, 'utf8').replace(/\r\n/g, '\n').split('\n').filter(i => i !== '');
        const valueArr = data.filter(j => j.includes(key));
        if (valueArr.length === 1) {
            value = valueArr[0].split(':');
            value.shift();
            value = value.join(':');
        } else {
            value = undefined;
        }
        if (value === undefined) {
            spinner.warn(file.config, key);
        }
        return value;
    } catch (err) {
        return value;
    }
}

module.exports = {getKey, printInfo, printError, spinner};
