
// Ship Properties
// hull is the same as hitpoints. If hull reaches 0 or less, the ship is destroyed
// firepower is the amount of damage done to the hull of the target with a successful hit
// accuracy is the chance between 0 and 1 that the ship will hit its target
// Your spaceship, the USS Assembly should have the following properties:

// hull - 20
// firepower - 5
// accuracy - .7
// The alien ships should each have the following ranged properties determined randomly:

// hull - between 3and 6
// firepower - between 2and 4
// accuracy - between .6and .8 -->2

class Spaceship {
    constructor(hull, firepower, accuracy) {
      this.hull = hull;
      this.firepower = firepower;
      this.accuracy = accuracy;
    }
   
    attack(target) {
      console.log("You attack the alien ship!");
      if (Math.random() < this.accuracy) {
        console.log("Your attack hits the alien ship!");
        target.hull -= this.firepower;
        if (target.hull <= 0) {
          console.log("You destroyed the alien ship!");
          return true;
        } else {
          console.log("The alien ship survived. It's attacking you now.");
          return false;
        }
      } else {
        console.log("Your attack missed!");
        return false;
      }
    }
  }
   
  class AlienShip {
    constructor() {
      this.hull = Math.floor(Math.random() * 4) + 3;
      this.firepower = Math.floor(Math.random() * 3) + 2;
      this.accuracy = Math.random() * 0.2 + 0.6;
    }
   
    attack(target) {
      console.log("The alien ship attacks!");
      if (Math.random() < this.accuracy) {
        console.log("The alien ship's attack hits your spaceship!");
        target.hull -= this.firepower;
        if (target.hull <= 0) {
          console.log("Your spaceship has been destroyed. Game over!");
          return true;
        } else {
          console.log("Your spaceship survived. You can attack again.");
          return false;
        }
      } else {
        console.log("The alien ship's attack missed!");
        return false;
      }
    }
  }
//    A game round would look like this:
//    You attack the first alien ship
//    If the ship survives, it attacks you
//    If you survive, you attack the ship again
//    If it survives, it attacks you again ... etc
//    If you destroy the ship, you have the option to attack the next ship or to retreat
//    If you retreat, the game is over, perhaps leaving the game open for further developments or options
//    You win the game if you destroy all of the aliens
//    You lose the game if you are destroyed

  function playGame() {
    const player = new Spaceship(20, 5, 0.7);
    const alienShips = [];
    const numAlienShips = 6;
   
    for (let i = 0; i < numAlienShips; i++) {
      alienShips.push(new AlienShip());
    }
   
    let currentShipIndex = 0;
    let retreat = false;
   
    while (currentShipIndex < numAlienShips && !retreat) {
      const currentAlienShip = alienShips[currentShipIndex];
      console.log(`\nAlien Ship ${currentShipIndex + 1} of ${numAlienShips}`);
      console.log("-------------------------");
   
      while (true) {
        if (player.attack(currentAlienShip)) {
          if (currentShipIndex === numAlienShips - 1) {
            console.log("Congratulations! You destroyed all the alien ships. You win!");
            return;
          } else {
            const choice = prompt("You destroyed the alien ship. Do you want to attack the next ship or retreat? (attack/retreat)");
            if (choice === "retreat") {
              retreat = true;
              break;
            } else if (choice === "attack") {
              currentShipIndex++;
              break;
            } else {
              console.log("Invalid choice. Please choose 'attack' or 'retreat'.");
            }
          }
        }
   
        if (currentAlienShip.attack(player)) {
          console.log("Game over! Your spaceship has been destroyed by the alien ship.");
          return;
        }
      }
    }
   
    if (retreat) {
      console.log("You retreated. Game over!");
    }
  }
   
  