export function createImage(src){
  const image = new Image()
  image.src = src
  return image
}



export function collisionCheckCircular({object1, object2}){
  const distX = object1.position.x - object2.position.x
  const distY = object1.position.y - object2.position.y
  const distance = Math.sqrt(distX**2 + distY**2)
  if(distance <= object1.radius + object2.radius) return true
  else return false
}

export function distanceBetweenTwoObjects({object1, object2}){
  const xSquared = (object1.position.x - object2.position.x) ** 2
  const ySquared = (object1.position.y - object2.position.y) ** 2
  const squareRoot = Math.sqrt(xSquared + ySquared)
  return squareRoot
}

export function getBottomRowEnemies({enemies}){
  const bottomRowEnemies = []
  enemies.forEach(enemy => {
    let enemyAboveThis = false

    enemies.forEach(otherEnemy => {
      if(enemy.position.x == otherEnemy.position.x && enemy.position.y < otherEnemy.position.y) enemyAboveThis = true
    })
    if(!enemyAboveThis) bottomRowEnemies.push(enemy)
  })

  return bottomRowEnemies
}
