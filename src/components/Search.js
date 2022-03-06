import { doc, onSnapshot } from "firebase/firestore";
import globalState from "../store";
import { useState } from "@hookstate/core";
import { db } from "../firebase";

export default function Search(props) {

    const gState = useState(globalState);
    const userDocState = useState(
        {
            firstName: null,
            lastName: null,
            dislikes: null,
        }
    );

    const unsub = onSnapshot(doc(db, "users", gState.get().userDocID), (doc) => {
        userDocState.set(doc.data());
    });


    if (!props.render) {
        unsub();
        return null;
    }

    return (
        <div className="fullWidth" style={{ paddingBottom: props.bottomPadding }}>
            <h1>Search</h1>
        </div>
    )
}