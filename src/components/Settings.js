import { doc, onSnapshot } from "firebase/firestore";
import globalState from "../store";
import { useState } from "@hookstate/core";
import { db, updateDislikes } from "../firebase";
import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button } from "@mui/material";
import Divider from '@mui/material/Divider';
import { Navigate } from "react-router-dom";
import { Chip } from "@mui/material";
import TextField from '@mui/material/TextField';
import { Box } from "@mui/material";


export default function Settings(props) {

    const [newChipVal, setNewChipVal] = React.useState('')
    const gState = useState(globalState);
    const userDocState = useState(
        {
            firstName: null,
            lastName: null,
            dislikes: [],
        }
    );
    const loggedIn = useState(true);

    const docId = gState.get().userDocID
    const unsub = onSnapshot(doc(db, "users", docId), (doc) => {
        userDocState.set(doc.data());
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

    const handleDelete = (item) => () => {
        let dislikes = userDocState.get().dislikes
        let newDislikes = []
        for (let i = 0; i < dislikes.length; i++) {
            if (dislikes[i] !== item) {
                newDislikes.push(dislikes[i])
            } else {
                console.log('Removing: ' + item)
            }
        }
        updateDislikes(newDislikes, docId)
    }

    const updateNewChipVal = (event) => {
        setNewChipVal(event.target.value)
    }

    const handleAdd = (event) => {
        event.preventDefault()
        let dislikes = userDocState.get().dislikes
        let newDislikes = []
        for (let i = 0; i < dislikes.length; i++) {
            newDislikes[i] = dislikes[i]
        }
        if (newChipVal !== '' && !newDislikes.includes(newChipVal)) {
            newDislikes.push(newChipVal)
            updateDislikes(newDislikes, docId)
        }
        setNewChipVal('')
    }

    let dislikes = userDocState.get().dislikes.map(item => <div className="chipDiv" key={item}><Chip label={item} onDelete={handleDelete(item)}></Chip></div>)

    return (
        <div className="fullWidth" style={{ paddingBottom: props.bottomPadding }}>
            <List>
                <ListItem id="chipSection">
                    Restricted Ingredients:
                    <div id="chips">{dislikes}</div>
                    <Box
                        id="newChip"
                        component="form"
                        onSubmit={handleAdd}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            label="Restrict Another Ingredient"
                            value={newChipVal}
                            onChange={updateNewChipVal}
                        />
                        <Button
                            id="addChipButton"
                            variant="contained"
                            type="submit"
                        >
                            Add
                        </Button>
                    </Box>
                </ListItem>

                <Divider component="li" />
                <ListItem className="centerHorizontal">
                    <Button variant="contained" onClick={signOutButtonHandler}>Sign Out</Button>
                </ListItem>

            </List>
        </div>
    )
}