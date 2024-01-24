import {images} from "../../util/images.js";
import Projectile from "../projectile.js";

export default class Missile extends Projectile{

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
