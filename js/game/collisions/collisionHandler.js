import Explosion from "./explosion.js";

export default class CollisionHandler{
  constructor(game) {
    this.game = game
    this.explosionArray = []
  }


  update(deltaTime){
    this.missileEnemyCollisions()
    this.missileAmmoDropCollisions()

    this.explosionArray.forEach(explosion => explosion.update(deltaTime))
    this.explosionArray.filter(explosion => !explosion.markedForDeletion)
  }

  draw(context){
    this.explosionArray.forEach(explosion => explosion.draw(context))
  }

  animate(deltaTime){
    this.explosionArray.forEach(explosion => explosion.animate(deltaTime))
  }

  missileEnemyCollisions(){
    this.game.weapons.missileArray.forEach(missile => {
      this.game.enemies.enemyArray.forEach(enemy => {
        if(this.collisionCheckRectangular({object1: missile, object2: enemy})){
          missile.health -= 1
          enemy.health -= 1
          if(enemy.health <= 0) {
            this.explosionArray.push(new Explosion({...enemy.position}, 2))
            if(Math.random() < 0.1) this.game.ammoDrops.addAmmoDrop({...enemy.position})
          }
          else if(missile.health <= 0) missile.explode()
        }
      })
    })
  }

  missileAmmoDropCollisions(){
    this.game.weapons.missileArray.forEach(missile => {
      this.game.ammoDrops.ammoDropArray.forEach(ammoDrop => {
        if(this.collisionCheckRectangular({object1: missile, object2: ammoDrop})){
            this.explosionArray.push(new Explosion({...ammoDrop.position}, 1))
            ammoDrop.markedForDeletion = true
          }
      })
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
