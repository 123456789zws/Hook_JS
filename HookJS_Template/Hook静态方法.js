// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2025-01-05
// @description  try to take over the world!
// @author       You
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // let temp_toString = Function.prototype.toString;
    //
    // Function.prototype.toString = function () {
    //     if (this === Function.prototype.toString) {
    //         return 'function toString() { [native code] }';
    //     } else if (this === xxx) { // 将xxx修改为要hook的方法
    //         return ''; // 在控制台执行xxx.toString()，将输出的内容替换掉空字符串
    //     }
    //     return temp_toString.apply(this, arguments);
    // }

    let temp_xxx = xxx; // 将xxx修改为要hook的方法，temp_xxx变量名可以根据需要进行修改命名

    xxx = function () { // 将xxx修改为要hook的方法
        // 在这里写你想让hook后的方法执行的代码
        return temp_xxx(...arguments); // 将网站js调用目标方法时所传入的内容传给原方法执行并返回结果
    }
})();