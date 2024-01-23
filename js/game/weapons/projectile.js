import Sprite from "../assets/asset_classes/sprite.js";
import {images} from "../util/images.js";
import Explosion from "../collisions/explosion.js";

class Projectile extends Sprite{
  constructor({image, position, size, explosionSize, game}) {
    super({
      image, position, size
    });
    this.explosionSize = explosionSize
    this.game = game
    this.hitWidth = this.width
    this.hitHeight = this.height
    this.audio = new Audio('audio/cannon_fire.ogg');
  }
  playSound(){
    this.audio.play()
  }

  update(deltaTime){
    super.update(deltaTime)
    this.markedForDeletion = (this.health <= 0)
    if(this.position.y <= 0) {
      this.markedForDeletion = true
      this.explode()
    }
  }

  explode(){
    this.game.collisions.explosionArray.push(new Explosion({...this.position}, this.explosionSize))
  }
}



export class Missile extends Projectile{

  constructor(position, game){
    super({
      image: images.missile,
      position,
      size: {
        width: 25,
        height: 50
      },
      game,
      explosionSize: 1.5
    })
    this.game = game
    this.health = 1
    this.hitWidth = Math.floor(this.width * 0.55)
    this.velocity = {
      x: 0,
      y: -1.4
    }
    this.audio = new Audio('audio/cannon_fire.ogg');
  }
}


export class BigMissile extends Projectile{

  constructor(position, game){
    super({
      image: images.missile,
      position,
      size: {
        width: 65,
        height: 125
      },
      game,
      explosionSize: 5
    })
    this.health = 7
    this.hitWidth = this.width * 0.55
    this.hitHeight = this.height
    this.velocity = {
      x: 0,
      y: -2.5
    }
  }
}


export class Nuke extends Projectile{
  constructor(position, game){
    super({
      image: images.nuke,
      position,
      size: {
        width: 90,
        height: 120
      },
      game,
      explosionSize: 10
    })
    this.health = 9
    this.damageOnExplosion = 18

    this.velocity = {
      x: 0,
      y: -0.75
    }
    this.radius = 125
  }
}

