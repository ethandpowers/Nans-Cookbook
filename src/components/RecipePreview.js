import { Card } from "react-bootstrap";


export default function RecipePreview({ recipe }) {

    return (
        <Card className="preview">
            <Card.Img variant="top" src={recipe.strMealThumb} />
            <Card.Body>
                <Card.Title>{recipe.strMeal}</Card.Title>
            </Card.Body>
        </Card>
    )
}