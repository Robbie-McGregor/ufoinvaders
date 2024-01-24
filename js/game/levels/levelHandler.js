import {enemySetup} from "../gameSettings.js";
import Enemy from "../enemies/enemy.js";

export default class LevelHandler {
  constructor(game) {
    this.game = game
    this.currentLevel = null


  }

  update(){
    if(!this.currentLevel) return
    this.currentLevel.update()
    if(this.currentLevel.levelComplete){
      console.log(this.currentLevel)
      this.setCurrentLevel(this.currentLevel.level)
    }
  }

  setCurrentLevel(level) {
    this.game.enemies.setEnemySpeed(0)
    this.currentLevel = undefined
    this.currentLevel = new Level(levels[level])
    this.currentLevel.enemies.forEach(enemy => this.game.enemies.enemyArray.push(enemy))

    setTimeout(() => {
      this.game.enemies.setEnemySpeed(0.5)
    }, 500)

  }




}


class Level{
  constructor(config) {
    this.config = config
    this.enemies = []
    this.level = config.level
    this.levelComplete = false

    this.addEnemies()
  }

  addEnemies(){
    for(let i = 0; i < this.config.enemies.length; i++){
      for(let j = 0; j < this.config.enemies[i].length; j++){
        if(this.config.enemies[i][j]){

          const enemyType = this.config.enemies[i][j]
          let xPositionOffset = enemySetup.enemyStartPosition.x + enemySetup.enemySpacing.x * j
          const yPositionOffset = enemySetup.enemyStartPosition.y + enemySetup.enemySpacing.y * i

          if(enemyType === enemySetup.enemyTypes.level_6) xPositionOffset += enemySetup.enemySpacing.x/2

          this.enemies.push(
            new Enemy({
              position: {
                x: xPositionOffset,
                y: yPositionOffset
              },
              velocity: {
                x: 0,
                y: 0
              },
              type: this.config.enemies[i][j]
            })
          )
        }
      }

    }
  }

  update(){
    this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion)
    if(this.enemies.length === 0) this.levelComplete = true
  }
}



const levels = [
  {
    level: 1,
    enemies: [
      [enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1],
      [enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1],
      [enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1],
      [enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1],
      [enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1],
    ],
  },
  {
    level: 2,
    enemies: [
      [enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2],
      [enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1],
      [enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1],
      [enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1],
      [enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1],
    ]
  },
  {
    level: 3,
    enemies: [
      [enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3],
      [enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2],
      [enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1],
      [enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1],
      [enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1],
    ]
  },
  {
    level: 4,
    enemies: [
      [enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4],
      [enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3],
      [enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2],
      [enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1],
      [enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1],
    ]
  },
  {
    level: 5,
    enemies: [
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
      [enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4],
      [enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3],
      [enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2],
      [enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1],
    ]
  },
  {
    level: 6,
    enemies: [
      [null, null, null, enemySetup.enemyTypes.level_6,  null, null, null,null],
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
      [enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4],
      [enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3],
      [enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2],
      [enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1],
    ]
  },
  {
    level: 7,
    enemies: [
      [enemySetup.enemyTypes.level_6, null, null, null,  null, null, enemySetup.enemyTypes.level_6,null],
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
      [enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4],
      [enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3],
      [enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2],
      [enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1],
    ]
  },
  {
    level: 8,
    enemies: [
      [enemySetup.enemyTypes.level_6, null, null, enemySetup.enemyTypes.level_6,  null, null, enemySetup.enemyTypes.level_6,null],
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
      [enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4],
      [enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3],
      [enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2],
      [enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1],
    ]
  },
  {
    level: 9,
    enemies: [
      [enemySetup.enemyTypes.level_6, null, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_6,  null, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_6,null],
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
      [enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4],
      [enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3],
      [enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2],
      [enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1],
    ]
  },
  {
    level: 10,
    enemies: [
      [enemySetup.enemyTypes.level_6, null, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_6,  null, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_6,null],
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
      [enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4],
      [enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3],
      [enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2, enemySetup.enemyTypes.level_2],
    ]
  },
  {
    level: 11,
    enemies: [
      [enemySetup.enemyTypes.level_6, null, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_6,  null, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_6,null],
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
      [enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4],
      [enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3, enemySetup.enemyTypes.level_3],
    ]
  },
  {
    level: 12,
    enemies: [
      [enemySetup.enemyTypes.level_6, null, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_6,  null, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_6,null],
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
      [enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4, enemySetup.enemyTypes.level_4],
    ]
  },
  {
    level: 13,
    enemies: [
      [enemySetup.enemyTypes.level_6, null, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_6,  null, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_6,null],
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
    ]
  },
  {
    level: 14,
    enemies: [
      [enemySetup.enemyTypes.level_6, null, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_6,  null, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_6,null],
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
      [enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5, enemySetup.enemyTypes.level_5],
      [enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1, enemySetup.enemyTypes.level_1],
    ]
  },

]
