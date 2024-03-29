import { Link } from "react-router-dom";

export function Logo() {
    return (
        <Link to={'/'} className={`w-[100px] md:w-[200px] my-3`}>
            <img src="images/logo-MEN.png" alt="Logo" />
        </Link>
    )
}

