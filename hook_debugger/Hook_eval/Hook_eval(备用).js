// ==UserScript==
// @name         Hook_eval(备用)
// @namespace    http://tampermonkey.net/
// @version      2024-12-05
// @description  Bypass eval --> debugger
// @author       0xsdeo
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
    var temp_eval = eval;
    var temp_toString = Function.prototype.toString;

    Function.prototype.toString = function () {
        if (this === eval) {
            return 'function eval() { [native code] }';
        } else if (this === Function.prototype.toString) {
            return 'function toString() { [native code] }';
        }
        return temp_toString.apply(this, arguments);
    }

    let bridge_fun = function () {
        if (typeof arguments[0] == "string") {
            var temp_length = arguments[0].match(/debugger/g);
            if (temp_length != null) {
                temp_length = temp_length.length;
                var reg = /debugger/;
                while (temp_length) {
                    arguments[0] = arguments[0].replace(reg, "");
                    temp_length--;
                }
            }
        }
        return temp_eval(...arguments);
    }

    let handler = {
        apply: function (target, thisArg, argumentsList) {
            if (arguments.callee.caller != null && arguments.callee.caller.arguments.length !== 0 && typeof argumentsList[0] == "string" && argumentsList[0].indexOf('()') === -1) {
                let fun = arguments.callee.caller.toString();
                let parameter = fun.substring(fun.indexOf('(') + 1, fun.indexOf(')')).split(',');
                let temp_str = '';
                for (let i = 0; i < argumentsList.length; i++) {
                    temp_str = temp_str + argumentsList[i];
                }
                return Function(...parameter, 'return ' + temp_str)(...arguments.callee.caller.arguments);
            }
            return bridge_fun(...argumentsList);
        },
    };

    eval = new Proxy(eval, handler);
})();