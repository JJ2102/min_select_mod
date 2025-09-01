// ==UserScript==
// @name         Mein LSS Mod
// @namespace    http://tampermonkey.net/
// @version      1.0.5
// @description  Demo Mod mit Button
// @author       JJ
// @match        https://www.leitstellenspiel.de/*
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @connect      leitstellenspiel.de
// @connect      api.lss-manager.de
// @resource     additionalToId https://raw.githubusercontent.com/JJ2102/min_select_mod/main/json/additional_to_id.json
// @resource     requirementsToId https://raw.githubusercontent.com/JJ2102/min_select_mod/main/json/requirements_to_id.json
// @resource     onofToId https://raw.githubusercontent.com/JJ2102/min_select_mod/main/json/oneof_to_id.json
// @resource     VehicleId https://raw.githubusercontent.com/JJ2102/min_select_mod/main/json/Vehicle_id.json
// @require      https://raw.githubusercontent.com/JJ2102/min_select_mod/main/src/main.js
// @require      https://raw.githubusercontent.com/JJ2102/min_select_mod/main/src/logic.js
// @require      https://raw.githubusercontent.com/JJ2102/min_select_mod/main/src/ui.js
// @require      https://raw.githubusercontent.com/JJ2102/min_select_mod/main/src/api.js
// @require      https://raw.githubusercontent.com/JJ2102/min_select_mod/main/src/handleOperation.js
// @updateURL    https://raw.githubusercontent.com/JJ2102/min_select_mod/main/scripts/lss-mod.user.js
// @downloadURL  https://raw.githubusercontent.com/JJ2102/min_select_mod/main/scripts/lss-mod.user.js
// ==/UserScript==

(function () {
  "use strict";
  window.addEventListener("load", () => {
    if (typeof main === "function") {
      main();
    } else {
      console.error("main() nicht gefunden - prüfe deine Module!");
    }
  });
})();
