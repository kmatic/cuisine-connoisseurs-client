import { BiFoodMenu } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const Header = ({ auth, setAuth }) => {
    function logout(e) {
        e.preventDefault()
        setAuth(false)
        localStorage.removeItem('auth')
        localStorage.removeItem('token')
    }

    return (
        <header className="bg-slate-900 text-white p-4">
            <nav className="flex items-center justify-between m-2 container mx-auto">
                <Link to="/" className="flex items-center gap-1">
                    <BiFoodMenu className="text-3xl" />
                    <h1 className="text-2xl font-semibold">
                        CuisineConnoisseurs
                    </h1>
                </Link>
                <ul className="flex font-semibold text-base gap-6 text-slate-300">
                    {!auth ? (
                        <>
                            <li className="hover:text-white">
                                <Link to="/login">Login</Link>
                            </li>
                            <li className="hover:text-white">
                                <Link to="/signup">Signup</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="hover:text-white">
                                <Link to="/posts">Home</Link>
                            </li>
                            <li className="hover:text-white">
                                <Link to="/users">Find Friends</Link>
                            </li>
                            <li className="hover:text-white">
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li className="hover:text-white">
                                <button onClick={logout}>Logout</button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}

export default Header
