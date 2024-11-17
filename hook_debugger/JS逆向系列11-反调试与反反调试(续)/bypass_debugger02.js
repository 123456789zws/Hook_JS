// ==UserScript==
// @name         bypass_debugger02
// @namespace    http://tampermonkey.net/
// @version      2024-11-06
// @description  bypass new Function --> debugger && constructor --> debugger
// @author       0xsdeo
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var Bypass_debugger = Function;

    Function = function () {
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] == "debugger") {
                arguments[i] = "";
            }
        }
        return Bypass_debugger(...arguments);
    }

    Function.prototype = Bypass_debugger.prototype;

    Function.prototype.constructor = function () {
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] == "debugger") {
                arguments[i] = "";
            }
        }
        return Bypass_debugger(...arguments);
    }
})();