/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis.Input
 */
 
var Atlantis = window.Atlantis || {};
Atlantis.Input = Atlantis.Input || {};

/** 
* Keys alias
* @property Keys
*/
Atlantis.Keys = {
    up: 38, down: 40, left: 37, right: 39,
    space: 32, escape: 27
};

Atlantis.Input.KeyboardManager = (function () {
    var _instance = null;

    /**
    * A keyboard input manager.
    * @constructor
    * @class KeyboardManager
    */
    var keyboardManager = function (maxKeys) {
        this.keys = [];
        this.maxKeys = maxKeys || 110;

        for (var i = 0; i < maxKeys; i++) {
            this.keys[i] = false;
        }

        this.preventDefault = true;
        _instance = this;
    };

    /**
    * Initialize keyboard event handlers.
    * @method initialize
    */
    keyboardManager.prototype.initialize = function () {
        document.addEventListener("keydown", this.onKeyStateChange, false);
        document.addEventListener("keyup", this.onKeyStateChange, false);
    };

    /**
     * Gets the current state of the keyboard.
     * @method getState
     * @return {Atlantis.KeyboardState} Return the state of the keyboard.
     */
    keyboardManager.prototype.getState = function () {
        return new Atlantis.KeyboardState(this.keys);
    };

    /**
    * Event handler - Function called on keyboard event.
    * @method onKeyStateChange
    * @param {Object} event The event object.
    * @param {Object} instance The current instance.
    */
    keyboardManager.prototype.onKeyStateChange = function (event) {
        if (_instance.preventDefault) {
            event.preventDefault();
        }

        _instance.keys[event.keyCode] = (event.type == "keydown") ? true : false;
    };

    return keyboardManager;
})();