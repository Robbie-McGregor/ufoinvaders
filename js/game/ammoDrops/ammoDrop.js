import Sprite from "../assets/sprite.js";
import {images} from "../util/images.js";
import WeaponHandler from "../weapons/weaponHandler.js";


class AmmoDrop extends Sprite{

  constructor(position, game) {
    super({
      image: images.ammoBox,
      position,
      size: {width: 85, height: 85}
    });
    this.game = game
    this.hitWidth = this.width
    this.hitHeight = this.height

    this.velocity = {
      x: 0,
      y: 0.1
    }
    this.audio = new Audio('audio/ammo.wav');
  }

  playSound(){
    this.audio.currentTime = 0
    this.audio.play()
  }

  draw(context) {
    super.draw(context);
    context.drawImage(this.ammoImage, Math.floor(this.position.x - this.width * this.ammoImageRatio.width / 2),  Math.floor(this.position.y - this.height * this.ammoImageRatio.height / 2), this.width * this.ammoImageRatio.width, this.height * this.ammoImageRatio.height)

  }
}

export class BigMissileAmmo extends AmmoDrop{
  constructor(position, game) {
    super(position, game);
    this.ammoImage = images.missileOverlay
    this.ammoImageRatio = {
      width: 0.8,
      height: 0.5
    }
    this.ammoQty = 1
    this.ammoType = WeaponHandler.AMMO_TYPES.BIG_MISSILES
  }
}


export class NukeAmmo extends AmmoDrop{
  constructor(position, game) {
    super(position, game);
    this.ammoImage = images.nukeOverlay
    this.ammoImageRatio = {
      width: 0.8,
      height: 0.8
    }
    this.ammoQty = 1
    this.ammoType = WeaponHandler.AMMO_TYPES.NUKES
  }
}


export class LaserAmmo extends AmmoDrop{
  constructor(position, game) {
    super(position, game);
    this.ammoImage = images.laserOverlay
    this.ammoImageRatio = {
      width: 0.8,
      height: 0.8
    }
    this.ammoQty = 750
    this.ammoType = WeaponHandler.AMMO_TYPES.LASER
  }
}

export class Health extends AmmoDrop{
  static ammoType = "HEALTH"
  constructor(position, game) {
    super(position, game);
    this.ammoImage = images.heart
    this.ammoImageRatio = {
      width: 0.6,
      height: 0.6
    }
    this.ammoType = Health.ammoType
    this.ammoQty = 1
  }
}


