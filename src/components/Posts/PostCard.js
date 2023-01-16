import { Link, useNavigate } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import moment from 'moment'
import { FaHeart, FaTrashAlt } from 'react-icons/fa'
import { AiOutlineEllipsis } from 'react-icons/ai'
import { useState, useRef } from 'react'
import Comment from './Comment'
import useOutsideChecker from '../Hooks/useOutsideClick'
import useFetchData from '../Hooks/useFetchData'
import defaultProfile from '../../assets/defaultUserImg.png'

const PostCard = ({
    post,
    currentUser,
    handleLike,
    token,
    handleDeletePost,
}) => {
    const [show, setShow] = useState(false)
    const [commentText, setCommentText] = useState('')
    const [overFlowMenu, setOverFlowMenu] = useState(false)

    const navigate = useNavigate()
    const overFlowRef = useRef(null)
    useOutsideChecker(overFlowRef, setOverFlowMenu)

    const url = `https://cuisineconnoisseursapi.onrender.com/api/posts/${post._id}/comments`
    const { data: comments, setData: setComments } = useFetchData(url)

    function handleComments() {
        setShow(!show)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const res = await fetch(
                `https://cuisineconnoisseursapi.onrender.com/api/posts/${post._id}/comments`,
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
            const obj = await res.json()
            const updatedComments = [...comments, obj.comment]
            setComments(updatedComments)
            setCommentText('')
        } catch (err) {
            console.error(err)
        }
    }

    async function handleDeleteComment(e, commentId) {
        e.preventDefault()
        try {
            const res = await fetch(
                `https://cuisineconnoisseursapi.onrender.com/api/posts/${post._id}/comments/${commentId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (res.status !== 200) return console.error('Something went wrong')
            const obj = await res.json()
            const updatedComments = comments.filter(
                (comment) => comment._id !== obj.deletedComment._id
            )
            setComments(updatedComments)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="border-t-2 py-3">
            <div className="mb-2 flex text-sm text-slate-600">
                <div className="flex items-center gap-1">
                    <div
                        className="cursor-pointer"
                        onClick={() => navigate(`/profile/${post.user._id}`)}>
                        <img
                            src={post.user.imageUrl || defaultProfile}
                            alt=""
                            className="w-7 rounded-full"
                        />
                    </div>
                    <div className="hover:brightness-150">
                        <Link
                            className="break-all font-bold"
                            to={`/profile/${post.user._id}`}>
                            {post.user.username}{' '}
                        </Link>
                        <span>ate at...</span>
                    </div>
                </div>
                <div
                    className="relative ml-auto mr-2 self-center"
                    onClick={() => setOverFlowMenu(!overFlowMenu)}
                    ref={overFlowRef}>
                    <AiOutlineEllipsis className="cursor-pointer text-xl" />
                    {overFlowMenu && (
                        <div className="absolute top-4 right-2 w-44 rounded-md bg-white p-1 drop-shadow-md">
                            {currentUser._id === post.user._id ? (
                                <div
                                    className="flex cursor-pointer items-center gap-1 rounded-md p-2 hover:bg-gray-200"
                                    onClick={() => handleDeletePost(post._id)}>
                                    <FaTrashAlt />
                                    <span>Delete</span>
                                </div>
                            ) : (
                                <div className="p-2">
                                    <span>Not your post :&#41;</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <h4 className="break-words text-xl font-bold">{post.restaurant}</h4>
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
            <p className="break-words">{post.description}</p>
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
                    {comments && comments.length !== 0 ? (
                        <span>
                            {comments.length}{' '}
                            {comments.length === 1 ? 'comment' : 'comments'}
                        </span>
                    ) : (
                        comments &&
                        comments.length === 0 && <span>Leave a comment...</span>
                    )}
                </div>
            </div>
            {show && (
                <div>
                    {comments &&
                        comments.map((comment) => (
                            <Comment
                                key={comment._id}
                                comment={comment}
                                currentUser={currentUser}
                                handleDeleteComment={handleDeleteComment}
                            />
                        ))}
                    {comments && comments.length === 0 && (
                        <div className="border-t-2 py-4 italic">
                            There are no comments yet! Be the first
                        </div>
                    )}

                    <form
                        className="flex flex-col gap-4"
                        onSubmit={(e) => handleSubmit(e)}>
                        <textarea
                            placeholder={`Reply as ${currentUser.username}...`}
                            className="h-28 w-full max-w-xl self-end rounded border p-2 text-sm drop-shadow focus:border-blue-500 focus:outline-none"
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
