import Laser from "../laser.js";

export default class PlayerLaser extends Laser{
  constructor(game){
    super({position: game.player.position, game})
    this.player = game.player
    this.hitWidth = 7
    this.damageDealt = 0.015
    this.distanceToGrow = game.height - 125
  }


  update(deltaTime){
    super.update(deltaTime)
    if(this.height > this.distanceToGrow) this.height = this.distanceToGrow

  }

  draw(context){
    context.drawImage(
      this.image,
      this.imageOffsets[this.currentImageOffset][0],
      this.imageOffsets[this.currentImageOffset][1],
      this.imageX,
      this.imageY,
      Math.floor(this.position.x - this.width / 2),
      Math.floor(this.position.y - this.height),
      this.width,
      this.height
    )
  }





}
