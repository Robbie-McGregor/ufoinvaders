import Background from "./background/background.js";
import TitleScreen from "./titleScreen.js";

export default class Game{
  constructor(gameContentCanvas) {
    this.canvas = gameContentCanvas
    this.width = gameContentCanvas.width
    this.height = gameContentCanvas.height

    this.background = new Background(this)
    this.titleScreen = new TitleScreen(this)

  }

  update(deltaTime){
  }

  draw(context){
    this.background.draw(context)
  }

  animate(deltaTime){
    this.background.animate(deltaTime)
  }

}
