import { INGREDIENTS } from "../../../ingredients";
import FridgeIngredient from "./Ingredient";

function FridgeIngredients() {
    return (
        <ul className="flex flex-row gap-4 overflow-x-auto pb-4 px-1">
            {INGREDIENTS.map((ingredient) => (
                <li key={ingredient.id} className="flex-shrink-0"> 
                    <FridgeIngredient ingredient={ingredient} />
                </li>
            ))}
        </ul>
    );
}

export default FridgeIngredients;