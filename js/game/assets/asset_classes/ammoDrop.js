import {images} from "../../util/images.js";
import {settings} from "../../gameSettings.js";

export default class AmmoDrop{
    static width = 85
    static height = 85
    constructor({position, canvas, type}){
        this.canvas = canvas
        this.type = type
        this.context = canvas.getContext('2d')
        this.width = 85
        this.height = 85
        this.hitWidth = this.width
        this.hitHeight = this.height
        this.velocity = {
            x: 0,
            y: 0.1
        }
        this.images = {
            box: images.ammoBox,
            nuke: images.nukeOverlay,
            missile: images.missileOverlay,
            heart: images.heart,
            laser: images.laserOverlay
        }
        this.position = position
        this.audio = new Audio('../assets/sounds/ammo.wav');
    }

    drawBigMissile(){
        const heightRatio  = 0.5
        const widthRatio = 0.8
        this.context.drawImage(this.images.missile, Math.floor(this.position.x - (this.width * widthRatio) / 2),Math.floor(this.position.y - (this.height * heightRatio) / 2),Math.floor(this.width * widthRatio),Math.floor(this.height * heightRatio))
    }

    drawNuke(){

        const heightRatio  = 0.8
        const widthRatio = 0.8
        this.context.drawImage(this.images.nuke, Math.floor(this.position.x - (this.width * widthRatio) / 2),Math.floor(this.position.y - (this.height * heightRatio) / 2),Math.floor(this.width * widthRatio),Math.floor(this.height * heightRatio))
    }

    drawLaser(){

        const heightRatio  = 0.8
        const widthRatio = 0.8
        this.context.drawImage(this.images.laser, Math.floor(this.position.x - (this.width * widthRatio) / 2),Math.floor( this.position.y - (this.height * heightRatio) / 2),Math.floor( this.width * widthRatio),Math.floor( this.height * heightRatio))
    }

    drawBox(){
        this.context.drawImage(this.images.box, Math.floor(this.position.x - this.width / 2),Math.floor( this.position.y - this.height / 2), this.width, this.height)
    }

    drawHeart(){

        const heightRatio  = 0.6
        const widthRatio = 0.6
        this.context.drawImage(this.images.heart, Math.floor(this.position.x - (this.width * widthRatio) / 2),Math.floor( this.position.y - (this.height * heightRatio) / 2),Math.floor( this.width * widthRatio),Math.floor( this.height * heightRatio))
    }

    draw(){
        if(settings.developmentMode) this.drawHitBox()
        this.drawBox()

        this.context.globalAlpha = 0.9
        if(this.type == settings.bulletTypes.bigMissile) this.drawBigMissile()
        if(this.type == settings.bulletTypes.nuke) this.drawNuke()
        if(this.type == settings.bulletTypes.life) this.drawHeart()
        if(this.type == settings.bulletTypes.laser) this.drawLaser()

        this.context.globalAlpha = 1
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
