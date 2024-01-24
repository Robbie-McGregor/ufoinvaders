import Explosion from "./explosion.js";
import {Health} from "../ammoDrops/ammoDrop.js";

export default class CollisionHandler{
  constructor(game) {
    this.game = game
    this.explosionArray = []
  }


  update(deltaTime){
    this.playerMissileToEnemyCollisions()
    this.ammoDropCollisions()
    this.playerEnemyCollisions()
    this.playerMissileToEnemyMissileCollisions()
    this.playerLaserToEnemyCollisions(deltaTime)
    this.enemyMissileToPlayerCollisions()
    this.enemyLaserToPlayerCollisions()


    this.explosionArray.forEach(explosion => explosion.update(deltaTime))
    this.explosionArray.filter(explosion => !explosion.markedForDeletion)
  }

  draw(context){
    this.explosionArray.forEach(explosion => explosion.draw(context))
  }

  animate(deltaTime){
    this.explosionArray.forEach(explosion => explosion.animate(deltaTime))
  }

  playerMissileToEnemyCollisions(){
    this.game.weapons.missileArray.forEach(missile => {
      this.game.enemies.enemyArray.forEach(enemy => {
        if(this.collisionCheckRectangular({object1: missile, object2: enemy})){
          const enemyLaser = this.game.weapons.enemyLaserArray.find(laser => laser.enemy === enemy)
          if(enemyLaser) enemyLaser.markedForDeletion = true

          missile.health -= 1
          if(missile.health === 0) missile.markedForDeletion = true
          enemy.health -= 1
          if(enemy.health <= 0) {
            this.explosionArray.push(new Explosion({...enemy.position}, 2))
            if(Math.random() < 0.1) this.game.ammoDrops.addAmmoDrop({...enemy.position})
          }
          if(missile.health <= 0 && missile.explosionSize > 2) missile.explode()
        }
      })
    })
  }

  playerMissileToEnemyMissileCollisions(){
    this.game.weapons.missileArray.forEach(missile => {
      this.game.weapons.enemyMissileArray.forEach(enemyMissile => {
        if(this.collisionCheckRectangular({
          object1: missile,
          object2: enemyMissile
        })){
          missile.health -= 1
          enemyMissile.explode()
          enemyMissile.playExplosion()
          enemyMissile.health -= 1
          setTimeout(() => {
            this.game.ammoDrops.addAmmoDrop({...enemyMissile.position})
          }, 100)

        }
      })
    })
  }

  playerLaserToEnemyCollisions(deltaTime){
    const bottomRowEnemies = this.game.enemies.getBottomRowEnemies()

    bottomRowEnemies.forEach(enemy => {
      if(this.collisionCheckRectangular({
        object1: enemy,
        object2: this.game.weapons.playerLaser
      })){
        const enemyLaser = this.game.weapons.enemyLaserArray.find(laser => laser.enemy === enemy)
        if(enemyLaser) enemyLaser.markedForDeletion = true

        enemy.takeLaserDamage(this.game.weapons.playerLaser.damageDealt * deltaTime)
        this.game.weapons.playerLaser.height = -(enemy.position.y - this.game.player.position.y)
      }
    })
  }

  enemyMissileToPlayerCollisions(){
    if(this.game.player.invincibility) return
    this.game.weapons.enemyMissileArray.forEach(missile => {
      if(this.collisionCheckRectangular({
        object1: missile,
        object2: this.game.player
      })){
        missile.health -= 1
        this.game.player.playHit()
        this.game.player.health -= 1
        this.game.player.invincibilityFrames()
      }
    })
  }

  enemyLaserToPlayerCollisions(){
    if(this.game.player.invincibility) return
    this.game.weapons.enemyLaserArray.forEach(laser => {
      if(this.collisionCheckRectangular({
        object1: laser,
        object2: this.game.player
      })){
        this.game.player.playHit()
        this.game.player.health -= 1
        this.game.player.invincibilityFrames()
      }
    })
  }

  ammoDropCollisions(){
    this.game.ammoDrops.ammoDropArray.forEach(ammoDrop => {
      if(ammoDrop.ammoType === Health.ammoType && this.game.player.health >= this.game.player.maxHealth) return;
      if(this.collisionCheckRectangular({object1: this.game.player, object2: ammoDrop})) {
        ammoDrop.markedForDeletion = true
        return
      }

      this.game.weapons.missileArray.forEach(missile => {
        if(this.collisionCheckRectangular({object1: missile, object2: ammoDrop})){
          this.explosionArray.push(new Explosion({...ammoDrop.position}, 1))
          ammoDrop.markedForDeletion = true
        }
      })
    })
  }


  playerEnemyCollisions(){
    this.game.enemies.enemyArray.forEach(enemy => {
      if(this.collisionCheckRectangular({object1: this.game.player, object2: enemy})) {
        enemy.health = 0
        this.game.player.health -= 1
      }
    })
  }




  collisionCheckRectangular({object1, object2}){
    const object1Extents = {
      top: object1.position.y - object1.hitHeight / 2,
      bottom: object1.position.y + object1.hitHeight / 2,
      left: object1.position.x - object1.hitWidth / 2,
      right: object1.position.x + object1.hitWidth / 2
    }
    const object2Extents = {
      top: object2.position.y - object2.hitHeight / 2,
      bottom: object2.position.y + object2.hitHeight / 2,
      left: object2.position.x - object2.hitWidth / 2,
      right: object2.position.x + object2.hitWidth / 2
    }

    return object1Extents.top < object2Extents.bottom &&
      object1Extents.bottom > object2Extents.top &&
      object1Extents.left < object2Extents.right &&
      object1Extents.right > object2Extents.left;

  }




  collisionCheckCircular({object1, object2}){
    const distX = object1.position.x - object2.position.x
    const distY = object1.position.y - object2.position.y
    const distance = Math.sqrt(distX**2 + distY**2)
    return distance <= object1.radius + object2.radius;
  }

  distanceBetweenTwoObjects({object1, object2}){
    const xSquared = (object1.position.x - object2.position.x) ** 2
    const ySquared = (object1.position.y - object2.position.y) ** 2
    return Math.sqrt(xSquared + ySquared)
  }
}
