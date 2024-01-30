import {images} from "./util/images.js";


export const settings = {
    specialEnemySpeed: 0.5,
    enemyMoveDownIncrement: 15,
    specialEnemyWhenNumberOfEnemiesLeftEquals: 6,
    friction: 0.95,
    accelerationRate: 0.03,
    playerMaxLives: 3,
    maxOnscreenEnemyBullets: 5,
    maxOnscreenEnemyMines: 3,
    enemyShootBulletChance: .0075,
    enemyBulletSpeed: 0.3,
    shootEnemyBulletPoints: 25,
    specialEnemyPoints: 500,
    maxLevelStartSpeed: 0.6,
    enemiesShootLasersHealthLevelOnwards: 3,
    enemiesShootLaserChance: 0.0075 / 4,
    maxLasersOnScreen: 2,
    ammoDropChance: 0.1,
    nukeDropChance: 0.33,
    laserDropChange: 0.33,
    lifeDropChance: 0.075,
    bulletTypes: {
        missile: "MISSILE",
        bigMissile: "BIG_MISSILE",
        nuke: "NUKE",
        life: "LIFE",
        laser: "LASER",
        enemyBullet: "ENEMY_BULLET",
        enemyMine: "ENEMY_MINE"
    }


}



export const enemySetup = {
    enemyRows: 5,
    enemyColumns: 8,
    enemySpacing: {x: 160, y: 100},
    enemyStartPosition: { x: 400 , y: 145 },
    enemyTypes: {
        level_1: {
            name: "LEVEL_ONE",
            health: 1,
            points: 10,
        },
        level_2: {
            name: "LEVEL_TWO",
            health: 2,
            points: 30
        },
        level_3: {
            name: "LEVEL_THREE",
            health: 3,
            points: 100
        },
        level_4: {
            name: "LEVEL_FOUR",
            health: 4,
            points: 500
        },
        level_5: {
            name: "LEVEL_FIVE",
            health: 5,
            points: 500
        },
        level_6: {
            name: "LEVEL_SIX",
            health: 6,
            points: 1500
        },
        special: {
            name: "SPECIAL",
            health: 1,
            image: images.enemyPurple,
            points: 500
        }

    }
}

