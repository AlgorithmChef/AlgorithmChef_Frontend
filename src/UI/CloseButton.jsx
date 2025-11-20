import { LuX } from "react-icons/lu"
function CloseButton({onClick}){
    return (
        <button 
            onClick={onClick}
            className="absolute top-6 right-6 text-gray-400 hover:text-black text-2xl transition-colors"
    >
        <LuX />
    </button>
    )
}

export default CloseButton;