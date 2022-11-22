import { BiFoodMenu } from 'react-icons/bi'
import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'

const Signup = ({ user }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    async function handleSignup(e) {
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password,
                    passwordConfirm: passwordConfirm,
                }),
                headers: {
                    'Content-type': 'application/json',
                },
            })
            if (res.status !== 200) return console.error('Something went wrong')
            console.log(await res.json())
        } catch (err) {
            console.error(err)
        }
    }

    if (!user) {
        return (
            <div className="container mx-auto my-10 bg-white flex items-center flex-col max-w-sm p-6 drop-shadow-lg rounded-md gap-8">
                <div className="flex gap-1">
                    <BiFoodMenu className="text-3xl" />
                    <h1 className="text-2xl font-semibold">
                        CuisineConnoisseurs
                    </h1>
                </div>
                <form
                    className="flex flex-col self-stretch gap-8"
                    onSubmit={(e) => handleSignup(e)}>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 font-semibold">
                            Username
                        </label>
                        <input
                            type="text"
                            className="border-b focus:outline-none pb-1"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 font-semibold">
                            Password
                        </label>
                        <input
                            type="password"
                            className="border-b focus:outline-none pb-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-600 font-semibold">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="border-b focus:outline-none pb-1"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                        />
                    </div>
                    <button className="bg-slate-900 text-white px-10 py-2 font-semibold text-xl rounded-md self-center">
                        Signup
                    </button>
                </form>
                <Link to="/login" className="hover:text-blue-500">
                    Already have an account? Login
                </Link>
            </div>
        )
    }
    return <Navigate to="/" />
}

export default Signup