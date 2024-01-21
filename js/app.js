import Game from "./game/game.js";
import Background from "./game/background/background.js";
import TitleScreen from "./game/titleScreen.js";

window.onload = function () {
  const gameCanvas = document.getElementById('canvas-game')

  const gameContext = gameCanvas.getContext('2d')

  const gameWidth = 1920
  const gameHeight = 1080

  gameCanvas.width = gameWidth
  gameCanvas.height = gameHeight



  const game = new Game(gameCanvas)


  let gameAnimationTimer = 0
  function gameLoop(timeStamp){
    const deltaTime = timeStamp - gameAnimationTimer
    gameAnimationTimer = timeStamp

    game.update(deltaTime)
    game.draw(gameContext)
    game.animate(deltaTime)

    requestAnimationFrame(gameLoop)
  }
  gameLoop(0)





}



