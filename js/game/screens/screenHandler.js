import TitleScreen from "./titleScreen.js";
import GameScreen from "./gameScreen.js";
import GameOverScreen from "./gameOverScreen.js";

export default class ScreenHandler{
  constructor(game) {
    this.game = game
    this.screens = {
      titleScreen: new TitleScreen(game),
      gameScreen: new GameScreen(game),
      gameOver: new GameOverScreen(game)
    }
    this.currentScreen = null
  }

  setCurrentScreen(screen){
    this.currentScreen = screen
  }

  update(deltaTIme){
    this.currentScreen.update(deltaTIme)
  }

  draw(context){
    this.currentScreen.draw(context)
  }

  animate(deltaTime){
    this.currentScreen.animate(deltaTime)
  }
}
