import Game from "./game/game.js";

window.onload = function () {
  // DOM ELEMENTS
  const loader = document.getElementById('loader')
  const gameCanvas = document.getElementById('canvas-game')
  const gameContext = gameCanvas.getContext('2d')

  // CANVAS SETUP
  const gameWidth = 1920
  const gameHeight = 1080
  gameCanvas.width = gameWidth
  gameCanvas.height = gameHeight

  // HIDE LOADER/SHOW CANVAS
  gameCanvas.classList.remove('display-none')
  loader.classList.add('display-none')


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

