'use strict';

import GameBuilder from './game.js';
import Rank from './rank.js';

const rankSystem = new Rank();
const game = new GameBuilder()
.gameDuration(10)
.carrotCount(1)
.bugCount(10)
.build();


rankSystem.startRankSystem();

game.uiInit();