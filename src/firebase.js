import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs, doc, updateDoc } from "firebase/firestore"
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    //sendPasswordResetEmail,
    signOut,
    setPersistence,
    browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCi9yg5MvmR_8jrUkzAe2tFoUkYd0ictzA",
    authDomain: "food-1da61.firebaseapp.com",
    projectId: "food-1da61",
    storageBucket: "food-1da61.appspot.com",
    messagingSenderId: "1017846413184",
    appId: "1:1017846413184:web:ce7922c6c2da0705703365",
    measurementId: "G-77CLS2G7SR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)

export const db = getFirestore(app);

//called upon the creation of a new user
async function addUserDoc(firstName, lastName) {
    let docRef = await addDoc(collection(db, "users"), {
        uid: auth.currentUser.uid,
        firstName: firstName,
        lastName: lastName,
        dislikes: [],
    });
    return docRef;
}

//returns a the document associated with the current user
export async function getUserDoc() {
    let q = query(collection(db, "users"), where("uid", "==", auth.currentUser.uid));
    let snapshot = await getDocs(q);
    return snapshot.docs[0];
}

export async function getUserDocID() {
    return (await getUserDoc()).id;
}

export async function getUserDocSnapshot(id) {
    if (auth.currentUser) {
        return doc(db, 'users', id)
    } else {
        return null;
    }
}

export async function newUser(email, password, firstName, lastName) {

    let docRef = await createUserWithEmailAndPassword(auth, email, password).catch(() => {
        console.log("Email already in use");
    }).then(() => {
        return addUserDoc(firstName, lastName)
    });
    return docRef;
}


export async function logIn(email, password) {
    let docRef = await signInWithEmailAndPassword(auth, email, password).catch(() => {
        console.log("Account not found");
    }).then(() => {
        return getUserDoc();
    });
    return docRef;
}


export function isLoggedIn() {
    if (auth.currentUser == null) {
        return false;
    }
    return true;
}


export function logOut() {
    console.log('logging out')
    signOut(auth);
}

export async function updateDislikes(dislikes, docId) {
    await updateDoc(doc(db, "users", docId), {
        dislikes: dislikes
    })
}