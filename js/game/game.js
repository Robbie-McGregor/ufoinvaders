import Background from "./screens/background.js";
import InputHandler from "./input.js";
import ScreenHandler from "./screens/screenHandler.js";
import Player from "./player.js";
import LevelHandler from "./levels/levelHandler.js";
import EnemyHandler from "./enemies/enemyHandler.js";
import WeaponHandler from "./weapons/weaponHandler.js";
import GameState from "./gameState/gameState.js";
import CollisionHandler from "./collisions/collisionHandler.js";
import AmmoDropHandler from "./ammoDrops/ammoDropHandler.js";
import AudioHandler from "./audio/audioHandler.js";

export default class Game{
  constructor(gameContentCanvas) {
    this.width = gameContentCanvas.width
    this.height = gameContentCanvas.height
    this.audio = new AudioHandler(this)
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
  }

  restartGame(){
    this.player.reset()
    this.state.reset()
    this.weapons.reset()
    this.enemies.reset()
    this.collisions.reset()
    this.ammoDrops.reset()
    this.audio.reset()
    this.startGame()
  }



  update(deltaTime){
    this.state.update()
    this.level.update()
    this.audio.update()
    this.screen.update(deltaTime)

    if(this.state.gameOver && this.screen.currentScreen !== this.screen.screens.gameOver) this.screen.setCurrentScreen(this.screen.screens.gameOver)
  }

  draw(context){
    context.clearRect(0, 0, this.width, this.height)
    this.background.draw(context)
    this.screen.draw(context)
  }

  animate(deltaTime){
    this.background.animate(deltaTime)
    this.screen.animate(deltaTime)

  }

}
