// ==UserScript==
// @name         bypass_debugger04(test_version)
// @namespace    http://tampermonkey.net/
// @version      2024-11-12
// @description  test version(Caution)
// @author       0xsdeo
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var Bypass_debugger = Function;

    function Function() {
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] == "debugger") {
                arguments[i] = "";
            }
        }
        return Bypass_debugger(...arguments);
    }

    Function.prototype = Bypass_debugger.__proto__;

    Bypass_debugger = Function.prototype.constructor;

    Function.prototype.constructor = function () {
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] == "debugger") {
                arguments[i] = "";
            }
        }
        return Bypass_debugger(...arguments);
    }
})();