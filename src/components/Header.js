import { useContext } from 'react'
import { BiFoodMenu } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { TokenContext, UserContext } from '../App'

const Header = () => {
    const { currentUser, removeCurrentUser } = useContext(UserContext)
    const { removeToken } = useContext(TokenContext)

    function logout(e) {
        e.preventDefault()
        removeCurrentUser()
        removeToken()
    }

    return (
        <header className="bg-slate-900 p-4 text-white">
            <nav className="m-2 mx-auto flex w-full max-w-5xl items-center justify-between">
                <Link to="/" className="flex items-center gap-1">
                    <BiFoodMenu className="text-3xl" />
                    <h1 className="text-lg font-semibold md:text-2xl">
                        CuisineConnoisseurs
                    </h1>
                </Link>
                <ul className="flex gap-2 text-sm font-semibold text-slate-300 md:gap-6 md:text-base">
                    {!currentUser ? (
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
                                <Link to={`/profile/${currentUser._id}`}>
                                    Profile
                                </Link>
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
