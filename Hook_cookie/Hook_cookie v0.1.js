// ==UserScript==
// @name         Hook_cookie v0.1
// @namespace    https://github.com/0xsdeo/Hook_JS
// @version      2024-11-28
// @description  set cookie -> log stack and cookie
// @author       0xsdeo
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    document.temp_cookie = document.cookie;

    Object.defineProperty(document, "cookie", {
        get: function () {
            return document.temp_cookie;
        },
        set: function (cookie) {
            console.log(cookie);
            console.log(new Error().stack);
            let key_arr = [];
            let val_arr = [];

            if (cookie.split('=').length > 2) {
                var temp_k = cookie.split('=')[0];
                var temp_val = cookie.substring(cookie.indexOf("=") + 1, cookie.indexOf(";"));
                key_arr.push(temp_k);
                val_arr.push(temp_val);
            }

            if (!(document.temp_cookie === '')) {
                document.temp_cookie.split('; ').forEach(function (key) {
                    let k = key.split('=')[0];
                    let val = key.split('=')[1];
                    if (typeof temp_k != 'undefined' && temp_k === k) {
                    } else {
                        key_arr.push(k);
                        val_arr.push(val);
                    }
                })
                document.temp_cookie = '';
            }

            if (!(cookie.split('=').length > 2)) {
                if (key_arr.length === 0) {
                    key_arr.push(cookie.split('=')[0]);
                    val_arr.push(cookie.split('=')[1]);
                } else {
                    for (let i = 0; i < key_arr.length; i++) {
                        if (key_arr[i] === cookie.split('=')[0]) {
                            val_arr[i] = cookie.split('=')[1];
                            break;
                        } else if (i === key_arr.length - 1) {
                            key_arr.push(cookie.split('=')[0]);
                            val_arr.push(cookie.split('=')[1]);
                            break;
                        }
                    }
                }
            }

            for (let i = 0; i < key_arr.length; i++) {
                if (i === key_arr.length - 1) {
                    document.temp_cookie = document.temp_cookie + key_arr[i] + '=' + val_arr[i];
                } else {
                    document.temp_cookie = document.temp_cookie + key_arr[i] + '=' + val_arr[i] + '; ';
                }
            }
        }
    });
})();