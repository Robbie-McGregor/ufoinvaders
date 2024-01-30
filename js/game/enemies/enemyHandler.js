import {settings} from "../gameSettings.js";
import Enemy from "./enemy.js";

export default class EnemyHandler{

  constructor(game) {
    this.game = game

    this.enemySpeed = 0
    this.enemyArray = []
    this.specialEnemyArray = []
    this.enemyMaxSpeed =  0.5
  }

  reset(){
    this.enemySpeed = 0
    this.enemyArray.splice(0, this.enemyArray.length)
    this.specialEnemyArray.splice(0, this.specialEnemyArray.length)
  }

  update(deltaTime){
    this.handleDirectionChange(deltaTime)
    this.enemyArray.forEach(enemy => {
      enemy.update(deltaTime)
      if(enemy.markedForDeletion) {
        this.game.state.killCount += 1
        this.game.state.score += enemy.points
        this.playEnemyDeathSound()
      }
    })

    this.handleSpecialEnemy(deltaTime)

    this.enemyArray = this.enemyArray.filter(enemy => !enemy.markedForDeletion)

  }

  handleSpecialEnemy(deltaTime){
    this.specialEnemyArray.forEach(specialEnemy => {
      specialEnemy.update(deltaTime)
      if(specialEnemy.velocity.x > 0 && specialEnemy.position.x > this.game.width ||
        specialEnemy.velocity.x < 0 && specialEnemy.position.x < 0) {
        specialEnemy.markedForDeletion = true
      }
      if(specialEnemy.markedForDeletion) {
        this.game.state.score += specialEnemy.points
        this.game.state.killCount += 1
      }
    })

    this.specialEnemyArray = this.specialEnemyArray.filter(enemy => !enemy.markedForDeletion)
  }



  playEnemyDeathSound(){
    this.game.audio.addAudio('audio/DeathFlash.flac')
  }

  draw(context){
    this.enemyArray.forEach(enemy => enemy.draw(context))
    this.specialEnemyArray.forEach(enemy => enemy.draw(context))
  }

  setEnemySpeed(speed){
    this.enemySpeed = speed
    this.enemyArray.forEach(enemy => enemy.velocity.x = speed)
  }

  addSpecialEnemy(){
    const side = Math.random() - 0.5

    let xPosition
    let xVelocity


    if(side >= 0) {
      xPosition = -60
      xVelocity = this.enemyMaxSpeed
    } else {
      xPosition = this.game.width + 60
      xVelocity = this.enemyMaxSpeed * -1
    }

    const enemy = new Enemy({
      position: {x: xPosition, y: 50}
    })
    enemy.points = Enemy.specialEnemyPoints
    enemy.velocity.x = xVelocity

    this.specialEnemyArray.push(enemy)

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
      if(this.enemySpeed > 0) this.enemySpeed = this.enemyMaxSpeed
      if(this.enemySpeed < 0) this.enemySpeed = -this.enemyMaxSpeed
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

  getTopRowEnemies(){
    const topRowEnemies = []
    this.enemyArray.forEach(enemy => {
      let enemyAboveThis = false

      this.enemyArray.forEach(otherEnemy => {
        if(enemy.position.x === otherEnemy.position.x && enemy.position.y > otherEnemy.position.y) enemyAboveThis = true
      })
      if(!enemyAboveThis) topRowEnemies.push(enemy)
    })

    return topRowEnemies
  }

  getBottomRowEnemies(){
    const bottomRowEnemies = []
    this.enemyArray.forEach(enemy => {
      let enemyAboveThis = false

      this.enemyArray.forEach(otherEnemy => {
        if(enemy.position.x === otherEnemy.position.x && enemy.position.y < otherEnemy.position.y) enemyAboveThis = true
      })
      if(!enemyAboveThis) bottomRowEnemies.push(enemy)
    })
    return bottomRowEnemies
  }
}
