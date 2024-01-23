import { enemySetup } from "./gameSettings.js"
import { settings } from "./gameSettings.js"
import Enemy from "./asset_classes/enemy.js"

export function startLevel({
    canvas,
    assets,
    gameState
}){
    let currentLevel = null
    gameState.enemySpeed = settings.enemyMaxSpeed
    if(gameState.level < levels.length){
        currentLevel = levels[gameState.level - 1]
    } else {
        currentLevel = levels[levels.length - 1]
    }

    assets.enemies = []

    for(let i = 0; i < currentLevel.enemies.length; i++){
        for(let j = 0; j < currentLevel.enemies[i].length; j++){
            if(currentLevel.enemies[i][j] != null){
                
                const enemyType = currentLevel.enemies[i][j]
                let xPositionOffset = enemySetup.enemyStartPosition.x + enemySetup.enemySpacing.x * j
                const yPositionOffset = enemySetup.enemyStartPosition.y + enemySetup.enemySpacing.y * i

                if(enemyType == enemySetup.enemyTypes.level_6) xPositionOffset += enemySetup.enemySpacing.x/2
                
                assets.enemies.push(
                    new Enemy({
                        canvas,
                        position: {
                            x: xPositionOffset,
                            y: yPositionOffset
                        },
                        velocity: {
                            x: gameState.enemySpeed,
                            y: 0
                        },
                        type: currentLevel.enemies[i][j]
                    })
                )
            }
           

        }
    }
}


export const levels = [
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