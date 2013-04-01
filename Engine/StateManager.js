var Atlantis = window.Atlantis || {};

Atlantis.State = (function() {
    /**
     * Define a base state class
     */
    var state = function(name) {
        this.name = name;
    	this.active = true;
        this.stateManager = null;
        this.initialized = false;
        this.scene = new Atlantis.SpriteGroup(); 
    };
    
    state.prototype.loadContent = function (contentManager) {
        this.scene.loadContent(contentManager);
        this.scene.initialize();
        this.initialized = true;
    };

    state.prototype.update = function (gameTime) {
        this.scene.update(gameTime);
    };

    state.prototype.draw = function (gameTime, context) { 
        this.scene.draw(gameTime, context);
    };

    return state;
})();

Atlantis.StateManager = (function () {
    /*
    * The State Manager
    */
    var stateManager = function (game) {
        Atlantis.DrawableGameComponent.call(this, game);
        this.states = [];
        this.initialized = false;
    };

    stateManager.prototype = new Atlantis.DrawableGameComponent();

    //
    // Game state pattern
    //

    stateManager.prototype.loadContent = function (content) {
        for (var i = 0, l = this.states.length; i < l; i++) {
            this.states[i].loadContent(content);
            this.initialized = true;
        }
    };

    stateManager.prototype.update = function (gameTime) {
        for (var i = 0, l = this.states.length; i < l; i++) {
            if (this.states[i].active) {
                this.states[i].update(gameTime);
            }
        }
    };

    stateManager.prototype.draw = function (gameTime, context) {
        for (var i = 0, l = this.states.length; i < l; i++) {
            if (this.states[i].active) {
                this.states[i].draw(gameTime, context);
            }
        }
    };

    // 
    // StateManager methods
    //

    stateManager.prototype.setStateActive = function (stateParam, disableOtherStates) {

        if (typeof (disableOtherStates) != "undefined" && disableOtherStates == true) {
            this.disableStates();
        }

        if (stateParam instanceof Atlantis.State) {
            var index = this.states.indexOf(stateParam);
            if (index > -1) {
                this.states[index].active = true;
            }
        }
        else if (typeof (stateParam) == "string") {
            var i = 0;
            var index = -1;
            var size = this.states.length;

            while (i < size && index == -1) {
                if (this.states[i].name == stateParam) {
                    this.states[i].active = true;
                    index = i;
                }
                i++;
            }
        }
        else {
            if (stateParam > -1) {
                this.states[stateParam].active = true;
            }
        }
    };

    stateManager.prototype.disableStates = function () {
        for (var i = 0, l = this.states.length; i < l; i++) {
            this.states[i].active = false;
        }
    };

    stateManager.prototype.switchState = function (newState) {
        this.states = [];
        this.states.push(newState);
    };

    // 
    // Collection methods
    //

    stateManager.prototype.add = function (stateParam, isActive, disableOtherStates) {

        if (typeof (disableOtherStates) != "undefined" && disableOtherStates == true) {
            this.disableStates();
        }

        if (stateParam instanceof Array) {
            for (var i = 0, l = stateParam.length; i < l; i++) {
                stateParam[i].stateManager = this;
                stateParam[i].active = isActive;

                // If the state manager is already initialized we must load an initialize the state
                if (this.initialized) {
                    stateParam[i].loadContent(this.game.content);
                    stateParam[i].initialize();
                }

                this.states.push(stateParam[i]);
            }
        }
        else {
            stateParam.stateManager = this;
            stateParam.active = isActive;

            // If the state manager is already initialized we must load an initialize the state
            if (this.initialized) {
                stateParam[i].loadContent(this.game.content);
                stateParam[i].initialize();
            }

            this.states.push(stateParam);
        }
    };

    stateManager.prototype.remove = function (stateParam) {
        var state = null;

        if (stateParam instanceof Atlantis.state) {
            var index = this.states.indexOf(stateParam);
            if (index > -1) {
                state = this.states[index];
                this.states.splice(index, 1);
            }
        }
        else {
            if (stateParam > -1) {
                state = this.states[stateParam];
                this.states.splice(index, 1);
            }
        }

        return state;
    };

    stateManager.prototype.get = function (stateParam) {
        var state = null;

        if (stateParam instanceof Atlantis.State) {
            var index = this.states.indexOf(stateParam);
            if (index > -1) {
                state = this.states[index];
            }
        }
        else if (typeof (stateParam) == "string") {
            var i = 0;
            var index = -1;

            while (i < size && index == -1) {
                if (this.states[i].name == stateParam) {
                    index = i;
                }
                i++;
            }

            if (index > -1) {
                state = this.states[index];
            }
        }
        else {
            if (state > -1) {
                state = this.states[stateParam];
            }
        }

        return state;
    };

    return stateManager;
})();