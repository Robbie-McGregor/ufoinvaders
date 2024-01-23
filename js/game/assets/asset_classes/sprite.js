export default class Sprite{
  constructor({image, position, size}) {
    this.image = image
    this.position = position
    this.velocity = {x: 0, y: 0}
    this.width = size.width
    this.height = size.height
    this.markedForDeletion = false
  }

  draw(context){
    context.drawImage(this.image, Math.floor(this.position.x - this.width / 2),Math.floor(this.position.y - this.height / 2), this.width, this.height)
  }

  update(deltaTime){
    this.position.x += this.velocity.x * deltaTime
    this.position.y += this.velocity.y * deltaTime
  }

  animate(deltaTime){

  }

  drawHitBox(context){
    context.beginPath()
    context.strokeStyle='white'
    context.rect(this.position.x - this.hitWidth / 2, this.position.y - this.hitHeight / 2, this.hitWidth, this.hitHeight)
    context.arc(this.position.x, this.position.y, this.radius , 0, 2 * Math.PI);
    context.stroke()
  }


}
