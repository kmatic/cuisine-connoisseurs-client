import { useContext, useState } from 'react'
import { BiFoodMenu } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { TokenContext, UserContext } from '../App'

const Header = () => {
    const { currentUser, removeCurrentUser } = useContext(UserContext)
    const { removeToken } = useContext(TokenContext)

    const [navOpen, setNavOpen] = useState(false)

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
                    <h1 className="text-xl font-semibold sm:text-2xl">
                        CuisineConnoisseurs
                    </h1>
                </Link>
                <ul className="DESKTOP-MENU hidden font-semibold text-slate-300 sm:flex sm:gap-6 sm:text-base">
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
                <div className="MOBILE-MENU flex sm:hidden">
                    <div
                        className="cursor-pointer space-y-1"
                        onClick={() => setNavOpen((prev) => !prev)}>
                        <span className="block h-1 w-6 animate-pulse bg-white"></span>
                        <span className="block h-1 w-6 animate-pulse bg-white"></span>
                        <span className="block h-1 w-6 animate-pulse bg-white"></span>
                    </div>
                    <div className={navOpen ? 'showMenuNav' : 'hideMenuNav'}>
                        <div
                            onClick={() => setNavOpen(false)}
                            className="absolute top-0 right-0 cursor-pointer px-8 py-8">
                            <svg
                                className="h-8 w-8 text-gray-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </div>
                        {!currentUser ? (
                            <ul className="NAVIGATION-MOBILE-OPEN flex min-h-[250px] flex-col items-center justify-between">
                                <li className="my-8 border-b border-gray-400 uppercase">
                                    <div onClick={() => setNavOpen(false)}>
                                        <Link to={`/login`}>Login</Link>
                                    </div>
                                </li>
                                <li className="my-8 border-b border-gray-400 uppercase">
                                    <div onClick={() => setNavOpen(false)}>
                                        <Link to="/signup">Signup</Link>
                                    </div>
                                </li>
                            </ul>
                        ) : (
                            <ul className="NAVIGATION-MOBILE-OPEN flex min-h-[250px] flex-col items-center justify-between">
                                <li className="my-8 border-b border-gray-400 uppercase">
                                    <div onClick={() => setNavOpen(false)}>
                                        <Link to="/posts">Home</Link>
                                    </div>
                                </li>
                                <li className="my-8 border-b border-gray-400 uppercase">
                                    <div onClick={() => setNavOpen(false)}>
                                        <Link to="/users">Find Friends</Link>
                                    </div>
                                </li>
                                <li className="my-8 border-b border-gray-400 uppercase">
                                    <div onClick={() => setNavOpen(false)}>
                                        <Link
                                            to={`/profile/${currentUser._id}`}>
                                            Profile
                                        </Link>
                                    </div>
                                </li>
                                <li className="my-8 border-b border-gray-400 uppercase">
                                    <button onClick={logout}>Logout</button>
                                </li>
                            </ul>
                        )}
                    </div>
                    <style>{`
                        .hideMenuNav {
                            display: none;
                        }
                        .showMenuNav {
                            display: block;
                            position: fixed;
                            width: 100%;
                            height: 100vh;
                            top: 0;
                            left: 0;
                            background-color: rgb(15 23 42);
                            z-index: 10;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-evenly;
                            align-items: center;
                        }
                    `}</style>
                </div>
            </nav>
        </header>
    )
}

export default Header
