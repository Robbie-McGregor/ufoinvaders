import GameScreen from "../screens/gameScreen.js";
import TitleScreen from "../screens/titleScreen.js";

export default class AudioHandler{
  constructor(game) {
    this.game = game
    this.soundtrack = new Audio('audio/project_mass.wav')
    this.soundtrack.loop = true

    // UP TO 10 reusable audio objects (to prevent creating too many mediaplayers)
    this.audioArray = [
      new Audio(),
      new Audio(),
      new Audio(),
      new Audio(),
      new Audio(),
      new Audio(),
      new Audio(),
      new Audio(),
      new Audio(),
      new Audio(),
    ]

    this.currentAudioIndex = 0
  }

  reset(){
    this.soundtrack.currentTime = 0
  }

  update(){
    this.playSoundTrack()
  }

  addAudio(src){

    const audio = this.audioArray[this.currentAudioIndex]
    audio.src = src
    audio.currentTime = 0
    audio.play()



    if(this.currentAudioIndex < this.audioArray.length - 1) this.currentAudioIndex++
    else this.currentAudioIndex = 0
  }


  playSoundTrack(){
    if(this.game.screen.currentScreen !== this.game.screen.screens.gameScreen){
      this.soundtrack.pause()
      return
    }

    if(this.game.state.paused){
      this.soundtrack.pause()
    } else this.soundtrack.play()
  }
}
