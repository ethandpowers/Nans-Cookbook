import { doc, onSnapshot } from "firebase/firestore";
import globalState from "../store";
import { useState } from "@hookstate/core";
import { db } from "../firebase";

export default function Settings(props) {

    const gState = useState(globalState);

    const unsub = onSnapshot(doc(db, "users", gState.get().userDocID), (doc) => {
        console.log("Current data: ", doc.data());
    });


    if (!props.render) {
        unsub();
        return null;
    }

    return (
        <div className="fullWidth" style={{ paddingBottom: props.bottomPadding }}>
            <h1>Settings</h1>
        </div>
    )
}