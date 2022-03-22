//
// Object Destructuring
//

// Person
/*
const person = {
  name: "Kai",
  age: 22,
  location: {
    city: "Deventer",
    temp: 15
  }
};

// example # 1
console.log(`${person.name} is ${person.age}`);
// destructuring replaces:
// const age = person.age;
// const name = person.name;
// with this:
const { name, age } = person;
console.log(`${name} is ${age}`);

// example # 2
if (person.location.city && person.location.temp) {
  console.log(`It's ${person.location.temp} C in ${person.location.city}`);
}

//  default values and renaming
// possible const { city: cityName = "Vratsa"} = person.location;
const { city = "Vratsa", temp: temperature } = person.location;
if (city && temperature) {
  console.log(`It's ${temperature} C in ${city}`);
}
*/

// Book
/*
const book = {
  title: "Zorba the Greek",
  author: "Nikos Kazantzakis",
  publisher: {
    name: "Simon & Schuster"
  }
};

const { name: publisherName = "Self-Published" } = book.publisher;
console.log(publisherName);
*/

//
// Array destructuring
//

const address = [
  "1299 S Juniper Street",
  "Philadelphia",
  "Pennsylvania",
  "19147"
];

console.log(`You are in ${address[1]} ${address[2]}`);

// we match by position instead of name
const [street, city, state = "New York", zip] = address;
// if we wanna skip some we do
// const [, city, state] = address;
console.log(`You are in ${city} ${state}`);

const coffeeShopItem = ["Coffee (hot)", "$2.00", "$2.50", "$2.75"];
const [name /* smallPrize */, , mediumPrize /*largePrize*/] = coffeeShopItem;
console.log(`A medium ${name} costs ${mediumPrize}`);
