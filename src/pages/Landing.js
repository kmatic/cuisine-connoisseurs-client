const Landing = () => {
    return (
        <div className="p-4 py-8 mx-2">
            <section className="flex gap-6">
                <div className="max-w-xs flex flex-col gap-6">
                    <h1 className="text-4xl font-bold">
                        Track restaurants you've dined in
                    </h1>
                    <p className="text-lg">
                        Rate your meals, provide detailed reviews, and share
                        with your friends. Cuisine Connoisseurs' everything a
                        foodie needs.
                    </p>
                    <button className="border-slate-900 border border-solid bg-slate-900 text-white px-10 py-2 text-lg font-semibold rounded-md self-start hover:bg-white hover:text-slate-900">
                        Create an Account
                    </button>
                </div>
                <div className="bg-black w-3/6">PICTURE</div>
            </section>
            <section className="my-8 text-center">
                <h2 className="text-lg">Made with:</h2>
                <div>React Express Node TailwindCSS BUT IMAGES</div>
            </section>
        </div>
    )
}

export default Landing
