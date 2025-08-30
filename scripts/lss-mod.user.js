// ==UserScript==
// @name         Mein LSS Mod
// @namespace    http://tampermonkey.net/
// @version      0.2.0
// @description  Demo Mod mit Button
// @author       JJ
// @match        https://www.leitstellenspiel.de/*
// @grant        GM_xmlhttpRequest
// @connect      leitstellenspiel.de
// @connect      api.lss-manager.de
// @require      https://raw.githubusercontent.com/JJ2102/min_select_mod/main/src/logic.js
// @require      https://raw.githubusercontent.com/JJ2102/min_select_mod/main/src/ui.js
// @require      https://raw.githubusercontent.com/JJ2102/min_select_mod/main/src/main.js
// @require      https://raw.githubusercontent.com/JJ2102/min_select_mod/main/src/api.js
// @updateURL    https://raw.githubusercontent.com/JJ2102/min_select_mod/main/scripts/lss-mod.user.js
// @downloadURL  https://raw.githubusercontent.com/JJ2102/min_select_mod/main/scripts/lss-mod.user.js
// ==/UserScript==

(function () {
  "use strict";
  window.addEventListener("load", () => {
    if (typeof main === "function") {
      main();
    } else {
      console.error("main() nicht gefunden – prüfe deine Module!");
    }
  });
})();
