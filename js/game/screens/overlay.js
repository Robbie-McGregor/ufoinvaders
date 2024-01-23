import {images} from "../util/images.js";

export default class Overlay{
    constructor(game){
        this.game = game

        this.images = {
            missile: images.missileOverlay,
            nuke: images.nukeOverlay,
            heart: images.heart,
            player: images.playerOverlay,
            laser: images.laserOverlay
        }

        this.font = "Arial"
        this.fontSize = "12.5px"
        this.globalAlpha = 1

        this.highlightBigAmmo = false
        this.highlightNuke = false
        this.highlightLives = false
    }

    draw(context){
        context.globalAlpha = this.globalAlpha
        this.setFont(context)
        this.drawBigMissileAmmo(context)
        this.drawNukeAmmo(context)
        this.drawMissileAmmo(context)
        this.drawLaserAmmo(context)
        this.drawLives(context)
        this.drawScore(context)
        this.drawCurrentLevel(context)
        context.globalAlpha = 1
        this.overlayTimeout = 2500
    }

    setFont(context){
        context.font = "20px Arial";
        context.fillStyle = "white";
        context.textAlign = 'center'
        context.textBaseline = 'middle'
    }

    drawBigMissileAmmo(context){
        if(this.highlightBigAmmo) context.globalAlpha = 1

        const imageWidth = 90
        const imageHeight = 40
        const y = 30
        const imageX = 90
        const textX = 22.5
        context.drawImage(this.images.missile, imageX -  imageWidth /2, y - imageHeight / 2, imageWidth, imageHeight)
        context.fillText(this.game.weapons.playerAmmo.BIG_MISSILES, textX, y);
        context.fillText("Z", 155, y);

        context.globalAlpha = this.globalAlpha
    }

    drawNukeAmmo(context){
        if(this.highlightNuke) context.globalAlpha = 1

        const imageWidth = 75
        const imageHeight = 75
        const y = 85
        const imageX = 90
        const textX = 22.5
        context.drawImage(this.images.nuke, imageX -  imageWidth /2, y - imageHeight / 2, imageWidth, imageHeight)
        context.fillText(this.game.weapons.playerAmmo.NUKES, textX, y);
        context.fillText("X", 155, y);

        context.globalAlpha = this.globalAlpha
    }


    drawMissileAmmo(context){
        const imageWidth = 55
        const imageHeight = 35
        const y = 185
        const imageX = 80
        const textX = 22.5
        context.drawImage(this.images.missile, imageX -  imageWidth /2, y - imageHeight / 2, imageWidth, imageHeight)
        context.font = `35px ${this.font}`;
        context.fillText("∞", textX, y + 2);
        this.setFont(context)
        context.fillText("SPACE", 155, y);
    }

    drawLives(context){
        const imageWidth = 100
        const imageHeight = 100
        let y = imageHeight / 2 + 5
        const x = this.game.width - imageWidth / 2 -5
        for(let i = 0; i < this.game.player.lives; i++){

            if(this.highlightLives && i === this.game.state.playerLives - 1) context.globalAlpha = 1

            context.drawImage(this.images.player, x -  imageWidth /2, y - imageHeight / 2, imageWidth, imageHeight)

            y += imageHeight + 5

            context.globalAlpha = this.globalAlpha
        }

    }

    drawScore(context){
        const y = 80
        context.fillStyle = 'white'
        const x = this.game.width / 2
        context.font = `40px ${this.font}`;
        context.fillText(`SCORE ${this.game.state.score}`, x, y);
        this.setFont(context)
    }

    drawCurrentLevel(context){
        const y = 30
        context.fillStyle = 'white'
        const x = this.game.width / 2
        context.font = `40px ${this.font}`;
        context.fillText(`LEVEL ${this.game.level.currentLevel.level}`, x, y);
        this.setFont(context)
    }

    drawLaserAmmo(context){
        if(this.highlightLaser) context.globalAlpha = 1

        const imageWidth = 85
        const imageHeight = 35
        const y = 140
        const imageX = 90
        const textX = 22.5
        context.drawImage(this.images.laser, imageX -  imageWidth /2, y - imageHeight / 2, imageWidth, imageHeight)
        context.fillText(`${Math.floor(this.game.weapons.playerAmmo.LASER / 10)}`, textX, y + 2);
        context.fillText("C", 155, y);

        context.globalAlpha = this.globalAlpha
    }


    setHighlightBigMissile(context){
        this.highlightBigAmmo = true
        setTimeout(() => {
            this.highlightBigAmmo = false
        }, this.overlayTimeout)
    }


    setHighlightNuke(context){
        this.highlightNuke = true
        setTimeout(() => {
            this.highlightNuke = false
        }, this.overlayTimeout)
    }

    setHighlightLaser(context){
        this.highlightLaser = true
        setTimeout(() => {
            this.highlightLaser = false
        }, this.overlayTimeout)
    }


    setHighlightLives(context){
        this.highlightLives = true
        setTimeout(() => {
            this.highlightLives = false
        }, this.overlayTimeout)
    }

}
