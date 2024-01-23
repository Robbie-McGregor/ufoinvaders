import {BigMissileAmmo, Health, LaserAmmo, NukeAmmo} from "./ammoDrop.js";

export default class AmmoDropHandler{

  constructor(game) {
    this.game = game
    this.ammoDropTypes = {
      bigMissileAmmo: BigMissileAmmo,
      nukeAmmo: NukeAmmo,
      laserAmmo: LaserAmmo,
    }

    this.ammoDropArray = []
  }

  update(deltaTime){
    this.ammoDropArray.forEach(ammoDrop => {
      ammoDrop.update(deltaTime)
      if(ammoDrop.markedForDeletion) {
        ammoDrop.playSound()
        if(ammoDrop.ammoType === this.game.state.playerLives) this.game.state.playerLives += 1
        else this.game.weapons.playerAmmo[ammoDrop.ammoType] += ammoDrop.ammoQty
      }
    })
    this.ammoDropArray = this.ammoDropArray.filter(ammoDrop => !ammoDrop.markedForDeletion)
  }

  draw(context){
    this.ammoDropArray.forEach(ammoDrop => ammoDrop.draw(context))
  }

  addAmmoDrop(position, health = false){
    if(health) this.ammoDropArray.push(new Health(position))
    else {
      const ammoDropType = this.randomAmmoType()
      setTimeout(() => {
        this.ammoDropArray.push(new ammoDropType(position, this.game))
      }, 500)

    }

  }

  randomAmmoType = function () {
    const keys = Object.keys(this.ammoDropTypes);
    return this.ammoDropTypes[keys[ keys.length * Math.random() << 0]];
  };
}
