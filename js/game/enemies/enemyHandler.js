import {settings} from "../gameSettings.js";
import Explosion from "../collisions/explosion.js";

export default class EnemyHandler{
  constructor(game) {
    this.game = game

    this.enemySpeed = 0
    this.enemyArray = []
  }

  update(deltaTime){
    this.handleDirectionChange(deltaTime)
    this.enemyArray.forEach(enemy => {
      enemy.update(deltaTime)
    })
    this.enemyArray = this.enemyArray.filter(enemy => !enemy.markedForDeletion)

  }

  draw(context){
    this.enemyArray.forEach(enemy => enemy.draw(context))
  }

  setEnemySpeed(speed){
    this.enemySpeed = speed
    this.enemyArray.forEach(enemy => enemy.velocity.x = speed)
  }

  handleDirectionChange(){
    if(this.enemyArray.length < 1) return

    let moveEnemiesDown = false

    const {leftEnemy, rightEnemy} = this.getEnemyExtents()
    const leftCutoff = 0 + this.game.player.width
    const rightCutoff = this.game.width - this.game.player.width * 1.75

    // MOVING RIGHT
    // Enemies Hit Right Side Of Screen and start slowing down
    if(rightEnemy.position.x + rightEnemy.width / 2 > rightCutoff){
      if(this.enemySpeed > settings.accelerationRate){
        this.enemySpeed = rightEnemy.velocity.x - settings.accelerationRate
      }
      // Enemies hit close to 0 velocity, change direction and move down
      else if(this.enemySpeed > -settings.accelerationRate){
        moveEnemiesDown = true
        this.enemySpeed = -settings.accelerationRate
        // Enemies start accelerating to full speed in opposite direction
      } else{
        this.enemySpeed = rightEnemy.velocity.x - settings.accelerationRate
      }
    }


    // MOVING LEFT
    // Enemies Hit Left Side Of Screen and start slowing down
    if(leftEnemy.position.x - leftEnemy.width/2 < leftCutoff){
      if(this.enemySpeed < -settings.accelerationRate){
        this.enemySpeed = rightEnemy.velocity.x + settings.accelerationRate
      }
      // Enemies hit close to 0 velocity, change direction and move down
      else if(this.enemySpeed < settings.accelerationRate){
        moveEnemiesDown = true
        this.enemySpeed = settings.accelerationRate
        // Enemies start accelerating to full speed in opposite direction
      } else {
        this.enemySpeed = leftEnemy.velocity.x + settings.accelerationRate
      }
    }

    // Ensure enemies don't accelerate past max speed
    if(leftEnemy.position.x - leftEnemy.width / 2 > leftCutoff && rightEnemy.position.x  - rightEnemy.width / 2 < rightCutoff){
      if(this.enemySpeed > 0) this.enemySpeed = settings.enemyMaxSpeed
      if(this.enemySpeed < 0) this.enemySpeed = -settings.enemyMaxSpeed
    }

    this.enemyArray.forEach(enemy => {
      enemy.velocity.x = this.enemySpeed
      if(moveEnemiesDown){
        enemy.position.y += settings.enemyMoveDownIncrement
      }
    })
  }



  // Find the enemy at the very left and very right of the enemies
  getEnemyExtents(){
    if(this.enemyArray.length < 1) return

    const leftEnemy = this.enemyArray.reduce((prev, curr) => prev.position.x < curr.position.x ? prev : curr)
    const rightEnemy = this.enemyArray.reduce((prev, curr) => prev.position.x > curr.position.x ? prev : curr)

    return {leftEnemy, rightEnemy}
  }
}
