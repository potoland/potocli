const { readFileSync, writeFileSync, mkdirSync } = require('fs')
const { join, dirname } = require('path')
const { getConfig } = require('../index')
const { prompters } = require('../utils')
const prompts = require('prompts')

/**
 * 
 * @param {import('commander').Command} cli 
 */
module.exports = (cli) => {
    const command = cli.command('generate')

    command.description('Generate a tiramisu component')

        .command('middleware')
        .argument('<name>', 'Name of middleware')
        .argument('[relativePath]', 'Redirects the path where the component will be created')
        .description('Create a new tiramisu middleware')
        .action(async (/**@type {string} str */name,/**@type {string?} str */relativePath) => {
            const template = readFileSync(join(__dirname, '..', 'defaults', 'middleware.ts.txt')).toString()
            const config = getConfig();

            const pathResult = join(process.cwd(), config.locations.base, 'middlewares', relativePath ?? name) + '.ts'

            const { value } = await prompts(prompters.confirm('Write in ' + pathResult))

            if (!value) return;

            console.log(`Writing in ${pathResult.split(process.cwd()).slice(1).join(process.cwd())}`)

            mkdirSync(dirname(pathResult), { recursive: true })
            writeFileSync(pathResult, template.replace(/{{name}}/gmi, name))
        })

    command.command('command')
        .argument('<name>', 'Name of command')
        .argument('[relativePath]', 'Redirects the path where the component will be created')
        .description('Create a new tiramisu command')
        .action(async (/**@type {string} str */name,/**@type {string?} str */relativePath) => {
            const template = readFileSync(join(__dirname, '..', 'defaults', 'command.ts.txt')).toString()
            const config = getConfig();

            const pathResult = join(process.cwd(), config.locations.base, config.locations.commands, relativePath ?? name) + '.ts'

            const { value } = await prompts(prompters.confirm('Write in ' + pathResult))

            if (!value) return;

            console.log(`Writing in ${pathResult.split(process.cwd()).slice(1).join(process.cwd())}`)

            mkdirSync(dirname(pathResult), { recursive: true })
            writeFileSync(pathResult, template.replace(/{{name}}/gmi, name))
        })

    command.command('subcommand')
        .argument('<name>', 'Name of subcommand')
        .argument('[relativePath]', 'Redirects the path where the component will be created')
        .description('Create a new tiramisu subcommand')
        .action(async (/**@type {string} str */name,/**@type {string?} str */relativePath) => {
            const template = readFileSync(join(__dirname, '..', 'defaults', 'subcommand.ts.txt')).toString()
            const config = getConfig();

            const pathResult = join(process.cwd(), config.locations.base, config.locations.commands, relativePath ?? name) + '.ts'

            const { value } = await prompts(prompters.confirm('Write in ' + pathResult))

            if (!value) return;

            console.log(`Writing in ${pathResult.split(process.cwd()).slice(1).join(process.cwd())}`)

            mkdirSync(dirname(pathResult), { recursive: true })
            writeFileSync(pathResult, template.replace(/{{name}}/gmi, name))
        })
}