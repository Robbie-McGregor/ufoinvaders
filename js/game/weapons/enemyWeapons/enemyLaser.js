import Laser from "../laser.js";

export default class EnemyLaser extends Laser{
  constructor({position, game, enemy}){
    super({
      position,
      game,
    })
    this.game = game
    this.enemy = enemy
    this.hitDuration = 1200
    this.distanceToGrow = this.game?.height - this.position.y || 0
  }


  update(deltaTime){
    super.update(deltaTime)

    if(this.enemy.markedForDeletion) this.markedForDeletion = true

    if(this.height < this.game.height - this.position.y){
      this.height += (this.distanceToGrow / this.growSpeed) * deltaTime
    } else {
      setTimeout(() => {
        this.markedForDeletion = true
      }, this.hitDuration)
    }

  }
}
