import {images} from "../../util/images.js";
import Projectile from "../projectile.js";

export default class BigMissile extends Projectile{

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
    this.health = 15
    this.hitWidth = this.width * 0.55
    this.hitHeight = this.height
    this.velocity = {
      x: 0,
      y: -2.5
    }
  }
}
