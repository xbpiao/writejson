#!/user/bin/env node
'use strict';

// 测试读写json文件
const program = require('commander');
var path = require('path');
var fs = require('fs')

program
    .version(require('./package.json').version)
    .option('-f, --filename [filename]', 'create json file name.', 'test.json')
    .option('-k, --key [string]', 'add key to json file.', 'key')
    .option('-v, --value [string]', 'add value to json file.', 'value')
    .option('-c, --create', 'create file.')
    .parse(process.argv);

// 转换路径
var cuffilename = path.resolve(program.filename);
// 标识是否检查参数
var isCheckParam = true;
if ((fs.existsSync(cuffilename) === false) && (program.create === false)) {
    console.log("file not exists! [" + cuffilename + "]");
    isCheckParam = false;
}

if (program.key) {
    if (program.key.length === 0) {
        console.log("key error!");
        isCheckParam = false;
    }
}

if (isCheckParam === true) {
    var cur_json_data = {};
    if (fs.existsSync(cuffilename) === true) {
        // 读取配置
        cur_json_data = JSON.parse(fs.readFileSync(cuffilename));
    }
    cur_json_data[program.key] = program.value;
    // 写入json文件
    fs.writeFileSync(cuffilename, JSON.stringify(cur_json_data));
}