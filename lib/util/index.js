/**
 * Created by peidan on 2017/11/9.
 */
const fs = require('fs');
const path = require('path');

var Util = {
    /**
     * 获取根目录
     */
    getRootPath() {
        return path.resolve(__dirname, '../../');
    },
    /**
     * 获取 package.json
     */
    getPkgInfo() {
        var info = {};
        try {
            info = JSON.parse(String(fs.readFileSync(path.join(this.getRootPath(), 'package.json'))));
        } catch (e) {
            console.log('  读取package.json出错！');
        }
        return info;
    },
    /**
     * 获取app.json 配置
     * */
    getAppInfo () {
        var info = {};
        try {
            info = JSON.parse(String(fs.readFileSync(path.join(this.getRootPath(), 'app.json'))));
        } catch (e) {
            console.log('  app.json出错！');
        }
        return info;
    },
    /**
     * 写入 app.json 配置
     * */
    setAppInfo (content) {
        var Path = path.join(this.getRootPath(), 'app.json');

        fs.writeFileSync(Path, JSON.stringify(content, null, 2));
    },
    /**
     * 获取配置
     */
    getConfig() {
        var configPath = path.join(this.getAthenaPath(), 'config.json');
        var config = {};
        if (this.existsSync(configPath)) {
            try {
                config = JSON.parse(String(fs.readFileSync(configPath)));
            } catch (e) {
                config = {};
            }
        }
        return config;
    },
    /**
     * 写入配置
     */
    setConfig(config) {
        var athenaPath = this.getAthenaPath();
        if (typeof config === 'object') {
            fs.writeFileSync(path.join(athenaPath, 'config.json'), JSON.stringify(config, null, 2));
        }
    }
}


module.exports = Util;