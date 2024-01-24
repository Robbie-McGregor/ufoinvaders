import {images} from "../util/images.js";
import Sprite from "../assets/sprite.js";

export default class Laser extends Sprite{
  constructor({position, game}){
    super({
      position,
      image: images.laser,
      size: {
        width: 240,
        height: 0
      }
    })
    this.game = game
    this.hitWidth = 7
    this.hitHeight = this.height * 2
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
    this.growSpeed = 30
    this.currentFrame = 0
    this.frameChangeDelay = 15
    this.currentImageOffset = 11
  }

  draw(context){
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
    if(this.currentFrame % this.frameChangeDelay !== 0) return
    if(this.currentImageOffset === this.imageOffsets.length - 1) this.currentImageOffset = 0
    else this.currentImageOffset += 1

    this.hitHeight = this.height * 2

  }


  animate(context){
    this.currentFrame += 1
    if(this.currentFrame % this.frameChangeDelay !== 0) return

    if(this.currentImageOffset === this.imageOffsets.length - 1) this.currentImageOffset = 0
    else this.currentImageOffset += 1
  }
}
