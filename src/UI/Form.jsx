function Form({children, action}){
    return(
        <form action={action || null} className="flex flex-col gap-6">
            {children}
        </form>
    )
}

export default Form;