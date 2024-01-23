import Screen from "./screen.js";
import Overlay from "./overlay.js";

export default class GameScreen extends Screen{
  constructor(game) {
    super(game)
    this.overlay = new Overlay(game)
  }

  update(deltaTime){
    super.update(deltaTime)
    this.game.collisions.update(deltaTime)
    this.game.player.update(deltaTime)
    this.game.weapons.update(deltaTime)
    this.game.enemies.update(deltaTime)
    this.game.ammoDrops.update(deltaTime)
  }

  draw(context){
    super.draw(context)
    this.overlay.draw(context)
    this.game.collisions.draw(context)
    this.game.weapons.draw(context)
    this.game.player.draw(context)
    this.game.enemies.draw(context)
    this.game.ammoDrops.draw(context)
  }

  animate(deltaTime) {
    super.animate(deltaTime)
    this.game.collisions.animate(deltaTime)
  }


}
