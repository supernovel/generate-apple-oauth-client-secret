const path = require('path');
const fs = require('fs').promises;
const jwt = require('jsonwebtoken');
const inquirer = require('inquirer');

inquirer
    .prompt([
        {
            name: 'keypath',
            type: 'input',
            default: './key.txt'
        },
        {
            name: 'teamid',
            type: 'input'
        },
        {
            name: 'clientid',
            type: 'input'
        },
        {
            name: 'keyid',
            type: 'input'
        },
    ])
    .then(async (answers) => {
        console.log('test');

        const keyFile = await fs.readFile(path.resolve(answers.keypath));
        const now = Math.floor(Date.now() / 1000);
    
        console.log(jwt.sign({
            'iss': answers.teamid,
            'iat': now,
            'exp': now + 86400 * 180,
            'aud': 'https://appleid.apple.com',
            'sub': answers.clientid,
        }, keyFile, {
            algorithm: 'ES256',
            keyid: answers.keyid
        }))
    });
