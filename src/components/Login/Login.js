import { BiFoodMenu } from 'react-icons/bi'
import { useContext, useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { TokenContext, UserContext } from '../../App'
import useFocus from '../Hooks/useFocus'
import notify from '../../utils/notify'
import Loader from '../Loader'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const { addCurrentUser, currentUser } = useContext(UserContext)
    const { addToken } = useContext(TokenContext)

    const { focusRef } = useFocus()

    async function handleLogin(e) {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await fetch(
                'https://cuisineconnoisseursapi.onrender.com/api/login',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        username: username,
                        password: password,
                    }),
                    headers: {
                        'Content-type': 'application/json',
                    },
                }
            )
            const obj = await res.json()
            addCurrentUser(obj.user)
            addToken(obj.token)
            notify(obj, res.status, 'signin')
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    if (!currentUser) {
        return (
            <div className="mx-auto my-10 flex w-full max-w-sm flex-col items-center gap-8 rounded-md bg-white p-6 drop-shadow-lg">
                {loading ? (
                    <Loader loading={loading} />
                ) : (
                    <>
                        <div className="flex gap-1">
                            <BiFoodMenu className="text-3xl" />
                            <h1 className="text-2xl font-semibold">
                                CuisineConnoisseurs
                            </h1>
                        </div>
                        <form
                            className="flex flex-col gap-8 self-stretch"
                            onSubmit={(e) => handleLogin(e)}>
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-600">
                                    Username
                                </label>
                                <input
                                    ref={focusRef}
                                    type="text"
                                    className="border-b pb-1 focus:outline-none"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-600">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="border-b pb-1 focus:outline-none"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <button className="self-center rounded-md bg-slate-900 px-10 py-2 text-xl font-semibold text-white">
                                Login
                            </button>
                        </form>
                        <Link to="/signup" className="hover:text-blue-600">
                            Don't have an account? Sign up
                        </Link>
                    </>
                )}
            </div>
        )
    }
    return <Navigate to="/" />
}

export default Login
