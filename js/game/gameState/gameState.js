export default class GameState{
  constructor(game) {
    this.game = game
    this.gameOver = false
    this.paused = false
    this.score = 0
    this.killCount = 0
    this.missilesShotDownCount = 0
    this.highScore = localStorage.getItem("highScore") || 0
    this.winGame = false
    this.levelsCompleted = 0
  }

  update(){
    if(this.game.player.health < 0) this.gameOver = true
    if(this.score > this.highScore){
      localStorage.setItem('highScore', this.score)
      this.highScore = this.score
    }
  }

  reset(){
    this.score = 0
    this.gameOver = false
    this.killCount = 0
    this.missilesShotDownCount = 0
    this.winGame = false
    this.levelsCompleted = 0
  }
}
