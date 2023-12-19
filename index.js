#!/usr/bin/env node
const { Command } = require('commander');
const { join } = require('path');
// const { join } = require('path');

const cli = new Command();

module.exports = {
    getConfig() {
        return require(join(process.cwd(), 'poto.config.js'))
    }
}

cli.name(Object.keys(require('./package.json').bin)[0]);

require('./commands/generate')(cli)
require('./commands/init')(cli)
require('./commands/types')(cli)

cli.parse(process.argv);