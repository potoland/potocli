#!/usr/bin/env node
const { Command } = require('commander');
// const { join } = require('path');

const cli = new Command();

cli.name(Object.keys(require('./package.json').bin)[0]);

require('./commands/types')(cli)
require('./commands/init')(cli)
// cli.command('types')
//     .description('')
//     .argument('<path>', 'path to json')
//     .action((/**@type {string} str */str) => {
//         const json = require(join(process.cwd(), str))

//         let typeResult = "export interface __GeneratedLangType{"


//     })

cli.parse(process.argv);