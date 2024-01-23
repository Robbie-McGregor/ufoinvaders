export default class GameState{
  constructor(game) {
    this.game = game
    this.paused = false
    this.score = 0
    this.playerLives = 3
  }
}
