/**
 * AtlantisEngine.js a lightweight JavaScript game engine.
 *
 * @module Atlantis
 * @submodule Framework
 * @namespace Atlantis.Input
 */
 
var Atlantis = window.Atlantis || {};
Atlantis.Input = Atlantis.Input || {};

Atlantis.Input.KeyboardState = (function () {
    /**
     * Define a keyboard state.
     * @class KeyboardState
     * @constructor
     */
    var keyState = function (keys) {
        this.keys = keys;
    };

    /**
	 * Determine if the key is pressed.
     * @method isKeyDown
	 * @param {Number} button The button to test.
	 * @return {Boolean} Return true if the key is pressed.
	 */
    keyState.prototype.isKeyDown = function (key) {
        return this.keys[key] == true;
    };

    /**
	 * Determine if the key is pressed.
     * @method isKeyUp
	 * @param {Number} button The button to test.
	 * @return {Boolean} Return true if the key is released.
	 */
    keyState.prototype.isKeyUp = function (key) {
        return this.keys[key] == false;
    };
})();