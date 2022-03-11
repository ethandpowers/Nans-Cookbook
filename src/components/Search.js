import { doc, onSnapshot } from "firebase/firestore";
import globalState from "../store";
import { useState } from "@hookstate/core";
import { db } from "../firebase";
import RecipePreview from "./RecipePreview";
import * as React from "react";
import { isNotRestricted } from "../Filter";
import FullRecipe from "./FullRecipe";
import { Box, Button, TextField } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function Recipes(props) {

    const gState = useState(globalState);
    const userDocState = useState(
        {
            firstName: null,
            lastName: null,
            dislikes: null,
        }
    );
    const recipeToRender = useState(null)
    const [recipes, setRecipes] = React.useState([]);
    const [searchBarState, setSearchBarState] = React.useState('')

    const unsub = onSnapshot(doc(db, "users", gState.get().userDocID), (doc) => {
        userDocState.set(doc.data());
    });

    const loadItems = () => {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBarState}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setSearchBarState('')
                    let filteredRes = []
                    result.meals.forEach((meal) => {
                        if (isNotRestricted(meal, userDocState.get().dislikes)) {
                            filteredRes.push(meal)
                        }
                    })
                    setRecipes([...filteredRes])
                    console.log(recipes)
                },
                (error) => {
                    console.error(error)
                }
            )
    }

    const handleChange = (event) => {
        setSearchBarState(event.target.value)
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault()
        if (searchBarState !== '') {
            loadItems()
        }
    }

    if (!props.render) {
        unsub();
        return null;
    }

    if (recipeToRender.get()) {
        return (
            <div className="fullWidth fullHeight recipeDiv">
                <Button className="backButton" startIcon={<ArrowBackIcon />} onClick={() => { recipeToRender.set(null) }}>
                    Back
                </Button>
                <FullRecipe recipe={recipeToRender.get()}></FullRecipe>
                <div style={{ paddingBottom: props.bottomPadding }}></div>
            </div>
        )
    } else {
        return (
            <div className="fullWidth fullHeight" style={{ paddingBottom: props.bottomPadding }}>
                <Box
                    id="newChip"
                    component="form"
                    onSubmit={handleSearchSubmit}
                    noValidate
                    autoComplete="off"
                    className="searchForm"
                >
                    <TextField
                        label="Search For Recipes"
                        value={searchBarState}
                        onChange={handleChange}
                    />
                    <Button
                        id="addChipButton"
                        variant="contained"
                        type="submit"
                    >
                        Search
                    </Button>
                </Box>
                {recipes.map(recipe => <div className="clickable" onClick={() => { recipeToRender.set(recipe); console.log(recipe) }}><RecipePreview recipe={recipe}></RecipePreview></div>)}
            </div>
        )
    }
}