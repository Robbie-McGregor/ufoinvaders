import {images} from "../../util/images.js";
import Projectile from "../projectile.js";

export default class Missile extends Projectile{

    constructor({position, game}){
        super({
          image: images.enemyBullet,
          position,
          size: {
            width: 40,
            height: 70
          },
          game
        })
        this.health = 1
        this.hitWidth = this.width *0.35
        this.hitHeight = this.height
        this.velocity = {
            x: 0,
            y: 0.3
        }
    }
}
