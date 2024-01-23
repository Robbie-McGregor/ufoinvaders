import {Missile, BigMissile, Nuke} from "./projectile.js";


export default class WeaponHandler{
  static AMMO_TYPES = {
    BIG_MISSILES: "BIG_MISSILES",
    NUKES: "NUKES",
    LASER: "LASER"
  }

  constructor(game) {
    this.game = game
    this.playerAmmo = {
      "BIG_MISSILES": 5,
      "NUKES": 3,
      "LASER": 750
    }
    this.missileArray = []

  }


  update(deltaTime){

    this.missileArray.forEach(missile => {
      missile.update(deltaTime)
    })
    this.missileArray = this.missileArray.filter(missile => !missile.markedForDeletion)

    this.handlePlayerInput()
  }

  draw(context){
    this.missileArray.forEach(missile => missile.draw(context))
  }


  handlePlayerInput(){
    // Player can only fire one bullet at a time
    if(this.missileArray.length > 0  || this.game.input.currentKeysWeapons.length < 1) return

    // Fire Missile
    if(this.game.input.currentKeysWeapons[0] === this.game.input.keyMapWeapons.fireMissile){
      this.missileArray.push(new Missile({...this.game.player.position}, this.game))
      this.missileArray[0].playSound()
      return
    }

    // Fire BIG MISSILE
    if(this.game.input.currentKeysWeapons[0] === this.game.input.keyMapWeapons.fireBigMissile && this.playerAmmo.BIG_MISSILES > 0){
      this.missileArray.push(new BigMissile({...this.game.player.position}, this.game))
      this.playerAmmo.BIG_MISSILES -= 1
      this.missileArray[0].playSound()
      return
    }

    // Fire Nuke
    if(this.game.input.currentKeysWeapons[0] === this.game.input.keyMapWeapons.fireNuke && this.playerAmmo.NUKES > 0){
      this.missileArray.push(new Nuke({...this.game.player.position}, this.game))
      this.playerAmmo.NUKES -= 1
      this.missileArray[0].playSound()
    }
  }
}
