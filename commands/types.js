const { writeFileSync } = require('fs')
const { join } = require('path')
const { getVariables, recursive, prompters } = require('../utils');
const { getConfig } = require('..');
const prompts = require('prompts');

/**
 * 
 * @param {import('commander').Command} cli 
 */
module.exports = (cli) => {
    cli.command('types')
        .description('Types for locales generator (AKA Black magic types inator).')
        .argument('<p>', 'name of main locale json')
        .action(async (/**@type {string} str */str) => {
            const config = getConfig();

            if (!config.locations.langs) { return console.log('Please specify langs directory in poto.config.js') }

            const localePath = join(process.cwd(), config.locations.langs, str)

            const { value } = await prompts(prompters.confirm('Read ' + localePath))

            if (!value) return;

            console.log('Reading', localePath.split(process.cwd()).slice(1).join(process.cwd()), 'to create types')
            /**@type {Record<string, object>} */
            const json = require(localePath)

            let typeResult = "export interface __LangType{"

            for (const [key, value] of Object.entries(json)) {
                for (const [k, v] of Object.entries(recursive(key, value))) {
                    /**@type {string[]} */
                    const keys = [];
                    for (const vv of getVariables(v)) {
                        keys.push(vv + ":string")
                    }
                    typeResult += "\"" + k + "\":{" + keys.join(",") + "},"
                }
            }

            typeResult += "}"
            console.log(`Writing types in node_modules`);
            writeFileSync(join(process.cwd(), 'node_modules', '@potoland', 'core', 'dist', '__generated.d.ts'), typeResult)
            console.log('Restart the IDE if you dont see any changes')
        })
}
