import {images} from "../../util/images.js";
import Projectile from "../projectile.js";

export default class Mine extends Projectile{
    constructor({position, game}){
      super({
        image: images.mine,
        position,
        size: {
          width: 75,
          height: 75
        }
      })
      this.game = game
      this.health = 1
      this.hitWidth = this.width
      this.hitHeight = this.height
      this.radius = this.width/2
      this.velocity = {
          x: 0,
          y: 0.5
      }
      this.speed = 0.4
      this.position = position
      this.image = images.mine
      this.player = game.player
      this.homingCoordinates = {
          missilePosition: {
              x: this.position.x,
              y: this.position.y
          },
          playerPosition: {
              x: this.position.x,
              y: game.height
          },
          angle: 0
      }
    }


    update(deltaTime){
      super.update(deltaTime)
      if(this.position.y < this.game.height / 1.3){
          this.setHomingCoordinates()
          this.getNewVelocity()
      }
      this.homingCoordinates.angle = this.getAngleToPlayer()
      if(this.position.y >= this.game.height) this.markedForDeletion = true
    }

    setHomingCoordinates(){
        const missilePosition = {...this.position}
        const playerPosition = {...this.player.position}
        const angle = this.getAngleToPlayer()
        this.homingCoordinates = {
            missilePosition, playerPosition, angle
        }
    }

    playSound(){
        this.audio.play()
    }


    getAngleToPlayer(){
      const opposite = this.homingCoordinates.playerPosition.x - this.homingCoordinates.missilePosition.x
      const adjacent = this.homingCoordinates.playerPosition.y - this.homingCoordinates.missilePosition.y
      return Math.atan(opposite / adjacent)
    }

    getNewVelocity(){
      const angle  = this.getAngleToPlayer()
      const deltaX = Math.sin(angle) * this.speed
      const deltaY = Math.cos(angle) * this.speed
        this.velocity = {
            ...this.velocity,
            x: deltaX,
            y: deltaY
        }
    }
}
