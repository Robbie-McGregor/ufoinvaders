import {createImage} from "../util/images.js";

export default class Background{
  constructor(game) {
    this.game = game
    this.width = this.game.width
    this.height = this.game.height

    this.y1 = 0
    this.y2 = 0
    this.y3 = 0

    this.speed1 = 0.125 / 16
    this.speed2 = 0.125 /24
    this.speed3 = 0.125 /48

    this.background1 = createImage('img/background/background.jpg')
    this.background2 = createImage('img/background/background_flip.jpg')
    this.background3 = createImage('img/background/background_reverse.jpg')

    this.image2Offset = -20
    this.image3Offset = 20

  }

  animate(deltaTime){
    // UPDATE Y1
    if(this.y1 > this.height){
      this.y1 = 0
    }
    else this.y1 += this.speed1 * deltaTime


    // UPDATE Y2
    if(this.y2 > this.height){
      this.y2 = 0
    }
    else this.y2 += this.speed2 * deltaTime

    //  UPDATE Y3
    if(this.y3 > this.height){
      this.y3 = 0
    }
    else this.y3 += this.speed3 * deltaTime
  }

  draw(context){
    context.clearRect(0, 0, this.width, this.height)

    context.globalAlpha = 1
    context.fillRect(0,0,this.width, this.height)

    context.globalAlpha = 0.9
    context.drawImage(this.background1, 0, this.y3, this.width, this.height)
    context.drawImage(this.background1, 0, this.y3 - this.height, this.width, this.height)

    context.globalAlpha = 0.45
    context.drawImage(this.background2, this.image2Offset, Math.floor(this.y2), this.width, this.height)
    context.drawImage(this.background2, this.image2Offset, Math.floor(this.y2 - this.height), this.width, this.height)

    context.globalAlpha = 0.3
    context.drawImage(this.background3, this.image3Offset, Math.floor(this.y1), this.width, this.height)
    context.drawImage(this.background3, this.image3Offset, Math.floor(this.y1 - this.height), this.width, this.height)

  }
}
