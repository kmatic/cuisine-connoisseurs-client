import { Link, useNavigate } from 'react-router-dom'
import defaultProfile from '../../assets/defaultUserImg.png'
import moment from 'moment'
import { FaTrashAlt } from 'react-icons/fa'

const Comment = ({ comment, currentUser, handleDeleteComment }) => {
    const navigate = useNavigate()

    return (
        <div className="flex gap-10 border-t-2 py-4">
            <div className="gap flex flex-col items-center gap-1 self-start md:flex-row">
                <div
                    className="shrink-0 cursor-pointer self-start md:self-center"
                    onClick={() => navigate(`/profile/${comment.user._id}`)}>
                    <img src={defaultProfile} alt="" className="w-6" />
                </div>
                <div className="flex flex-col">
                    <Link
                        className="text-sm hover:text-blue-800 hover:underline"
                        to={`/profile/${comment.user._id}`}>
                        {comment.user.username}
                    </Link>
                    <span className="text-xs text-gray-400">
                        {moment(comment.timestamp).format('MM/DD/YY')}
                    </span>
                </div>
            </div>
            <p className="max-w-3xl break-all">{comment.text}</p>
            {currentUser._id === comment.user._id && (
                <div
                    className="ml-auto mr-2 cursor-pointer self-center"
                    onClick={(e) => handleDeleteComment(e, comment._id)}>
                    <FaTrashAlt className="text-red-600" />
                </div>
            )}
        </div>
    )
}

export default Comment
