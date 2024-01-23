import {images} from "../../util/images.js";
import { settings } from "../../gameSettings.js"

export default class EnemyBullet{
    constructor({position, canvas}){
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.width = 42.5
        this.health = 1
        this.height = 70
        this.hitWidth = this.width *0.35
        this.hitHeight = this.height
        this.velocity = {
            x: 0,
            y: settings.enemyBulletSpeed
        }
        this.position = position
        this.image = images.enemyBullet
        this.audio = new Audio('../assets/sounds/cannon_fire.ogg');
    }

    draw(){
        if(settings.developmentMode) this.drawHitBox()
        this.context.beginPath()
        this.context.strokeStyle='white'
        // this.context.rect(this.position.x - this.hitWidth / 2, this.position.y - this.hitHeight / 2, this.hitWidth, this.hitHeight)
        this.context.stroke()
        this.context.drawImage(this.image, Math.floor(this.position.x - this.width / 2),Math.floor(this.position.y - this.height / 2), this.width, this.height)
    }

    update(deltaTime){
        this.position.y += this.velocity.y * deltaTime
        this.position.x += this.velocity.x * deltaTime
    }

    playSound(){
        this.audio.play()
    }


    drawHitBox(){
        this.context.beginPath()
        this.context.strokeStyle='white'
        this.context.rect(this.position.x - this.hitWidth / 2, this.position.y - this.hitHeight / 2, this.hitWidth, this.hitHeight)

        this.context.stroke()
    }
}
