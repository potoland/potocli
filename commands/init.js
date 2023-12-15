const prompts = require('prompts');
const { prompters, getVariables } = require('../utils');
const { readFile, writeFile } = require('node:fs/promises');
const { join } = require('node:path');

/**
 * 
 * @param {import('commander').Command} cli 
 */
module.exports = (cli) => {
    cli.command('init')
        .description('Init config file')
        .action(async (/**@type {string} str */str) => {
            const response = await prompts(prompters.init);
            const defaultConfig = (await readFile(join(__dirname, '..', 'defaults', 'config.js.txt'))).toString()
            const variables = getVariables(defaultConfig);
            let config = defaultConfig

            for (const variable of variables) {
                const key = variable.replace('R', '');
                const value = response[key];
                config = config.replace('{{' + variable + '}}', ['debug', 'typo'].includes(key) ? `${value}` : `'${value}'`);
            }

            await writeFile(join(process.cwd(), 'poto.config.js'), config)
        })
}
