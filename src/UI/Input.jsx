function Input({ label, type = "text", error, ...props }) {
    return (
      <div className="flex flex-col w-full gap-1">
        <label className="ml-1 text-xs font-bold text-gray-500 uppercase">
          {label}
        </label>
        
        <input
          type={type}
          className={`w-full px-4 py-3 bg-gray-200 rounded-full outline-none focus:ring-2 transition-all
              ${error ? 'ring-2 ring-red-500 bg-red-50' : 'focus:ring-orange-400'}
          `}
          {...props}
        />
        
        {error && (
          <p className="ml-2 text-xs font-medium text-red-500">
              {error}
          </p>
        )}
      </div>
    );
  }
  
  export default Input;