import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBTSjUL-Jll16oxLiBAn9i0jnrSBUIytHs",
  authDomain: "expense-list-98da6.firebaseapp.com",
  databaseURL:
    "https://expense-list-98da6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "expense-list-98da6",
  storageBucket: "expense-list-98da6.appspot.com",
  messagingSenderId: "931141273582",
  appId: "1:931141273582:web:3bf43e91afc1a7b46730ff"
};

initializeApp(firebaseConfig);

const db = getDatabase();

set(ref(db), {
  name: "Kai",
  age: 22,
  isSingle: true,
  location: {
    city: "Deventer",
    country: "Netherlands"
  }
})
  .then(() => {
    console.log("Data is saved");
  })
  .catch((e) => {
    console.log("This failed", e);
  });

// better to use update if we are just changing an already existing field
set(ref(db, "name"), "Kaloyan");

const updates = { age: 23 };
updates["/location/city"] = "Eindhoven";
update(ref(db), updates);

set(ref(db, "attributes/height"), "178cm");
set(ref(db, "attributes/weight"), "90kg");
// or set(ref(db, "attributes"), {height: '178cm', weight: '90kg'});

console.log("made firebase data change request");
