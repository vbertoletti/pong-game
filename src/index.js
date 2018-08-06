import './styles/game.css';
import Game from './partials/Game'

// create a game instance

document.getElementById("start").onclick = function(event) { 

const game = new Game('game', 512, 256);

(function gameLoop() {
    game.render();
    requestAnimationFrame(gameLoop);
})();

}






