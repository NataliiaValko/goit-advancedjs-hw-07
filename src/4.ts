class Key {
  constructor(private signature: number = Math.random()) {}

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  constructor(private key: Key) {}

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  constructor(
    protected key: Key,
    protected door: boolean = false,
    protected tenants: Person[] = []
  ) {}

  comeIn(person: Person): void {
    if (!this.door) return;

    this.tenants.push(person);
  }

  abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  openDoor(key: Key): void {
    if (this.key.getSignature() !== key.getSignature()) return;

    this.door = true;
  }
}

const key = new Key();
const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());
house.comeIn(person);
