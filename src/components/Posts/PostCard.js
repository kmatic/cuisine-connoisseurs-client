import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import moment from 'moment'
import { FaHeart } from 'react-icons/fa'

const PostCard = ({ post, currentUser, handleLike }) => {
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
                    Posted on {moment(post.timestamp).format('YYYY-MM-DD')}
                </span>
            </div>
            <p>{post.description}</p>
            <div className="mt-2 flex justify-between text-sm text-slate-600">
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
                <div className="cursor-pointer font-semibold hover:brightness-150">
                    Leave a comment...
                </div>
            </div>
        </div>
    )
}

export default PostCard
