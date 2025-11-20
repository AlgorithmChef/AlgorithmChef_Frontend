import Button from "../UI/Button";
import { LuChefHat } from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
    const navaigate = useNavigate();
    const location = useLocation();
    function navigateHandler(){
        navaigate("/auth/login");
    }
    const isAuthPage = location.pathname.startsWith("/auth");
    return (
        <header className="relative flex flex-row items-center justify-center py-8 gap-4 w-full">
            
            <LuChefHat className="text-orange-500 text-9xl" />
            
            <div className="flex items-center">
                <strong className="text-black-600 font-bold text-6xl">
                    알고리즘 <span className="text-orange-500">셰프</span>
                </strong>
            </div>
            
            {!isAuthPage && (
                <Button onClick={navigateHandler} cssClass="absolute right-20">
                    로그인
                </Button>
            )}

        </header>
    )
}

export default Header;