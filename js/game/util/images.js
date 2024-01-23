export function createImage(src){
  const image = new Image()
  image.src = src

  return image
}


export const IMAGE_LOCATION = `img/`

export const images = {
  // ENEMIES
  enemyGreen: createImage(`${IMAGE_LOCATION}enemies/enemy_green.png`),
  enemyBlue: createImage(`${IMAGE_LOCATION}enemies/enemy_blue.png`),
  enemyRed: createImage(`${IMAGE_LOCATION}enemies/enemy_red.png`),
  enemyPurple: createImage(`${IMAGE_LOCATION}enemies/enemy_purple.png`),
  enemyWhite: createImage(`${IMAGE_LOCATION}enemies/enemy_white.png`),
  enemyLightBlue: createImage(`${IMAGE_LOCATION}enemies/enemy_light_blue.png`),

  // OTHER
  player: createImage(`${IMAGE_LOCATION}other/Player.Png`),
  explosion: createImage(`${IMAGE_LOCATION}other/explosion.png`),
  ammoBox: createImage(`${IMAGE_LOCATION}other/crate.png`),
  heart: createImage(`${IMAGE_LOCATION}other/heart.png`),

  // WEAPONS
  missile: createImage(`${IMAGE_LOCATION}weapons/missile_large.png`),
  nuke: createImage(`${IMAGE_LOCATION}weapons/nuke.png`),
  enemyBullet: createImage(`${IMAGE_LOCATION}weapons/enemy_bullet.png`),
  laser: createImage(`${IMAGE_LOCATION}weapons/laser.png`),
  mine: createImage(`${IMAGE_LOCATION}weapons/mine.png`),

  // BACKGROUND
  background: createImage(`${IMAGE_LOCATION}background/background.jpg`),
  backgroundReverse: createImage(`${IMAGE_LOCATION}background/background_reverse.jpg`),
  backgroundFlip: createImage(`${IMAGE_LOCATION}background/background_flip.jpg`),


  // OVERLAY
  missileOverlay: createImage(`${IMAGE_LOCATION}overlay/missile_overlay.png`),
  nukeOverlay: createImage(`${IMAGE_LOCATION}overlay/nuke_overlay.png`),
  laserOverlay: createImage(`${IMAGE_LOCATION}overlay/laser_overlay.png`),
  playerOverlay: createImage(`${IMAGE_LOCATION}overlay/player_overlay.png`),





}
