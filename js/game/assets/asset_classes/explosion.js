import {images} from "../../util/images.js";

export default class Explosion{
    constructor({position, canvas, size = 1}){
        this.size = size
        this.position = position
        this.image = images.explosion
        this.width = 150 *  this.size
        this.height = 150 * this.size
        this.imageX = 196
        this.imageY = 190
        this.audio = new Audio('../assets/sounds/DeathFlash.flac')
        this.frame = 0
        this.imageFrameDuration = 15
        this.totalAnimatedGameFrames = 0
        this.animationCompleted = false
        this.animationDuration = 1500
    }

    draw(context){
        this.context.drawImage(this.image, this.frame * this.imageX, 0, this.imageX, this.imageY,Math.floor( this.position.x - this.width / 2),Math.floor( this.position.y - this.height / 2) , this.width, this.height)
    }

    animate(){
        // this.frameTimer()


        // number of frames per each image section
        if(this.totalAnimatedGameFrames % this.imageFrameDuration === 0){
            this.frame ++

        }

        this.totalAnimatedGameFrames ++
        // animation complete
        if(this.frame == 13){
            this.animationCompleted = true
        }
    }

    playSound(){
        this.audio.currentTime = 0
        this.audio.play()
    }

}
