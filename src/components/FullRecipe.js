import { Card, ListGroup } from "react-bootstrap";
import * as React from 'react'



export default function FullRecipe({ recipe }) {

    React.useEffect(() => {
        window.scrollTo(0, 0)
    })

    const getIngredients = () => {
        let ingredients = []
        for (let i = 1; i <= 20; i++) {
            let ingredient = recipe['strIngredient' + i]
            if (ingredient !== "" && ingredient) {
                ingredients.push(ingredient)
            }
        }
        return ingredients
    }

    const getMeasurements = () => {
        let measurements = []
        for (let i = 1; i <= 20; i++) {
            let measurement = recipe['strMeasure' + i]
            if (measurement !== "" && measurement) {
                measurements.push(measurement)
            }
        }
        return measurements
    }

    const modifyEmbededVideo = (url) => {
        url = url.replace('watch?v=', 'embed/')
        console.log(url)
        return url
    }

    const ingredients = getIngredients()
    const measurements = getMeasurements()
    const youtubeVideo = () => {
        let videoUrl = modifyEmbededVideo(recipe.strYoutube)
        if (videoUrl !== '') {
            return <div className="videoDiv">< iframe className="video" src={videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe ></div>
        }
    }

    return (
        <div>
            <div className="preview">
                <img src={recipe.strMealThumb} alt="thumbnail"></img>
                <Card.Body>
                    <Card.Title>{recipe.strMeal}</Card.Title>
                    <Card.Subtitle>Category: {recipe.strCategory} | Cuisine: {recipe.strArea}</Card.Subtitle>
                    <br></br>
                    <ListGroup variant="flush">
                        {ingredients.map(ingredient =>
                            <ListGroup.Item key={ingredients.indexOf(ingredient)}>
                                {ingredient} - {measurements[ingredients.indexOf(ingredient)]}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card.Body>
            </div>
            <Card.Body>
                <Card.Text>{recipe.strInstructions}</Card.Text>
                <br></br>
                {youtubeVideo()}
            </Card.Body>
        </div>
    )
}