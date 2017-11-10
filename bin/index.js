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
    .command('module [moduleName]')
    .description('新建模块')
    .action((moduleName) => {

        //判断目录是否正确
        isCorrect();

        if (!moduleName) {
            console.log(chalk.red(' 请输入你的模块名称~ '));
            return program.help();
        }

        var questions = [
            {
                type: 'input',
                name: 'des',
                message: '这个页面是做什么的？'
                // default: '' //设置默认值
            }
        ];

        inquirer.prompt(questions).then((answers, input)=> {



            var pageName = 'index1';

            console.log(answers.des);
            console.log(input)

            var targetPath = path.join(process.cwd(), 'pages/');
            var Path = targetPath + pageName;

            if (fs.existsSync(path)) {
                console.log(chalk.red('该项目已存在，换个名字试试？'))
            }

            creatApp(Path, pageName)

        })

    }).on('--help', function () {
    console.log('  Examples:');
    console.log('');
    console.log('    $ sml init');
    console.log();
})

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
    console.log('    $ new page index');
    console.log('    $ new pa index');
    console.log();
});


program
    .command('*')
    .action(function () {
        console.log(chalk.red('这个命令难倒我了使用 new -h 查看帮助吧～'))
    })


program.parse(process.argv);

