import { doc, onSnapshot } from "firebase/firestore";
import globalState from "../store";
import { useState } from "@hookstate/core";
import { db } from "../firebase";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button } from "@mui/material";
import Divider from '@mui/material/Divider';
import { Navigate } from "react-router-dom";

export default function Settings(props) {

    const gState = useState(globalState);
    const userDocState = useState(
        {
            firstName: null,
            lastName: null,
            dislikes: null,
        }
    );
    const loggedIn = useState(true);

    const unsub = onSnapshot(doc(db, "users", gState.get().userDocID), (doc) => {
        userDocState.set(doc.data());
        console.log(userDocState.get())
    });

    const signOutButtonHandler = () => {
        loggedIn.set(false);
    }


    if (!props.render) {
        unsub();
        return null;
    } else if (!loggedIn.get()) {
        unsub();
        return <Navigate to="/signin" />
    }

    return (
        <div className="fullWidth" style={{ paddingBottom: props.bottomPadding }}>
            <List>
                <ListItem>
                    Ingredients to exclude:
                </ListItem>

                <Divider component="li" />
                <ListItem className="centerHorizontal">
                    <Button variant="contained" onClick={signOutButtonHandler}>Sign Out</Button>
                </ListItem>

            </List>
        </div>
    )
}