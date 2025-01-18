// ==UserScript==
// @name         Hook_fetch
// @namespace    https://github.com/0xsdeo/Hook_JS
// @version      2025-01-16
// @description  当通过fetch请求时会打印出传进的参数以及堆栈信息。
// @author       0xsdeo
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let temp_fetch = window.fetch;

    window.fetch = function () {
        for (let i = 0; i < arguments.length; i++) {
            console.log(arguments[i]);
        }
        console.log(new Error().stack);
        return temp_fetch(...arguments);
    }
})();