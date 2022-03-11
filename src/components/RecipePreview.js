import { Card } from "react-bootstrap";



export default function RecipePreview({ recipe }) {
    const loadIfLarge = (element) => {
        if(window.innerWidth >= 1200){
            return(element)
        }
    }
    return (
        <Card className="preview">
            <img src={recipe.strMealThumb} alt="thumbnail"></img>
            <Card.Body>
                <Card.Title>{recipe.strMeal}</Card.Title>
                {loadIfLarge(<Card.Subtitle>Category: {recipe.strCategory}</Card.Subtitle>)}
                {loadIfLarge(<br></br>)}
                {loadIfLarge(<Card.Text>{recipe.strInstructions}</Card.Text>)}
            </Card.Body>
        </Card>
    )
}