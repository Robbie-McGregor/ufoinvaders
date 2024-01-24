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

}
