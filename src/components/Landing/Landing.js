import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div className="mx-auto my-10 w-full max-w-5xl">
            <section className="flex gap-6">
                <div className="flex max-w-xs flex-col gap-6">
                    <h1 className="text-4xl font-bold">
                        Track restaurants you've dined in
                    </h1>
                    <p className="text-lg">
                        Rate your meals, provide detailed reviews, and share
                        with your friends. Cuisine Connoisseurs' everything a
                        foodie needs.
                    </p>
                    <Link to="/signup">
                        <button className="self-start rounded-md border-2 border-solid border-slate-900 bg-slate-900 px-10 py-2 text-lg font-semibold text-white hover:bg-inherit hover:text-slate-900">
                            Create an Account
                        </button>
                    </Link>
                </div>
                <div className="w-96 bg-black">PICTURE</div>
            </section>
            <section className="my-8 text-center">
                <h2 className="text-lg">Made with:</h2>
                <div>React Express Node TailwindCSS BUT IMAGES</div>
            </section>
        </div>
    )
}

export default Landing
