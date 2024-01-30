import Laser from "../weapons/enemyWeapons/enemyLaser.js";
import Screen from "./screen.js";
import Enemy from "../enemies/enemy.js";
import {enemySetup} from "../gameSettings.js";
import Missile from "../weapons/playerWeapons/missile.js";

export default class TitleScreen extends Screen{
    constructor(game) {
      super(game)

      this.titlePosition = 150
      this.titleText = "UFO INVADERS"

      this.lowerTextPosition = 1000
      this.lowerText = "PRESS ENTER TO PLAY"

      this.font = "Staatliches"
      this.fontColor = "rgb(241,241,241)";

      this.alienYPosition = 325

      this.sprites = [this.makeSprites()]
    }

  drawTitle(context){
    context.font = `150px ${this.font}`;
    context.fillStyle = this.fontColor
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(this.titleText, this.width / 2, this.titlePosition)
  }

  drawLowerText(context){
    context.font = `30px ${this.font}`
    context.fillText(this.lowerText, this.width / 2, this.lowerTextPosition)

  }

  update(deltaTime){
      if(this.game.input.currentKeys.includes(this.game.input.keyMap.enter) || this.game.input.currentKeys.includes(this.game.input.keyMap.numpadEnter)){
        this.game.startGame()
      }
  }

    draw(context){
      super.draw(context)
      this.drawTitle(context)
      this.drawLowerText(context)


    }

    makeSprites(){
      const enemy1 =  new Enemy({position: {x: this.game.width / 2, y: this.alienYPosition, velocity: 0}, type: enemySetup.enemyTypes.level_1})
      const enemy2 =  new Enemy({position: {x: this.game.width / 2 - 300, y: this.alienYPosition, velocity: 0}, type: enemySetup.enemyTypes.level_1})
      const enemy3 =  new Enemy({position: {x: this.game.width / 2 + 300, y: this.alienYPosition, velocity: 0}, type: enemySetup.enemyTypes.level_1})

      const laser1 =  new Laser({position: enemy2.position, enemy: enemy2 })
      const laser2 =  new Laser({position: enemy3.position, enemy: enemy3 })

      laser1.height = 500
      laser2.height = 500

      const missile = new Missile({x: this.game.width / 2, y: 500})
      return [
          this.game.player,
        laser1,
        laser2,
        enemy1,
        enemy2,
        enemy3,
        missile,
        ]
    }


}
