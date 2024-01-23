import {images} from "../util/images.js";
import { settings } from "../gameSettings.js"

export default class Mine{
    constructor({position, canvas, player}){
        this.health = 1
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.width = 75
        this.height = 75
        this.hitWidth = this.width
        this.hitHeight = this.height
        this.radius = this.width/2
        this.explosionRadius = this.width
        this.velocity = {
            x: 0,
            y: 0.5
        }
        this.frames = 0
        this.speed = 0.4
        this.position = position
        this.image = images.mine
        this.player = player
        this.homingCoordinates = {
            missilePosition: {
                x: this.position.x,
                y: this.position.y
            },
            playerPosition: {
                x: this.position.x,
                y: this.canvas.height
            },
            angle: 0
        }
        this.explode = false
    }

    draw(){
        if(settings.developmentMode) this.drawHitBox()
        this.context.drawImage(this.image, Math.floor(this.position.x - this.width / 2),Math.floor( this.position.y - this.height / 2), this.width, this.height)
    }

    update(deltaTime){
        this.frames++
        if(this.frames == 1 && this.position.y < this.canvas.height / 1.3){
            this.setHomingCoordinates()
            this.getNewVelocity()

        }
        this.homingCoordinates.angle = this.getAngleToPlayer()

        if(this.position.y >= this.canvas.height) this.explode = true


        this.position.y += this.velocity.y * deltaTime
        this.position.x += this.velocity.x * deltaTime
    }

    setHomingCoordinates(){
        const missilePosition = {...this.position}
        const playerPosition = {...this.player.position}
        const angle = this.getAngleToPlayer()
        this.homingCoordinates = {
            missilePosition, playerPosition, angle
        }
    }

    playSound(){
        this.audio.play()
    }

    drawHitBox(){
        this.context.beginPath()
        this.context.strokeStyle='white'
        this.context.arc(this.position.x, this.position.y, this.radius , 0, 2 * Math.PI);
        this.context.arc(this.position.x, this.position.y, this.explosionRadius , 0, 2 * Math.PI);
        this.context.stroke()
    }



    getAngleToPlayer(){
        const opposite = this.homingCoordinates.playerPosition.x - this.homingCoordinates.missilePosition.x

        const adjacent = this.homingCoordinates.playerPosition.y - this.homingCoordinates.missilePosition.y
        const angle = Math.atan(opposite / adjacent)

        return angle

    }

    getNewVelocity(){
        let angle  = this.getAngleToPlayer()
        let deltaX = Math.sin(angle) * this.speed
        let deltaY = this.velocity.y
        deltaY = Math.cos(angle) * this.speed


        this.velocity = {
            ...this.velocity,
            x: deltaX,
            y: deltaY
        }
    }

}
