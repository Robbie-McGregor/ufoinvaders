import Background from "./screens/background.js";
import {InputHandler} from "./input.js";
import ScreenHandler from "./screens/screenHandler.js";
import Player from "./assets/asset_classes/player.js";
import LevelHandler from "./levels/levelHandler.js";
import EnemyHandler from "./enemies/enemyHandler.js";
import WeaponHandler from "./weapons/weaponHandler.js";
import GameState from "./gameState/gameState.js";
import CollisionHandler from "./collisions/collisionHandler.js";
import AmmoDropHandler from "./ammoDrops/ammoDropHandler.js";

export default class Game{
  constructor(gameContentCanvas) {
    this.canvas = gameContentCanvas
    this.width = gameContentCanvas.width
    this.height = gameContentCanvas.height
    this.background = new Background(this)
    this.state = new GameState(this)
    this.input = new InputHandler(this)
    this.player = new Player(this, {x: this.width / 2,y: 775})
    this.enemies = new EnemyHandler(this)
    this.weapons = new WeaponHandler(this)
    this.ammoDrops = new AmmoDropHandler(this)
    this.collisions = new CollisionHandler(this)
    this.screen = new ScreenHandler(this)
    this.level = new LevelHandler(this)



    this.init()
  }

  init(){
    this.screen.setCurrentScreen(this.screen.screens.titleScreen)
  }

  startGame(){
    this.state.paused = false
    this.screen.setCurrentScreen(this.screen.screens.gameScreen)
    this.level.setCurrentLevel(0)

    setTimeout(() => {
    this.enemies.setEnemySpeed(0.5)
    }, 500)
  }

  update(deltaTime){

    this.screen.update(deltaTime)
    this.level.update()

  }

  draw(context){
    this.background.draw(context)
    this.screen.draw(context)
  }

  animate(deltaTime){
    this.background.animate(deltaTime)
    this.screen.animate(deltaTime)

  }

}
