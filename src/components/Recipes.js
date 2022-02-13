

export default function Recipes(props){
    if(!props.render){
        return null;
    }

    
    return(
        <div className="fullView" style={{paddingBottom: props.bottomPadding}}>
            <h1>Recipes</h1>
        </div>
    )
}