import { BiFoodMenu } from 'react-icons/bi'

const Login = () => {
    return (
        <div className="bg-white flex items-center flex-col max-w-sm h-96 p-6 drop-shadow-md rounded-md gap-8">
            <div className="flex gap-1">
                <BiFoodMenu className="text-3xl" />
                <h1 className="text-2xl font-semibold">CuisineConnoisseurs</h1>
            </div>
            <form className="flex flex-col self-stretch gap-8">
                <div className="flex flex-col">
                    <label className="text-sm text-gray-600 font-semibold">
                        Username
                    </label>
                    <input
                        type="text"
                        className="border-b focus:outline-none pb-1"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm text-gray-600 font-semibold">
                        Password
                    </label>
                    <input
                        type="password"
                        className="border-b focus:outline-none pb-1"
                    />
                </div>
                <button className="bg-slate-900 text-white px-10 py-2 font-semibold text-xl rounded-md self-center">
                    Signin
                </button>
            </form>
            <a>Or, create an account</a>
        </div>
    )
}

export default Login
