import { Link } from "react-router-dom";

export function Logo() {
    return (
        <Link to={'/'} className={`w-[100px]`}>
            <img src="images/logo-MEN.png" alt="Logo" />
        </Link>
    )
}

