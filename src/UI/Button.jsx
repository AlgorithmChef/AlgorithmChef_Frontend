function Button({ onClick, children, cssClass }) {
    let className = "text-white rounded-xl bg-orange-500 text-center px-4 py-2 font-black ";
    
    if (cssClass) {
        className += cssClass;
    }

    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;