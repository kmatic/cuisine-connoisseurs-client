const Posts = () => {
    return (
        <div className="container mx-auto my-10">
            <h2 className="text-2xl">
                Hi, Kristopher! Heres where your friends have been eating...
            </h2>
            <button className="border-slate-900 border-2 border-solid bg-slate-900 text-white px-6 py-1 text-lg font-semibold rounded-md self-start hover:bg-white hover:text-slate-900">
                New Review
            </button>
            <h3 className="text-lg font-semibold border-b-2">REVIEWS</h3>
            <div>
                <div className="bg-white bg-white drop-shadow-md p-6 rounded-lg">
                    <h4>RESTAURANT NAME</h4>
                    <p>RATING: /5</p>
                    <p>REVIEW: </p>
                    <p>5 LIKES</p>
                </div>
            </div>
        </div>
    )
}

export default Posts
