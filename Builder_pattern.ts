//To implement the Builder pattern in Nest.js, you can follow these steps:

//1. Create a class for your object that you want to build.
//typescript
export class Person {
  firstName: string;
  lastName: string;
  age: number;
  address: string;

  constructor(firstName: string, lastName: string, age: number, address: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.address = address;
  }
}

//2. Create a separate class for the builder.
//typescript
export class PersonBuilder {
  private firstName: string;
  private lastName: string;
  private age: number;
  private address: string;

  setFirstName(firstName: string): PersonBuilder {
    this.firstName = firstName;
    return this;
  }

  setLastName(lastName: string): PersonBuilder {
    this.lastName = lastName;
    return this;
  }

  setAge(age: number): PersonBuilder {
    this.age = age;
    return this;
  }

  setAddress(address: string): PersonBuilder {
    this.address = address;
    return this;
  }

  build(): Person {
    return new Person(this.firstName, this.lastName, this.age, this.address);
  }
}
//3. Use the builder to create a new object.
//typescript
const person = new PersonBuilder()
  .setFirstName('John')
  .setLastName('Doe')
  .setAge(30)
  .setAddress('123 Main St')
  .build();

//This will create a new Person object with the specified properties. 
//The advantage of using the Builder pattern is that it allows you 
//to create objects with optional properties without having to create multiple 
//constructors or pass in undefined values.
