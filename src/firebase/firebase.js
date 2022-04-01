import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  update,
  remove,
  onValue,
  off,
  push,
  onChildAdded,
  onChildChanged,
  onChildRemoved
} from "firebase/database";

// this should not be committed since it's like the password to the database
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_API_ID
};

initializeApp(firebaseConfig);

const db = getDatabase();

export { db as default };

// putting into methods for easier commenting
//setupBasicData(db);
//removingAndUpdatingExamples(db);
//onValueUnsubscribing(db);
// firebaseArrayStoringExample(db);

function setupBasicData(db) {
  set(ref(db), {
    name: "Kai",
    age: 22,
    isSingle: true,
    occupation: "living & dying",
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
}

function removingAndUpdatingExamples(db) {
  // normal way to delete
  remove(ref(db, "isSingle"))
    .then(() => {
      console.log("Data was removed");
    })
    .catch((e) => {
      console.log("Did not remove data", e);
    });
  // deleting with set and update
  set(ref(db, "name"), null);
  // make notice of the syntax, we do it so we don't also null the whole location but only the city part
  update(ref(db), { "location/city": null });
}

function onValueUnsubscribing(db) {
  // getting info from the db
  // gets called on value change
  onValue(
    ref(db),
    (dataSnapshot) => {
      const val = dataSnapshot.val();
      console.log(val);
    },
    {
      onlyOnce: false
    }
  );

  setTimeout(() => {
    set(ref(db, "name"), "Fart");
  }, 1500);

  setTimeout(() => {
    off(ref(db), "value");
  }, 3000);

  setTimeout(() => {
    set(ref(db, "name"), "Toot");
  }, 4500);

  setTimeout(() => {
    set(ref(db, "name"), "Tweet");
  }, 7500);
}

function firebaseArrayStoringExample(db) {
  // notice randomly generated unique id
  //push(ref(db, "notes"), { title: "todo", description: "ye" });
  //remove(ref(db, "notes/-Mz_q9t46xtWS9kXyKNV"));
  //push(ref(db, "notes"), { title: "bugfix", description: "no" });

  const notesRef = ref(db, "notes");

  //get array in proper form
  onValue(
    notesRef,
    (dataSnapshot) => {
      const notes = [];
      dataSnapshot.forEach((childSnapshot) => {
        const id = childSnapshot.key;
        const title = childSnapshot.val().title;
        const description = childSnapshot.val().description;
        notes.push({
          id,
          /* ...childSnapshot.val() or -> */
          title,
          description
        });
      });

      console.log(notes);
    },
    {
      onlyOnce: false
    }
  );

  onChildAdded(notesRef, (data) => {
    console.log("Added", data.key, data.val());
  });

  onChildChanged(notesRef, (data) => {
    console.log("Changed", data.key, data.val());
  });

  onChildRemoved(notesRef, (data) => {
    console.log("Removed", data.key, data.val());
  });
}
