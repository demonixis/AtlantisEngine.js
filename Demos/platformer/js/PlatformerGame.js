var PlatformerGame = function () {
    Atlantis.GameApplication.call(this, 800, 480);
    this.content.setRootDirectory("Content/");
    var gameState = new GameState("game", 3);
    this.stateManager.add(gameState, true);
};

PlatformerGame.prototype = new Atlantis.GameApplication();