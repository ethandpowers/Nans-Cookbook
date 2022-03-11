import { doc, onSnapshot } from "firebase/firestore";
import globalState from "../store";
import { useState } from "@hookstate/core";
import { db } from "../firebase";
import RecipePreview from "./RecipePreview";
import * as React from "react";
import { Virtuoso } from 'react-virtuoso'
import { isNotRestricted } from "../Filter";


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
                    setRecipes([...recipes, ...result.meals])
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
            <h1>full recipe here</h1>
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
                        return <RecipePreview recipe={recipe}></RecipePreview>
                    }}
                />
            </div>
        )
    }
}