export default class Screen{
  constructor(game) {
    this.game = game
    this.width = this.game.width
    this.height = this.game.height
    this.sprites = []
  }

  update(deltaTime){
    for(const type in this.sprites){
      this.sprites[type].forEach(sprite => sprite.update(deltaTime))
    }
  }

  draw(context){
    for(const type in this.sprites){
      this.sprites[type].forEach(sprite => sprite.draw(context))
    }
  }

  animate(deltaTime){
    for(const type in this.sprites){
      this.sprites[type].forEach(sprite => sprite.animate(deltaTime))
    }
  }

}
