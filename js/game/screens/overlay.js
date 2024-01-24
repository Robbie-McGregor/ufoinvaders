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
    }

    draw(context){
        this.setFont(context)
        this.drawBigMissileAmmo(context)
        this.drawNukeAmmo(context)
        this.drawMissileAmmo(context)
        this.drawLaserAmmo(context)
        this.drawHealth(context)
        this.drawScore(context)
        this.drawCurrentLevel(context)
    }

    setFont(context){
        context.font = "20px Arial";
        context.fillStyle = "white";
        context.textAlign = 'center'
        context.textBaseline = 'middle'
    }

    drawBigMissileAmmo(context){
        const imageWidth = 90
        const imageHeight = 40
        const y = 30
        const imageX = 90
        const textX = 22.5
        context.drawImage(this.images.missile, imageX -  imageWidth /2, y - imageHeight / 2, imageWidth, imageHeight)
        context.fillText(this.game.weapons.playerAmmo.BIG_MISSILES, textX, y);
        context.fillText("Z", 155, y);
    }

    drawNukeAmmo(context){
        const imageWidth = 75
        const imageHeight = 75
        const y = 85
        const imageX = 90
        const textX = 22.5
        context.drawImage(this.images.nuke, imageX -  imageWidth /2, y - imageHeight / 2, imageWidth, imageHeight)
        context.fillText(this.game.weapons.playerAmmo.NUKES, textX, y);
        context.fillText("X", 155, y);
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

    drawHealth(context){
        const imageWidth = 100
        const imageHeight = 100
        let y = imageHeight / 2 + 5
        const x = this.game.width - imageWidth / 2 -5
        for(let i = 0; i < this.game.player.health; i++){
            context.drawImage(this.images.player, x -  imageWidth /2, y - imageHeight / 2, imageWidth, imageHeight)
            y += imageHeight + 5
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
        const imageWidth = 85
        const imageHeight = 35
        const y = 140
        const imageX = 90
        const textX = 22.5
        context.drawImage(this.images.laser, imageX -  imageWidth /2, y - imageHeight / 2, imageWidth, imageHeight)
        context.fillText(`${Math.floor(this.game.weapons.playerAmmo.LASER / 10)}`, textX, y + 2);
        context.fillText("C", 155, y);
    }


}
