#!/usr/bin/env node

/**
 * 主入口，程序控制
 * */


const program = require('commander');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const {creatApp} = require('../lib/create/config.js');
const {isCorrect} = require('../lib/create/config.js');
const util = require('../lib/util/index.js');
const inquirer = require('inquirer');

program
    .version(util.getPkgInfo().version);

program
    .usage('[command] [options]')
    .command('page [pageName]')
    .alias('pa')
    .description('新建页面')
    .action((pageName) => {
        //判断目录是否正确
        isCorrect();

        if (!pageName) {
            console.log(chalk.red(' 请输入你的页面名称~ '));
            return program.help();
        }

        var questions = [];
        questions.push({
            type: 'input',
            name: 'tit',
            message: '这个页面叫什么？'
        });

        inquirer.prompt(questions).then((answers)=> {
            var targetPath = path.join(process.cwd(), 'pages/');
            var Path = targetPath + pageName;

            creatApp(Path, pageName, answers.tit);
        })

    }).on('--help', function () {
    console.log('  Examples:');
    console.log('');
    console.log('    $ nsp page index');
    console.log('    $ nsp pa index');
    console.log();
});


program
    .command('*')
    .action(function () {
        console.log(chalk.red('这个命令难倒我了使用 new -h 查看帮助吧～'))
    })


program.parse(process.argv);

