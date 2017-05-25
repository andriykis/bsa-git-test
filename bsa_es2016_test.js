'use strict';

class Fighter {

    constructor(name, power = 10, health = 100) {
        this._name = name;
        this._power = power;
        this._health = health;
    }

    setDamage(damage) {
        this._health = (damage > this._health) ? 0 : this._health - damage;
        console.log(`${this._name} health: ${this._health} (${damage} damage)`);
    }

    hit(enemy, point) {
        enemy.setDamage(point * this._power);
    }

    isAlive() {
        return this._health > 0;
    }

    logHealth() {
        if (this._health === 0) {
            console.log(`${this._name} is dead!`);
        } else {
            console.log(`${this._name} health is ${this._health}`);
        }
    }

    static createFighter(name, power = 10, health = 100) {
        return new Fighter(name, power, health);
    }
}

class ImprovedFighter extends Fighter {
    hit(enemy, point) {
        super.hit(enemy, point * 2);
    }

    // Useless we can use shadowing
    doubleHit(enemy, point) {
        super.hit(enemy, point * 2 );
    }

    static createImprovedFighter(name, power = 10, health = 100) {
        return new ImprovedFighter(name, power, health);
    }
}

function fight(fighter1, fighter2, ...points) {
    let fighter1Turn = true;
    for (let point of points) {
        if (fighter1Turn) {
            fighter1.hit(fighter2, point);
        } else {
            fighter2.hit(fighter1, point);
        }
        if (!fighter1.isAlive() || !fighter2.isAlive()) break;
        fighter1Turn = !fighter1Turn;
    }
    [fighter1, fighter2].forEach(
      fighter => fighter.logHealth()
    );
}

let johnSmith = Fighter.createFighter('John Smith');
let joePlumber = ImprovedFighter.createImprovedFighter('Joe Plumber');

fight(johnSmith, joePlumber, 1, 2, 3, 4, 5, 6, 7);
