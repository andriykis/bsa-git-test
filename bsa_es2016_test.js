'use strict';

class Fighter {

    constructor(name, power = 10, health = 100) {
        [this._name, this._power, this._health] = [name, power, health];
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

let fightObj = {
    fighter1: Fighter.createFighter('John Smith'),
    fighter2: ImprovedFighter.createImprovedFighter('Joe Plumber')
};

fightObj[Symbol.iterator] = function(hasNext) {

    let fighter1 = this.fighter1;
    let fighter2 = this.fighter2;

    return { // this is the iterator object, returning a single element, the string "bye"
        next: function() {
            if (hasNext(fighter1, fighter2)) {
                return { done: true };
            } else {
                if (this._fighter1Turn) {
                    this._fighter1Turn = !this._fighter1Turn;
                    return { value: [fighter1, fighter2], done: false };
                } else {
                    this._fighter1Turn = !this._fighter1Turn;
                    return { value: [fighter2, fighter1], done: false };
                }
            }
        },
        _fighter1Turn: true
    };
};

function fight(fightObj, ...points) {
    let fightIterator = fightObj[Symbol.iterator](
            (fighter1, fighter2) => (!fighter1.isAlive() || !fighter2.isAlive())
    );
    for (let point of points) {
        let result = fightIterator.next();
        if (result.done) break;
        let [fighter1, fighter2] = result.value;
        fighter1.hit(fighter2, point);
    }
    [fightObj.fighter1, fightObj.fighter2].forEach(
        fighter => fighter.logHealth()
    );
}

fight(fightObj, 1, 2, 3, 4, 5, 6, 7);
