
function Box({ children }){
    return(
        <div className="w-full px-4 py-3 bg-gray-200 rounded-full outline-none focus:ring-2 transition-all">
            {children}
        </div>
    )
}

export default Box;