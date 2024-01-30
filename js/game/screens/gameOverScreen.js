import Screen from "./screen.js";
import {numberWithCommas} from "../util/util.js";

export default class GameOverScreen extends Screen{
  constructor(game) {
    super(game);

    this.titlePosition = 150
    this.titleText = "TITLE"

    this.middleTextPosition = 300
    this.middleTextSpacing = 100


    this.lowerTextPosition = 1000
    this.lowerText = "PRESS ENTER TO PLAY AGAIN"

    this.font = "Staatliches"
    this.fontColor = "rgb(241,241,241)";

    this.alienYPosition = 325


  }


  draw(context){
    super.draw(context)
    this.drawTitle(context)
    this.drawMiddleText(context)
    this.drawLowerText(context)

  }

  drawTitle(context){
    context.font = `150px ${this.font}`;
    context.fillStyle = this.fontColor
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(this.titleText, this.width / 2, this.titlePosition)
  }

  update(deltaTime){
    if(this.game.state.winGame) this.titleText = "YOU WIN!"
    else this.titleText = "GAME OVER"

    if(this.game.input.currentKeys.includes(this.game.input.keyMap.enter) || this.game.input.currentKeys.includes(this.game.input.keyMap.numpadEnter)){
      this.game.restartGame()
    }
  }

  drawMiddleText(context){
    context.font = `50px ${this.font}`

    const scoreHeight = this.middleTextPosition
    const killHeight = scoreHeight + this.middleTextSpacing
    const missilesHeight = killHeight + this.middleTextSpacing
    const levelHeight = missilesHeight + this.middleTextSpacing
    const previousHighScoreHeight = levelHeight + this.middleTextSpacing * 2

    const leftTextPosition = this.game.width / 2 - 350
    const rightTextPosition = this.game.width / 2 + 350

    context.textAlign = 'left'
    context.fillText("SCORE:", leftTextPosition, scoreHeight)
    context.fillText("ENEMIES KILLED:", leftTextPosition, killHeight)
    context.fillText("ENEMY MISSILES SHOT DOWN:", leftTextPosition, missilesHeight)
    context.fillText("LEVELS COMPLETED:", leftTextPosition, levelHeight)
    let highScoreLabel = "HIGH SCORE:"
    if(this.game.state.score === this.game.state.highScore){
      highScoreLabel = "NEW HIGH SCORE:"
      context.fillStyle = '#00fc07'
    }
    context.fillText(highScoreLabel, leftTextPosition, previousHighScoreHeight)

    context.fillStyle = this.fontColor
    context.textAlign = 'right'

    context.fillText(numberWithCommas(this.game.state.score), rightTextPosition, scoreHeight)
    context.fillText(numberWithCommas(this.game.state.killCount), rightTextPosition, killHeight)
    context.fillText(numberWithCommas(this.game.state.missilesShotDownCount), rightTextPosition, missilesHeight)
    context.fillText(this.game.state.levelsCompleted, rightTextPosition, levelHeight)
    if(this.game.state.score === this.game.state.highScore){
      context.fillStyle = '#00fc07'
    }
    context.fillText(numberWithCommas(this.game.state.highScore), rightTextPosition, previousHighScoreHeight)
    context.fillStyle = this.fontColor
  }


  drawLowerText(context){
    context.textAlign = 'center'

    context.font = `30px ${this.font}`
    context.fillText(this.lowerText, this.width / 2, this.lowerTextPosition)

  }

}
