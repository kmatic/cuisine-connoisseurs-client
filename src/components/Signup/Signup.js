import { BiFoodMenu } from 'react-icons/bi'
import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import useFocus from '../Hooks/useFocus'
import notify from '../../utils/notify'
import Loader from '../Loader'

const Signup = ({ user }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const { focusRef } = useFocus()

    async function handleSignup(e) {
        e.preventDefault()
        try {
            setLoading(true)
            const res = await fetch(
                'https://cuisineconnoisseursapi.onrender.com/api/signup',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        username: username,
                        password: password,
                        passwordConfirm: passwordConfirm,
                    }),
                    headers: {
                        'Content-type': 'application/json',
                    },
                }
            )
            const obj = await res.json()
            notify(obj, res.status, 'signup')
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    if (!user) {
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
                            onSubmit={(e) => handleSignup(e)}>
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
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold text-gray-600">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className="border-b pb-1 focus:outline-none"
                                    value={passwordConfirm}
                                    onChange={(e) =>
                                        setPasswordConfirm(e.target.value)
                                    }
                                />
                            </div>
                            <button className="self-center rounded-md bg-slate-900 px-10 py-2 text-xl font-semibold text-white">
                                Signup
                            </button>
                        </form>
                        <Link to="/login" className="hover:text-blue-500">
                            Already have an account? Login
                        </Link>
                    </>
                )}
            </div>
        )
    }
    return <Navigate to="/" />
}

export default Signup
