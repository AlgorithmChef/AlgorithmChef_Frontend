import { Link } from "react-router-dom";

function TextButton({ children, onClick, to, className }) {
    const baseStyle = `text-sm text-gray-500 hover:text-orange-500 hover:underline underline-offset-4 transition-all ${className || ''}`;

    if (to) {
        return (
            <Link to={to} className={baseStyle}>
                {children}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={baseStyle} type="button">
            {children}
        </button>
    );
}

export default TextButton;