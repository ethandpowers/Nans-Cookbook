
export function isNotRestricted(meal, restrictions) {
    for (let i = 1; i <= 20; i++) {
        let ingredient = meal['strIngredient' + i]
        if (ingredient !== '' && ingredient) {
            for (let j = 0; j < restrictions.length; j++) {
                if(ingredient.toLowerCase().includes(restrictions[j].toLowerCase())){
                    return false
                }
            }
        }
    }
    return true;
}