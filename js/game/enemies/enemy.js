import {images} from "../util/images.js";
import { enemySetup } from "../gameSettings.js"
import Sprite from "../assets/sprite.js";
import Missile from "../weapons/enemyWeapons/missile.js";
import Mine from "../weapons/enemyWeapons/mine.js";

export default class Enemy extends Sprite{
  static ENEMY_BULLET_TYPES = {
    missile : Missile,
    mine: Mine
  }
  constructor({ position, type = enemySetup.enemyTypes.level_1}){
    super({
      image: images.enemyGreen,
      position,
      size: {width: 115, height: 55}
    })
    this.type = type
    this.health = type.health
    this.laserDamage = 0
    this.hitWidth = this.width
    this.hitHeight = this.height
    this.radius = this.width
    this.points = type.points
    this.bulletType = Enemy.ENEMY_BULLET_TYPES.missile


    if(type === enemySetup.enemyTypes.level_6){
      this.width = this.width * 1.6
      this.height = this.height * 1.6
      this.hitWidth = this.width
      this.hitHeight = this.height
      this.bulletType = Enemy.ENEMY_BULLET_TYPES.mine
    }

  }

  update(deltaTime){
    super.update(deltaTime)
    this.markedForDeletion = this.health <= 0
  }

  draw(context){

    if(this.health === 1) this.image = images.enemyGreen
    if(this.health === 2) this.image = images.enemyRed
    if(this.health === 3) this.image = images.enemyBlue
    if(this.health === 4) this.image = images.enemyPurple
    if(this.health === 5) this.image = images.enemyWhite
    if(this.health >= 6) this.image = images.enemyLightBlue

    super.draw(context)

  }

  takeLaserDamage(damage){
    console.log(this.laserDamage)
    if(this.laserDamage >= 1){
      this.health -= 1
      this.laserDamage = 0
    } else {
      this.laserDamage += damage
    }
  }




}
