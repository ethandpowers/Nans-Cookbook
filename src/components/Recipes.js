import { doc, onSnapshot } from "firebase/firestore";
import globalState from "../store";
import { useState } from "@hookstate/core";
import { db } from "../firebase";
import RecipePreview from "./RecipePreview";
import * as React from "react";
import { Virtuoso } from 'react-virtuoso'
import { isNotRestricted } from "../Filter";
import FullRecipe from "./FullRecipe";
import { Button } from "@mui/material";
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

    const unsub = onSnapshot(doc(db, "users", gState.get().userDocID), (doc) => {
        userDocState.set(doc.data());
    });

    React.useEffect(() => {
        if (recipes.length === 0) loadItems()
    })

    const loadItems = () => {
        fetch("https://www.themealdb.com/api/json/v2/9973533/randomselection.php")
            .then(res => res.json())
            .then(
                (result) => {
                    let filteredRes = []
                    result.meals.forEach((meal) => {
                        if (isNotRestricted(meal, userDocState.get().dislikes)){
                            filteredRes.push(meal)
                        }
                    })
                    setRecipes([...recipes, ...filteredRes])
                    console.log(recipes)
                },
                (error) => {
                    console.error(error)
                }
            )
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
                <Virtuoso
                    style={{ height: '100%' }}
                    data={recipes}
                    endReached={loadItems}
                    overscan={0}
                    itemContent={(index, recipe) => {
                        return <div className="clickable" onClick={() => { recipeToRender.set(recipe); console.log(recipe) }}><RecipePreview recipe={recipe}></RecipePreview></div>
                    }}
                />
            </div>
        )
    }
}