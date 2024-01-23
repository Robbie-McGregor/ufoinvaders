import { settings } from "./gameSettings.js"
import { getBottomRowEnemies } from "./utils.js"
import Explosion from "./asset_classes/explosion.js"
import AmmoDrop from "./asset_classes/ammoDrop.js"

export function collisionChecks({
        assets,
        canvas,
        gameState,
        callbackFunctions,
    }){
    ammoDropCollisionCheck()
    enemyCollisionCheck()
    specialEnemyCollisionCheck()
    enemyBulletCollisionCheck()
    mineCollisionCheck()
    enemyLasersCollisionCheck()
    playerLaserCollisionCheck()


    function ammoDropCollisionCheck(){
        if(assets.ammoDrop.length < 1) return

        for(let i = assets.ammoDrop.length -1; i >= 0; i--){

            let impact = false

            // Check collision Missile
            if(assets.missile && collisionCheckRectangular({object1: assets.ammoDrop[i], object2: assets.missile})){
                impact = true
            }

            // Check collision player
            if(collisionCheckRectangular({object1: assets.ammoDrop[i], object2: assets.player})){
                impact = true
            }

            if(impact){
                if(assets.ammoDrop[i].type == settings.bulletTypes.nuke){
                    gameState.playerAmmo.nukes ++
                    assets.overlay.setHighlightNuke()
                }

                if(assets.ammoDrop[i].type == settings.bulletTypes.laser){
                    gameState.playerAmmo.laser += 750
                    assets.overlay.setHighlightLaser()
                }

                if(assets.ammoDrop[i].type == settings.bulletTypes.bigMissile){
                    assets.overlay.setHighlightBigMissile()
                    gameState.playerAmmo.bigMissiles ++
                }

                if(assets.ammoDrop[i].type == settings.bulletTypes.life){
                    if(gameState.lives >= settings.playerMaxLives) return
                    assets.overlay.setHighlightLives()
                    gameState.lives += 1
                }



                assets.explosions.push(new Explosion({position: assets.ammoDrop[i].position, canvas}))
                assets.ammoDrop[i].playSound()
                assets.ammoDrop.splice(i, 1)
            }
        }
    }


    function specialEnemyCollisionCheck(){
        if(!assets.specialEnemy) return

        let impact = false
        // Check collision Missile
        if(assets.missile && collisionCheckRectangular({object1: assets.specialEnemy, object2: assets.missile})){
            assets.missile = null
            impact = true
        }

        // Check collision Big Missile
        if(assets.bigMissile && collisionCheckRectangular({object1: assets.specialEnemy, object2: assets.bigMissile})){
            assets.bigMissile = null
            impact = true
        }

        // Check collision Nuke
        if(assets.nuke && collisionCheckRectangular({object1: assets.specialEnemy, object2: assets.nuke})){
            impact = true
        }

        if(impact){
            const position  = {...assets.specialEnemy.position}
            if(position.x < AmmoDrop.width / 2) position.x = AmmoDrop.width / 2
            if(position.x > canvas.width - AmmoDrop.width / 2) position.x = canvas.width - AmmoDrop.width / 2
            callbackFunctions.dropAmmo({
                position
            })

            callbackFunctions.destroyEnemy({enemy: assets.specialEnemy})
            assets.specialEnemy = null
        }
    }

    function enemyCollisionCheck(){
        if(assets.enemies.length < 1) return


        for(let i = assets.enemies.length - 1; i >= 0; i --){
            const enemy = assets.enemies[i]
            let impact = false
            let bullet = null

            // Check collision Missile
            if(assets.missile){
                if(enemy){
                    if(collisionCheckRectangular({object1: enemy, object2: assets.missile})){
                        impact = true
                        bullet = assets.missile
                    }
                }

            }


            // Check collision Big Missile
            if(assets.bigMissile && collisionCheckRectangular({object1: enemy, object2: assets.bigMissile})){
                impact = true
                bullet = assets.bigMissile
            }

            // Check collision nuke
            if(assets.nuke && collisionCheckRectangular({object1: enemy, object2: assets.nuke})){
                impact = true
                bullet = assets.nuke
            }

            if(impact) {
                enemy.health--
                bullet.health --
                if(enemy.health == 0){
                    callbackFunctions.destroyEnemy({enemy})
                }
                else {
                    callbackFunctions.addExplosion({
                        position: {
                            x: bullet.position.x,
                            y: bullet.position.y - bullet.height / 2
                        },
                        size: 0.7
                    })
                    callbackFunctions.killLaserWhenEnemyShot({enemy})
                }
                if(bullet.health === 0){
                    if (bullet === assets.missile) assets.missile = null
                    if (bullet === assets.bigMissile && bullet.health == 0){
                        callbackFunctions.addExplosion({position: assets.bigMissile.position, size: 2})
                        assets.bigMissile = null
                    }
                    if(bullet === assets.nuke) callbackFunctions.explodeNuke()

                }

            }

            // Check collision player
            if(!enemy) return
            if(collisionCheckRectangular({object1: enemy, object2: assets.player})) {
                callbackFunctions.playerHit({
                    disableInvincibility: true
                })
                callbackFunctions.destroyEnemy({enemy})
                return
        }

        }
    }

    function enemyBulletCollisionCheck(){
        if(assets.enemyBullets.length < 1) return

        let bulletShotDown = false
        let position = null

            // Collision with player missile
        if(assets.missile){
            for(let i = assets.enemyBullets.length - 1; i >= 0; i--){
                if(!assets.missile) break
                if(collisionCheckRectangular({
                    object1: assets.enemyBullets[i],
                    object2: assets.missile
                })){
                    bulletShotDown = true
                    const x = assets.missile.position.x
                    const y = assets.missile.position.y - assets.missile.height / 2
                    position = {x, y}
                    callbackFunctions.dropAmmo({position})
                    callbackFunctions.addExplosion({position,
                    size: 0.5})
                    assets.enemyBullets.splice(i, 1)
                    assets.missile = null
                    break
                }
            }
        }

        // Collision with player laser
        // for(let i = assets.enemyBullets.length - 1; i >= 0; i--){
        //     if(!assets.playerLaser) break
        //     if(collisionCheckRectangular({
        //         object1: assets.enemyBullets[i],
        //         object2: assets.playerLaser
        //     })){
        //         bulletShotDown = true
        //         const x = assets.enemyBullets[i].position.x
        //         const y = assets.enemyBullets[i].position.y +  assets.enemyBullets[i].height / 2
        //         position = {x, y}
        //         callbackFunctions.addExplosion({position,
        //         size: 0.5})
        //         assets.enemyBullets.splice(i, 1)
        //     }
        // }

        // Collision with big missile
        if(assets.bigMissile){
            for(let i = assets.enemyBullets.length - 1; i >= 0; i--){
                if(!assets.bigMissile) break
                if(collisionCheckRectangular({
                    object1: assets.enemyBullets[i],
                    object2: assets.bigMissile
                })){
                    bulletShotDown = true
                    const x = assets.enemyBullets[i].position.x
                    const y = assets.enemyBullets[i].position.y +  assets.enemyBullets[i].height / 2
                    position = {x, y}
                    callbackFunctions.addExplosion({position,
                    size: 0.5})
                    assets.enemyBullets.splice(i, 1)
                    assets.bigMissile.health  = assets.bigMissile.health - 1
                    if(assets.bigMissile.health <= 0){
                        const x =  assets.bigMissile.position.x
                        const y = assets.bigMissile.position.y - assets.bigMissile.height / 2
                        callbackFunctions.addExplosion({
                            position: {
                                x, y
                            },
                            size: 2
                        })
                    }
                    break
                }
            }
        }

            // Collision with nuke
            if(assets.nuke){
                for(let i = assets.enemyBullets.length - 1; i >= 0; i--){
                    if(!assets.nuke) break
                    if(collisionCheckRectangular({
                        object1: assets.enemyBullets[i],
                        object2: assets.nuke
                    })){
                        bulletShotDown = true
                        const x = assets.enemyBullets[i].position.x
                        const y = assets.enemyBullets[i].position.y +  assets.enemyBullets[i].height / 2
                        callbackFunctions.addExplosion({position: {
                            x: x,
                            y: y},
                        size: 0.5})
                        assets.enemyBullets.splice(i, 1)
                        assets.nuke.health = assets.nuke.health - 1
                        if(assets.nuke.health <= 0){
                            callbackFunctions.explodeNuke()
                        }
                        break
                    }
                }
            }

        // Collision with PLayer
        for(let i = assets.enemyBullets.length - 1; i >= 0; i--){
            if(collisionCheckRectangular({
                object1: assets.enemyBullets[i],
                object2: assets.player
            })){
                assets.enemyBullets.splice(i, 1)
                callbackFunctions.playerHit({})
            }
        }

        if(bulletShotDown) {
            gameState.score += settings.shootEnemyBulletPoints
        }


    }

    function enemyLasersCollisionCheck(){
        if(!assets.player) return


        assets.enemyLasers.forEach((laser) => {
            if(collisionCheckRectangular({
                object1: assets.player,
                object2: laser
            })){
                callbackFunctions.playerHit({})
            }
        })
    }

    function playerLaserCollisionCheck(){
        let inContact = false

        const bottomRowEnemies = getBottomRowEnemies({enemies: assets.enemies})

        bottomRowEnemies.forEach(enemy => {
            if(collisionCheckRectangular({
                object1: enemy,
                object2: assets.playerLaser
            })){
                    inContact = true
                    callbackFunctions.enemyLaserHit({enemy, damageDealt: assets.playerLaser.damageDealt})
                    callbackFunctions.killLaserWhenEnemyShot({enemy})
                    assets.playerLaser.height = -(enemy.position.y - assets.player.position.y)
            }
        })


        if(inContact) assets.playerLaser.inContact = true
        else assets.playerLaser.inContact = false
    }

    function mineCollisionCheck(){
        if(assets.mines.length < 1) return

        let bulletShotDown = false
        let position = null

            // Collision with player missile
        if(assets.missile){
            for(let i = assets.mines.length - 1; i >= 0; i--){
                if(!assets.missile) break
                if(collisionCheckRectangular({
                    object1: assets.mines[i],
                    object2: assets.missile
                })){
                    bulletShotDown = true
                    const x = assets.missile.position.x
                    const y = assets.missile.position.y - assets.missile.height / 2
                    position = {x, y}
                    callbackFunctions.addExplosion({position,
                    size: 0.5})
                    assets.mines.splice(i, 1)
                    assets.missile = null
                    break
                }
            }
        }



        // Collision with big missile
        if(assets.bigMissile){
            for(let i = assets.mines.length - 1; i >= 0; i--){
                if(!assets.bigMissile) break
                if(collisionCheckRectangular({
                    object1: assets.mines[i],
                    object2: assets.bigMissile
                })){
                    bulletShotDown = true
                    const x = assets.mines[i].position.x
                    const y = assets.mines[i].position.y +  assets.mines[i].height / 2
                    position = {x, y}
                    callbackFunctions.addExplosion({position,
                    size: 0.5})
                    assets.mines.splice(i, 1)
                    assets.bigMissile.health  = assets.bigMissile.health - 1
                    if(assets.bigMissile.health <= 0){
                        const x =  assets.bigMissile.position.x
                        const y = assets.bigMissile.position.y - assets.bigMissile.height / 2
                        callbackFunctions.addExplosion({
                            position: {
                                x, y
                            },
                            size: 2
                        })
                    }
                    break
                }
            }
        }

            // Collision with nuke
            if(assets.nuke){
                for(let i = assets.mines.length - 1; i >= 0; i--){
                    if(!assets.nuke) break
                    if(collisionCheckRectangular({
                        object1: assets.mines[i],
                        object2: assets.nuke
                    })){
                        bulletShotDown = true
                        const x = assets.mines[i].position.x
                        const y = assets.mines[i].position.y +  assets.mines[i].height / 2
                        callbackFunctions.addExplosion({position: {
                            x: x,
                            y: y},
                        size: 0.5})
                        assets.mines.splice(i, 1)
                        assets.nuke.health = assets.nuke.health - 1
                        if(assets.nuke.health <= 0){
                            callbackFunctions.explodeNuke()
                        }
                        break
                    }
                }
            }

        // Collision with PLayer
        for(let i = assets.mines.length - 1; i >= 0; i--){
            if(collisionCheckCircular({
                object1: assets.mines[i],
                object2: assets.player
            })){
                assets.mines.splice(i, 1)
                callbackFunctions.playerHit({})
            }
        }

        if(bulletShotDown) {
            gameState.score += settings.shootEnemyBulletPoints
        }
    }

}



