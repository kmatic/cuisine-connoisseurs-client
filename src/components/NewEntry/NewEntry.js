import { useContext, useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import { TokenContext, UserContext } from '../../App'

const NewEntry = () => {
    const [restaurant, setRestaurant] = useState('')
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)

    const { currentUser } = useContext(UserContext)
    const { token } = useContext(TokenContext)

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const res = await fetch('http://localhost:5000/api/posts', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    restaurant: restaurant,
                    rating: rating,
                    description: review,
                    user: currentUser._id,
                }),
            })
            if (res.status !== 200) return console.error('Something went wrong')
            const data = await res.json()
            console.log(data)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="container mx-auto my-10 flex max-w-sm flex-col gap-8 rounded-md bg-white p-6 drop-shadow-lg">
            <form
                className="flex flex-col gap-3"
                onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="text"
                    className="rounded border bg-gray-100 p-2 focus:border-blue-500 focus:outline-none"
                    placeholder="I went to..."
                    value={restaurant}
                    onChange={(e) => setRestaurant(e.target.value)}
                />
                <textarea
                    placeholder="Add a review..."
                    className="rounded border bg-gray-100 p-2 focus:border-blue-500 focus:outline-none"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
                <div>
                    <label>Rating</label>
                    <ReactStars
                        count={5}
                        size={32}
                        isHalf={true}
                        activeColor="#38BDF8"
                        a11y={true}
                        value={rating}
                        onChange={(newRating) => setRating(newRating)}
                    />
                    {/* {rating !== 0 && (
                            <button
                                type="button"
                                onClick={() => setRating(0)}
                                className="self-center text-xs text-white font-semibold rounded py-1 px-2 bg-red-600">
                                CLEAR
                            </button>
                        )} */}
                </div>
                <button className="self-end rounded bg-blue-700 py-1 px-4 text-sm font-semibold text-white">
                    SAVE
                </button>
            </form>
        </div>
    )
}

export default NewEntry
