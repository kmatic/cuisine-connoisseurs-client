import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import moment from 'moment'
import { FaHeart } from 'react-icons/fa'
import { useState } from 'react'
import defaultProfile from '../../assets/defaultUserImg.png'

const PostCard = ({ post, currentUser, handleLike, token }) => {
    const [comments, setComments] = useState([])
    const [show, setShow] = useState(false)
    const [commentText, setCommentText] = useState('')

    async function getComments() {
        try {
            const res = await fetch(
                `http://localhost:5000/api/posts/${post._id}/comments`
            )
            const data = await res.json()
            setComments(data.comments)
        } catch (err) {
            console.error(err)
        }
    }

    console.log(comments)

    function handleComments() {
        getComments()
        setShow(true)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const res = await fetch(
                `http://localhost:5000/api/posts/${post._id}/comments`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        text: commentText,
                        user: currentUser._id,
                    }),
                }
            )
            if (res.status !== 200) return console.error('Something went wrong')
            const data = await res.json()
            console.log(data)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="border-t-2 py-3">
            <div className="mb-2 inline-block text-sm text-slate-600 hover:brightness-150">
                <Link className="font-bold" to={`/profile/${post.user._id}`}>
                    {post.user.username}{' '}
                </Link>
                <span>ate at...</span>
            </div>
            <h4 className="text-xl font-bold">{post.restaurant}</h4>
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
                    Posted on {moment(post.timestamp).format('MM/DD/YYYY')}
                </span>
            </div>
            <p>{post.description}</p>
            <div className="my-2 flex justify-between text-sm text-slate-600">
                <div className="flex items-center gap-2">
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
                                <span className="font-semibold">Liked</span>
                            </>
                        )}
                    </div>
                    <div>
                        {post.likes.length !== 0 && (
                            <span>
                                {post.likes.length}{' '}
                                {post.likes.length === 1 ? 'like' : 'likes'}
                            </span>
                        )}
                    </div>
                </div>
                <div
                    className="cursor-pointer font-semibold hover:brightness-150"
                    onClick={() => handleComments()}>
                    Leave a comment...
                </div>
            </div>
            {show && (
                <div>
                    {comments.map((comment) => (
                        <div className="flex gap-10 border-t-2 py-3">
                            <div className="gap flex items-center gap-1">
                                <img
                                    src={defaultProfile}
                                    alt=""
                                    className="w-6"
                                />
                                <div className="flex flex-col">
                                    <Link className="text-sm">
                                        {comment.user.username}
                                    </Link>
                                    <span className="text-xs">
                                        {comment.timestamp}
                                    </span>
                                </div>
                            </div>
                            <div className="self-center">{comment.text}</div>
                        </div>
                    ))}
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={(e) => handleSubmit(e)}>
                        <textarea
                            placeholder={`Reply as ${currentUser.username}...`}
                            className="w-full max-w-xl self-end rounded border p-2 drop-shadow focus:border-blue-500 focus:outline-none"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button className="self-end rounded bg-blue-700 py-1 px-4 text-sm font-semibold text-white">
                            POST
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default PostCard
