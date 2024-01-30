import EnemyLaser from "./enemyWeapons/enemyLaser.js";
import Missile from "./playerWeapons/missile.js";
import BigMissile from "./playerWeapons/bigMissile.js";
import Nuke from "./playerWeapons/nuke.js";
import PlayerLaser from "./playerWeapons/playerLaser.js";
import {enemySetup} from "../gameSettings.js";


export default class WeaponHandler{
  static AMMO_TYPES = {
    BIG_MISSILES: "BIG_MISSILES",
    NUKES: "NUKES",
    LASER: "LASER"
  }

  constructor(game) {
    this.game = game
    this.laserAmmoDepleteRate = 0.2
    this.missileArray = []
    this.playerAmmo = {
      "BIG_MISSILES": 0,
      "NUKES": 0,
      "LASER": 0
    }
    this.playerLaser = new PlayerLaser(game)
    this.enemyMissileArray = []
    this.enemyLaserArray = []
    this.enemyShootMissileChance = .0075
    this.enemiesShootLaserChance =  0.0075 / 4
    this.maxSimultaneousEnemyMissileAttacks = 5
    this.maxSimultaneousEnemyLaserAttacks = 2

    this.reset()
  }

  reset(){
    this.playerAmmo.BIG_MISSILES = 5
    this.playerAmmo.NUKES = 5
    this.playerAmmo.LASER = 1000
    this.enemyLaserArray.splice(0, this.enemyLaserArray.length)
    this.enemyMissileArray.splice(0, this.enemyMissileArray.length)
    this.missileArray.splice(0, this.missileArray.length)
    this.playerLaser.height = 0
  }


  update(deltaTime){

    this.fireWeapons(deltaTime)
    this.cleanUp()

    this.missileArray.forEach(missile => {missile.update(deltaTime)})
    this.enemyLaserArray.forEach(laser => laser.update(deltaTime))
    this.enemyMissileArray.forEach(missile => missile.update(deltaTime))
    this.playerLaser.update(deltaTime)

  }

  draw(context){
    this.missileArray.forEach(missile => missile.draw(context))
    this.enemyMissileArray.forEach(missile => missile.draw(context))
    this.enemyLaserArray.forEach(laser => laser.draw(context))
    this.playerLaser.draw(context)
  }

  animate(deltaTime){
    this.enemyLaserArray.forEach(laser => laser.animate(deltaTime))
    this.playerLaser.animate(deltaTime)
  }


  fireWeapons(deltaTime){
    this.handlePlayerInput(deltaTime)
    this.enemiesFireMissiles()
    this.enemiesFireLasers()
}

cleanUp(){
  this.missileArray = this.missileArray.filter(missile => !missile.markedForDeletion)
  this.enemyMissileArray = this.enemyMissileArray.filter(missile => !missile.markedForDeletion)
  this.enemyLaserArray = this.enemyLaserArray.filter(laser => !laser.markedForDeletion)
}


  handlePlayerInput(deltaTime){
    // Laser
    if(this.game.input.currentKeysWeapons[0] === this.game.input.keyMapWeapons.fireLaser && this.playerAmmo.LASER > 0){
      this.playerLaser.height += (this.playerLaser.distanceToGrow / this.playerLaser.growSpeed) * deltaTime
      this.playerAmmo.LASER -= this.laserAmmoDepleteRate * (deltaTime)
      if(this.playerAmmo.LASER < 0) this.playerAmmo.LASER = 0
      return
    } else {
      this.playerLaser.height = 0
    }


    // Player can only fire one bullet at a time
    if(this.missileArray.length > 0  || this.game.input.currentKeysWeapons.length < 1) return

    // Fire Missile
    if(this.game.input.currentKeysWeapons[0] === this.game.input.keyMapWeapons.fireMissile){
      this.missileArray.push(new Missile({...this.game.player.position}, this.game))
      this.missileArray[0].playSound()
      return
    }

    // Fire BIG MISSILE
    if(this.game.input.currentKeysWeapons[0] === this.game.input.keyMapWeapons.fireBigMissile && this.playerAmmo.BIG_MISSILES > 0){
      this.missileArray.push(new BigMissile({...this.game.player.position}, this.game))
      this.playerAmmo.BIG_MISSILES -= 1
      this.missileArray[0].playSound()
      return
    }

    // Fire Nuke
    if(this.game.input.currentKeysWeapons[0] === this.game.input.keyMapWeapons.fireNuke && this.playerAmmo.NUKES > 0){
      this.missileArray.push(new Nuke({...this.game.player.position}, this.game))
      this.playerAmmo.NUKES -= 1
      this.missileArray[0].playSound()
    }
  }


  enemiesFireMissiles(){
    if(this.game.enemies.enemyArray.length === 0) return
    if(this.enemyMissileArray.length >= this.maxSimultaneousEnemyMissileAttacks) return
    if(Math.random() > this.enemyShootMissileChance) return

    const enemiesThatCanFireBullets = this.game.enemies.getTopRowEnemies()

    const index = Math.floor(Math.random() * enemiesThatCanFireBullets.length)
    const enemy = enemiesThatCanFireBullets[index]

    this.enemyMissileArray.push(new enemy.bulletType({position: {...enemy.position}, game: this.game}))
  }

  enemiesFireLasers(){
    if(this.enemyLaserArray.length >= this.maxSimultaneousEnemyLaserAttacks) return
    if(Math.random() > this.enemiesShootLaserChance) return
    if(this.game.enemies.enemyArray.length < 1) return

    // Only Enemies on bottom row can fire the laser
    let enemiesThatCanFireLaserArray = this.game.enemies.getBottomRowEnemies()
    enemiesThatCanFireLaserArray = enemiesThatCanFireLaserArray.filter(enemy =>  enemy.type !== enemySetup.enemyTypes.level_6)
    // Filter out enemies that are already firing a laser
    this.enemyLaserArray.forEach(laser => {
      if (enemiesThatCanFireLaserArray.includes(laser.enemy)) enemiesThatCanFireLaserArray.splice(enemiesThatCanFireLaserArray.indexOf(laser.enemy), 1)
    })


    const randomIndex = Math.floor((Math.random() * enemiesThatCanFireLaserArray.length ))
    let enemy = enemiesThatCanFireLaserArray[randomIndex]
    if(enemy){
      this.enemyLaserArray.push(new EnemyLaser({
        position: enemy.position,
        game: this.game,
        enemy: enemy
      }))
    }


  }

}


