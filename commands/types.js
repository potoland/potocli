const { writeFileSync } = require('fs')
const { join } = require('path')
const { getVariables, recursive } = require('../utils');

/**
 * 
 * @param {import('commander').Command} cli 
 */
module.exports = (cli) => {
    cli.command('types')
        .description('Aidjslhkadjkhjadkahsdjkhsadkdb.')
        .argument('<path>', 'path to json')
        .action((/**@type {string} str */str) => {
            console.log('Reading', join(process.cwd(), str), 'to create types')
            /**@type {Record<string, object>} */
            const json = require(join(process.cwd(), str))

            let typeResult = "export interface __LangType{"

            for (const [key, value] of Object.entries(json)) {
                for (const [k, v] of Object.entries(recursive(key, value))) {
                    /**@type {string[]} */
                    const keys = [];
                    for (const [, vv] of getVariables(v)) {
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
