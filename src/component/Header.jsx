import Button from "../UI/Button";
import { LuChefHat } from "react-icons/lu";

function Header() {
    return (
        <header className="relative flex flex-row items-center justify-center py-8 gap-4 w-full">
            
            <LuChefHat className="text-orange-500 text-6xl" />
            
            <div className="flex items-center">
                <strong className="text-black-600 font-bold text-2xl">
                    알고리즘 <span className="text-orange-500">셰프</span>
                </strong>
            </div>
            
            <Button cssClass="absolute right-20">
                로그인
            </Button>

        </header>
    )
}

export default Header;