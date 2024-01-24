
export class InputHandler{
  constructor(game) {
    this.game = game
    this.keyMap = {
      pause: 'Escape',
      enter: 'Enter',
      numpadEnter: 'NumpadEnter'
    }
    this.keyMapMovement = {
      moveLeft: "ArrowLeft",
      moveRight: "ArrowRight",
    }
    this.keyMapWeapons = {
      fireNuke: "KeyX",
      fireMissile: 'Space',
      fireLaser: 'KeyC',
      fireBigMissile: 'KeyZ',
    }
    this.currentKeys = []
    this.currentKeysMovement = []
    this.currentKeysWeapons = []

    this.addEventListeners()
  }

  addEventListeners(){
    // KEY PRESSED DOWN
    document.addEventListener('keydown', (evt) => {

      const code = evt.code

      if(code === this.keyMap.pause) this.game.state.paused = !this.game.state.paused

      // GENERAL INPUT
      for(const key in this.keyMap){
        if(this.keyMap[key] === evt.code && !this.currentKeys.includes(code)) this.currentKeys.unshift(evt.code)
      }

      // MOVEMENT INPUT
      for(const key in this.keyMapMovement){
        if(this.keyMapMovement[key] === evt.code && !this.currentKeysMovement.includes(code)) this.currentKeysMovement.unshift(evt.code)
      }

      // WEAPON INPUT
      for(const key in this.keyMapWeapons){
        if(this.keyMapWeapons[key] === evt.code && !this.currentKeysWeapons.includes(code)) this.currentKeysWeapons.unshift(evt.code)
      }
    })

    // KEY RELEASED
    document.addEventListener('keyup', (evt) => {
      const code = evt.code
      this.currentKeys = this.currentKeys.filter(keyCode => keyCode !== code)
      this.currentKeysMovement = this.currentKeysMovement.filter(keyCode => keyCode !== code)
      this.currentKeysWeapons = this.currentKeysWeapons.filter(keyCode => keyCode !== code)
    })
  }
}
