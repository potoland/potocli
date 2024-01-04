const prompts = require('prompts');
const { prompters, getVariables } = require('../utils');
const { readFile, writeFile } = require('node:fs/promises');
const { join } = require('node:path');

const format = {
    'commonjs': {
        import: `require('dotenv/config');
const { config } = require('@potoland/core');`,
        export: `module.exports = `
    },
    'module': {
        import: `import 'dotenv/config;
import { config } from '@potoland/core';`,
        export: `export default `
    }
}

/**
 * 
 * @param {import('commander').Command} cli 
 */
module.exports = (cli) => {
    cli.command('init')
        .description('Init config file')
        .action(async (/**@type {string} str */str) => {
            const response = await prompts(prompters.init());
            const defaultConfig = (await readFile(join(__dirname, '..', 'defaults', 'config.js.txt'))).toString();
            const variables = getVariables(defaultConfig);

            let moduleType = 'commonjs';

            try {
                moduleType = require(join(process.cwd(), 'package.json')).type ?? 'commonjs';
            } catch {
                // 418
            };

            response['importFormat'] = format[moduleType].import;
            response['exportFormat'] = format[moduleType].export;

            let config = defaultConfig

            for (const variable of variables) {
                const key = variable.replace('R', '');
                const value = response[key];
                config = config.replace('{{' + variable + '}}', ['debug', 'typo', 'exportFormat', 'importFormat'].includes(key) ? `${value}` : `'${value}'`);
            }

            await writeFile(join(process.cwd(), 'poto.config.js'), config)
        })
}