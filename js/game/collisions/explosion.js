import Sprite from "../assets/asset_classes/sprite.js";
import {images} from "../util/images.js";

export default class Explosion extends Sprite{
  constructor(position, size = 1) {
    super({
      image: images.explosion,
      position,
      size: {width: 50 * size, height: 50 * size}
    })
    this.audio = new Audio('audio/DeathFlash.flac')
    this.imageX = 196
    this.imageY = 190
    this.currentFrame = 0
    this.imageFrameDuration = 15
    this.totalAnimatedGameFrames = 0
  }

  draw(context){
    context.drawImage(this.image, this.currentFrame * this.imageX, 0, this.imageX, this.imageY,Math.floor( this.position.x - this.width / 2),Math.floor( this.position.y - this.height / 2) , this.width, this.height)
  }

  update(deltaTime){
    if(this.currentFrame === 13){
      this.markedForDeletion = true
    }
  }

  animate(deltaTime){
    if(this.totalAnimatedGameFrames % this.imageFrameDuration === 0){
      this.currentFrame ++
    }
    this.totalAnimatedGameFrames ++
  }

  playSound(){
    this.audio.currentTime = 0
    this.audio.play()
  }
}
