import { BiFoodMenu } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="bg-slate-900 text-white p-4">
            <nav className="flex items-center justify-between m-2">
                <Link to="/" className="flex items-center gap-1">
                    <BiFoodMenu className="text-3xl" />
                    <h1 className="text-2xl font-semibold">
                        CuisineConnoisseurs
                    </h1>
                </Link>
                <ul className="flex font-semibold text-base gap-3">
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
