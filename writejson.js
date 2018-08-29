#!/user/bin/env node
'use strict';

// 测试读写json文件
const program = require('commander');
var path = require('path');
var fs = require('fs')
var urlencode = require('urlencode');

program
    .version(require('./package.json').version)
    .option('-f, --filename [filename]', 'create json file name.', 'test.json')
    .option('-k, --key [string]', 'add key to json file.', 'key')
    .option('-v, --value [string]', 'add value to json file.', 'value')
    .option('-c, --create', 'create file.')
    .option('-u, --urlencode [string]', 'encode. utf8,gbk', 'no_encode')
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
    var cur_encode = 'utf8';
    if (program.urlencode) {
        cur_encode = program.urlencode;
        if ("no_encode" === cur_encode) {
            cur_encode = "";
        }
    } 
    if (cur_encode === "") {
        cur_json_data[program.key] = program.value, cur_encode;
    } else {
        cur_json_data[program.key] = urlencode(program.value, cur_encode);
    }
    
    // 写入json文件
    fs.writeFileSync(cuffilename, JSON.stringify(cur_json_data));
}