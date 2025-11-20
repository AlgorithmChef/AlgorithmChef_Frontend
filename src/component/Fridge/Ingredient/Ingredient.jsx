import { LuSmile } from "react-icons/lu";
import { dateFormmater } from "../../../util/formatting";
import { dDayFormatter } from "../../../util/formatting";

function FridgeIngredient({ ingredient }) {
    return (
        <div className="min-w-[160px] bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col justify-between">
            
            <div className="flex flex-row items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
                    <LuSmile className="text-orange-500 text-xl" />
                </div>
                <strong className="text-lg font-bold text-gray-800 truncate">
                    {ingredient.name}
                </strong>
            </div>

            <div className="text-xs text-gray-500 space-y-1">
                <p className="font-medium">
                    유통기한 : {dDayFormatter(ingredient.dday)}
                </p>
                <p className="text-gray-400">{dateFormmater(ingredient.purchaseDate)} 구매</p>
            </div>

        </div>
    );
}

export default FridgeIngredient;