import {images} from "./util/images.js";
import {settings} from "./gameSettings.js";
import Sprite from "./sprite.js";

export default class Player extends Sprite{
    constructor(game, position){
      super({
        image: images.player,
        size: {
          width: 135,
          height: 135
        },
        position
      })
      this.game = game
      this.regularImage = images.player
      this.ghostImage = images.playerOverlay
      this.isAlive = true
      this.startHealth = 3
      this.health = this.startHealth
      this.maxHealth = 5
      this.radius = this.width/2.25
      this.hitWidth = this.width * 0.9
      this.hitHeight = this.height * 0.9
      this.velocity = {x: 0, y: 0}
      this.maxSpeed = 1
      this.accelerationRate = settings.accelerationRate
      this.invincibility = false
    }

    reset(){
      this.health = this.startHealth
    }


    update(deltaTime){
      super.update(deltaTime)
      this.handleInput()

      if(this.position.y < this.game.height - 80){
        this.position.y += 0.5 * deltaTime
      }

      if(!this.isAlive) {
          this.image = this.ghostImage
          return
      }
      this.applyScreenExtents()
     }

     playHit(){
      this.game.audio.addAudio('audio/DeathFlash.flac')
     }


     draw(context){
      super.draw(context)
       if(this.invincibility) this.image = this.ghostImage
       else this.image = this.regularImage
     }

    applyScreenExtents(){
      if(this.position.x > this.game.width - this.width / 2) this.position.x = this.game.width - this.width / 2
      if(this.position.x < this.width / 2) this.position.x = this.width / 2

    }

     handleInput(){
       // MOVE LEFT
       if(this.game.input.currentKeysMovement[0] === this.game.input.keyMapMovement.moveLeft){
         if(this.velocity.x > -this.maxSpeed) this.velocity.x += -this.accelerationRate
         else this.velocity.x = -this.maxSpeed

       //   MOVE RIGHT
       } else if(this.game.input.currentKeysMovement[0] === this.game.input.keyMapMovement.moveRight){
         if(this.velocity.x < this.maxSpeed) this.velocity.x += this.accelerationRate
         else this.velocity.x = this.maxSpeed

       //   SLOW DOWN AND STOP
       } else {
         if(this.velocity.x > this.accelerationRate) this.velocity.x = this.velocity.x * settings.friction
         else if(this.velocity.x < -this.accelerationRate) this.velocity.x = this.velocity.x * settings.friction
         else this.velocity.x = 0
       }
     }


    invincibilityFrames(){
        this.invincibility = true
        setTimeout(() => {
            this.invincibility = false
        }, 1500)
    }



}
