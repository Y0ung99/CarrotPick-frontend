'use strict';

import GameBuilder from './game.js';
import Rank from './rank.js';

const rankSystem = new Rank();
rankSystem.startRankSystem();
const game = new GameBuilder()
.gameDuration(8)
.carrotCount(10)
.bugCount(20)
.build();

game.uiInit();