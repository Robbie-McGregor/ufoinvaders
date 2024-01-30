import {images} from "../../util/images.js";
import Projectile from "../projectile.js";

export default class Nuke extends Projectile{
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
    this.health = 25

    this.velocity = {
      x: 0,
      y: -0.75
    }
    this.radius = 125
  }
}

