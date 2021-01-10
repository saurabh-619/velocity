import firebase from "./firebase";
// Will throw 500 error if not imported
import "firebase/firestore";

const firestore = firebase.firestore();

export function createUser(uid, user) {
  return firestore
    .collection("users")
    .doc(uid)
    .set(
      {
        uid,
        ...user,
      },
      { merge: true } //merges to old document if already present
    );
}

export function createSite(data) {
  return firestore.collection("sites").add(data);
}
export function deleteSite(data) {
  return firestore.collection("sites").add(data);
}
