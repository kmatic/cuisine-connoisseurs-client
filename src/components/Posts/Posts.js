const Posts = () => {
    return (
        <div className="container mx-auto my-10 flex flex-col gap-6">
            <h2 className="text-2xl text-center">
                Hi, Kristopher! Heres where users you follow have been eating...
            </h2>
            <button className="border-slate-900 border-2 border-solid bg-slate-900 text-white px-6 py-1 text-lg font-semibold rounded-md self-start hover:bg-inherit hover:text-slate-900 self-center">
                &#43; NEW ENTRY
            </button>
            <div>
                <h3 className="text-lg font-semibold">RECENT REVIEWS</h3>
                <div>
                    <div className="py-6 border-t-2">
                        <h4>RESTAURANT NAME</h4>
                        <p>RATING: /5</p>
                        <p>REVIEW: </p>
                        <p>5 LIKES</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Posts
