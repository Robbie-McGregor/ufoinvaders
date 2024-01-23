import {images} from "../util/images.js";

export default class Laser{
  constructor({position, enemy}){
    this.width = 240
    this.height = 500
    this.hitDuration = 1800
    this.damageDealt = 0.1
    this.hitWidth = 7
    this.enemy = enemy
    this.hitHeight = this.height * 2
    this.position = position
    this.image = images.laser
    this.offSetX = 0
    this.offSetY = 0
    this.imageX = 2048 / 4
    this.imageY = 2048 / 3
    this.imageOffsets = [
      [this.imageX * 3,  this.imageY * 2],
      [this.imageX * 2,  this.imageY * 2],
      [this.imageX,  this.imageY * 2],
      [0, this.imageY * 2],
      [this.imageX * 3, this.imageY],
      [this.imageX * 2, this.imageY],
      [this.imageX, this.imageY],
      [0,this.imageY],
      [this.imageX * 3, 0],
      [this.imageX * 2, 0],
      [this.imageX, 0],
      [0,0],
    ]
    this.currentFrame = 0
    this.frameChangeDelay = 15
    this.currentImageOffset = 11
    this.completed = false
    // this.distanceToGrow = canvas.height - position.y

  }

  draw(context){
    // if(settings.developmentMode) this.showHitBox()

    context.drawImage(
      this.image,
      this.imageOffsets[this.currentImageOffset][0],
      this.imageOffsets[this.currentImageOffset][1],
      this.imageX,
      this.imageY,
      Math.floor(this.position.x - this.width / 2),
      Math.floor(this.position.y - 25),
      this.width,
      this.height + 50
    )
  }

  update(deltaTime){

    this.currentFrame += 1
    if(this.currentFrame % this.frameChangeDelay != 0) return

    // this.height += 40
    this.height += (this.distanceToGrow) / 15

    this.hitHeight = this.height * 2


    if(this.currentImageOffset == this.imageOffsets.length - 1) this.currentImageOffset = 0
    else this.currentImageOffset += 1

  }


  animate(context){
    this.currentFrame += 1
    if(this.currentFrame % this.frameChangeDelay != 0) return


    if(this.currentImageOffset == this.imageOffsets.length - 1) this.currentImageOffset = 0
    else this.currentImageOffset += 1
  }


  showHitBox(){
    this.context.beginPath()
    this.context.strokeStyle='white'
    this.context.rect(this.position.x - this.hitWidth / 2, this.position.y - this.hitHeight / 2, this.hitWidth, this.hitHeight)

    this.context.stroke()
  }



}
