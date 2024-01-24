import {BigMissileAmmo, Health, LaserAmmo, NukeAmmo} from "./ammoDrop.js";

export default class AmmoDropHandler{

  constructor(game) {
    this.game = game
    this.ammoDropTypes = {
      bigMissileAmmo: BigMissileAmmo,
      nukeAmmo: NukeAmmo,
      laserAmmo: LaserAmmo,
    }
    this.healthChance = 0.075

    this.ammoDropArray = []
  }

  update(deltaTime){
    this.ammoDropArray.forEach(ammoDrop => {
      ammoDrop.update(deltaTime)
      if(ammoDrop.markedForDeletion) {
        ammoDrop.playSound()
        if(ammoDrop.ammoType === Health.ammoType) this.game.player.health += 1
        else this.game.weapons.playerAmmo[ammoDrop.ammoType] += ammoDrop.ammoQty
      }
    })
    this.ammoDropArray = this.ammoDropArray.filter(ammoDrop => !ammoDrop.markedForDeletion)
  }

  draw(context){
    this.ammoDropArray.forEach(ammoDrop => ammoDrop.draw(context))
  }

  addAmmoDrop(position){
    if(this.game.player.health === 0) this.healthChance = .25
    else this.healthChance = 0.075


    if(Math.random() < this.healthChance && this.game.player.health < this.game.player.maxHealth) {
      this.ammoDropArray.push(new Health(position))
    }
    else {
      const ammoDropType = this.randomAmmoType()
      setTimeout(() => {
        this.ammoDropArray.push(new ammoDropType(position, this.game))
      }, 100)

    }

  }

  randomAmmoType = function () {
    const keys = Object.keys(this.ammoDropTypes);
    return this.ammoDropTypes[keys[ keys.length * Math.random() << 0]];
  };
}
