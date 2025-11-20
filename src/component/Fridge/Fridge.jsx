import Button from "../../UI/Button";
import FridgeIngredients from "./Ingredient/Ingredients";

function Fridge() {
    return (
        <div className="flex flex-col w-full px-6 py-4 gap-4">
            <h1 className="text-6xl font-black text-gray-800">
                나의 냉장고
            </h1>
            <p className="w-full border-b border-gray-300 pb-2 text-gray-500">
                당신의 냉장고 속 재료는 무엇인가요??
            </p>
            <div className="flex justify-start mx-1">
                <Button>카테고리</Button>
            </div>
            <div className="mt-2">
                <FridgeIngredients />
            </div>
        </div>
    );
}

export default Fridge;