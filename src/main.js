'use strict';
import GameBuilder from './game.js';

function gameBuild() {
  const game = new GameBuilder()
  .build();
  game.uiInit();
}
gameBuild();