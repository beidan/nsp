'use strict'
/*
 * 新建项目
 * */

const path = require('path');
const chalk = require('chalk');
const fs = require('fs');
const util = require('../../lib/util/index.js');


var writeFile = function (path, name, tit) {
    let basePath = path + '/' + name;
    let fileType = ['.js', '.css', '.json', '.wxml', '.wxss'];
    let appConfig = util.getAppInfo();
    appConfig.pages.push(`pages/${name}/${name}`);

    //在 app.json 中注册页面
    util.setAppInfo(appConfig);

    fileType.map((item) => {
        if (item == '.json') {
            let content = '{"navigationBarTitleText": "' + tit + '"}';
            fs.writeFile(basePath + item, content, (err)=> {
                if (err) {
                    return console.log(err);
                }
            });
        } else {
            fs.writeFile(basePath + item, '' ,(err)=> {
                if (err) {
                    return console.log(err);
                }
            });
        }
    })
}


var creatApp = function (path, name, tit) {
    //判断是否存在该目录
    if (fs.existsSync(path)) {
        console.log(chalk.red('该项目已存在，换个名字试试？'))
    } else {
        fs.mkdir(path, function (err) {
            if (err) {
                console.log(err);
                throw err;
            }
        })
        writeFile(path, name, tit)
    }
}


var isCorrect  = function () {
    var baseUrl = path.resolve(__dirname, '../../'),
        curUrl = process.cwd();


    if(baseUrl !== curUrl) {
        console.log(chalk.red('  请在根目录下进行'));
        process.exit();
    }
}


module.exports = {creatApp,isCorrect};