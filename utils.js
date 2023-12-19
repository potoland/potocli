/**
 * 
 * @param {string} key 
 * @param {any} object 
 * @returns {Record<string, Object>}
 */
function recursive(key, object) {
    const result = {}
    switch (typeof object) {
        case 'string':
            result[key] = object
            break
        case 'object':
            for (let [k, v] of Object.entries(object)) {
                const obj = recursive(key + '.' + k, v)
                for (let [kObj, vObj] of Object.entries(obj)) {
                    result[kObj] = vObj
                }
            }
            break;
    }

    return result
}

/**
* @param {string} str
* @returns {string[]}
*/
function getVariables(str) {
    return (str.match(/{{(.*?)}}/gi) ?? []).map(x => x.slice(2, -2));
}

/**
 * @type {Record<string, (...x:any[])=>import('prompts').PromptObject[]>}
 */
const prompters = {
    init: () =>
        [{
            type: 'select',
            name: 'typo',
            message: 'What type of client will you use?',
            choices: [
                {
                    title: 'Gateway', value: 'bot'
                },
                {
                    title: 'HTTP', value: 'http',
                }
            ],
        },
        {
            type: 'text',
            name: 'base',
            message: 'Your base directory',
            initial: 'src'
        },
        {
            type: 'text',
            name: 'output',
            message: 'Your output directory',
            initial: 'dist'
        }, {
            type: 'text',
            name: 'commands',
            message: 'Your commands directory',
            initial: 'commands',
        },
        {
            type: prev => prev && 'toggle',
            name: 'debug',
            message: 'Do you want to start in debug mode?',
            active: 'Yes',
            inactive: 'No'
        }],
    /**
     * 
     * @param {string} message yes
     * @returns 
     */
    confirm: (message) => {
        return [{
            type: 'confirm',
            name: 'value',
            message,
            initial: true
        }
        ]
    }
}

module.exports = { getVariables, recursive, prompters };