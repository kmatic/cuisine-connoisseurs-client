import { BiFoodMenu } from 'react-icons/bi'

const Header = () => {
    return (
        <header className="bg-slate-900 text-white p-4">
            <nav className="flex items-center justify-between m-2">
                <div className="flex items-center gap-1">
                    <BiFoodMenu className="text-3xl" />
                    <h1 className="text-2xl font-semibold">
                        CuisineConnoisseurs
                    </h1>
                </div>
                <ul className="flex font-semibold text-base gap-3">
                    <li>Signin</li>
                    <li>Signup</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
