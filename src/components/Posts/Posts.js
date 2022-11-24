import { useNavigate, Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import { useContext, useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import moment from 'moment'
import { TokenContext, UserContext } from '../../App'

const Posts = () => {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    const { currentUser } = useContext(UserContext)
    const { token } = useContext(TokenContext)

    async function getPosts() {
        try {
            const res = await fetch('http://localhost:5000/api/posts')
            const data = await res.json()
            setPosts(data.posts)
        } catch (err) {
            console.error(err)
        }
    }

    async function handleLike(post) {
        let newLikes = []

        if (post.likes.includes(currentUser._id)) {
            newLikes = post.likes.filter((id) => id !== currentUser._id)
        } else {
            newLikes = [...post.likes, currentUser._id]
        }

        try {
            const res = await fetch(
                `http://localhost:5000/api/posts/${post._id}/like`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        likes: newLikes,
                    }),
                }
            )
            if (res.status !== 200) return console.error('Something went wrong')
            const data = await res.json()
            const updatedPosts = posts.map((updatedPost) => {
                if (updatedPost._id === data.post._id) {
                    return data.post
                }
                return updatedPost
            })
            setPosts(updatedPosts)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div className="container mx-auto my-10 flex flex-col gap-6">
            <h2 className="text-center text-2xl">
                Hi, Kristopher! Heres where users you follow have been eating...
            </h2>
            <button
                className="self-start self-center rounded-md border-2 border-solid border-slate-900 bg-slate-900 px-6 py-1 text-lg font-semibold text-white hover:bg-inherit hover:text-slate-900"
                onClick={() => navigate(`/new`)}>
                &#43; NEW ENTRY
            </button>
            <div>
                <h3 className="text-lg font-semibold">RECENT REVIEWS</h3>
                <div>
                    {posts.map((post) => (
                        <div key={post._id} className="border-t-2 py-3">
                            <div className="mb-2 inline-block text-sm text-slate-600 hover:brightness-150">
                                <Link className="font-bold">
                                    {post.user.username}{' '}
                                </Link>
                                <span>ate at...</span>
                            </div>
                            <h4 className="text-xl font-bold">
                                {post.restaurant}
                            </h4>
                            <div className="flex items-center gap-2">
                                <ReactStars
                                    count={5}
                                    size={24}
                                    isHalf={true}
                                    activeColor="#38BDF8"
                                    value={post.rating}
                                    edit={false}
                                />
                                <span className="text-sm text-slate-600">
                                    Posted on{' '}
                                    {moment(post.timestamp).format(
                                        'YYYY-MM-DD'
                                    )}
                                </span>
                            </div>
                            <p>{post.description}</p>
                            <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                                <div
                                    className="flex cursor-pointer items-center gap-1 hover:brightness-125"
                                    onClick={() => handleLike(post)}>
                                    {!post.likes.includes(currentUser._id) ? (
                                        <>
                                            <FaHeart />
                                            <span className="font-semibold">
                                                Like review
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <FaHeart className="text-red-600" />
                                            <span className="font-semibold">
                                                Liked
                                            </span>
                                        </>
                                    )}
                                </div>
                                <div>
                                    {post.likes.length !== 0 && (
                                        <span>
                                            {post.likes.length}{' '}
                                            {post.likes.length === 1
                                                ? 'like'
                                                : 'likes'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Posts
