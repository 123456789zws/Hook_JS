// ==UserScript==
// @name         hook_log
// @namespace    http://tampermonkey.net/
// @version      2024-12-02
// @description  Prevent overwriting log methods
// @author       0xsdeo
// @match        http://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    Object.freeze(console);
})();