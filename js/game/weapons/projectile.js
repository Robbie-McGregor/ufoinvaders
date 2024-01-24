import Sprite from "../assets/sprite.js";
import Explosion from "../collisions/explosion.js";

export default class Projectile extends Sprite{
  constructor({image, position, size, explosionSize, game}) {
    super({
      image, position, size
    });
    this.explosionSize = explosionSize
    this.game = game
    this.hitWidth = this.width
    this.hitHeight = this.height
    this.audio = new Audio('audio/cannon_fire.ogg');
    this.explosionAudio = new Audio('audio/DeathFlash.flac')
  }
  playSound(){
    this.audio.play()
  }

  playExplosion(){
    this.explosionAudio.play()
  }

  update(deltaTime){
    super.update(deltaTime)
    this.markedForDeletion = (this.health <= 0)
    if(this.position.y <= 0 || this.position.y >= this.game.height) {
      this.markedForDeletion = true
      this.explode()
    }
  }

  explode(){
    this.game.collisions.explosionArray.push(new Explosion({...this.position}, this.explosionSize))
  }
}







