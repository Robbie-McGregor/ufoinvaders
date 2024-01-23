import {images} from "../util/images.js";
import { enemySetup } from "../gameSettings.js"
import { settings } from "../gameSettings.js"
import Sprite from "../assets/asset_classes/sprite.js";

export default class Enemy extends Sprite{
  constructor({ position, velocity, type = enemySetup.enemyTypes.level_1}){
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
    this.bulletType = settings.bulletTypes.enemyBullet

    if(type === enemySetup.enemyTypes.level_6){
      this.width = this.width * 1.6
      this.height = this.height * 1.6
      this.hitWidth = this.width
      this.hitHeight = this.height
      this.bulletType = settings.bulletTypes.enemyMine
    }

  }

  update(deltaTime){
    super.update(deltaTime)
    this.markedForDeletion = this.health <= 0
  }

  draw(context){

    let image = images.enemyGreen
    if(this.health === 1) image = images.enemyGreen
    if(this.health === 2) image = images.enemyRed
    if(this.health === 3) image = images.enemyBlue
    if(this.health === 4) image = images.enemyPurple
    if(this.health === 5) image = images.enemyWhite
    if(this.health >= 6) image = images.enemyLightBlue

    super.draw(context)

  }




}
