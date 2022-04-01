// add import in app.js to test
// import "./playground/promises";

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ name: "Bleh", age: 42 });
    reject("something went wrong!");
    // we can only have 1 resolve/reject per promise
    resolve("this is another resolve data");
  }, 1500);
});

console.log("before");

// the point is to show that the promise allows the rest of the program to continue while it's resolving
// this only runs when the promise is resolved and not rejected unless we have a catch
promise.then((data) => {
  console.log(data);
});

promise
  .then((data) => {
    console.log("2", data);
  })
  .catch((error) => {
    console.log("error: ", error);
  });

/* we can also type it like 
promise
  .then((data) => {
    console.log("2", data);
  }, (error) => {
    console.log("error: ", error);
  });
*/

console.log("after");
