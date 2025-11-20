function Modal({children, onClick}){
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClick}>
            <div className="relative w-full max-w-xl p-12 space-y-8 bg-white shadow-2xl rounded-3xl"
                 onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal;