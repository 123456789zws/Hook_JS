// ==UserScript==
// @name         hook_JSON
// @namespace    http://tampermonkey.net/
// @version      2024-10-29
// @description  Hook_JSON
// @author       0xsdeo
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var json_p = JSON.parse;
    JSON.parse = function(str){
        console.log(str);
        console.log(new Error().stack);
        console.log("-----------------------------------------------------------------------------------------------------")
        return json_p(str);
    }

    var json_s = JSON.stringify;
    JSON.stringify = function(obj){
        console.log(obj);
        console.log(new Error().stack);
        console.log("-----------------------------------------------------------------------------------------------------")
        return json_s(obj);
    }
})();