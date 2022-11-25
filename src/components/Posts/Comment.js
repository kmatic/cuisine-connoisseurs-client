import { Link, useNavigate } from 'react-router-dom'
import defaultProfile from '../../assets/defaultUserImg.png'
import moment from 'moment'

const Comment = ({ comment }) => {
    const navigate = useNavigate()

    return (
        <div className="flex gap-10 border-t-2 py-4">
            <div className="gap flex items-center gap-1">
                <div
                    className="cursor-pointer"
                    onClick={() => navigate(`/profile/${comment.user._id}`)}>
                    <img src={defaultProfile} alt="" className="w-6" />
                </div>
                <div className="flex flex-col">
                    <Link
                        className="text-sm hover:text-blue-800 hover:underline"
                        to={`/profile/${comment.user._id}`}>
                        {comment.user.username}
                    </Link>
                    <span className="text-xs">
                        {moment(comment.timestamp).format('MM/DD/YYYY')}
                    </span>
                </div>
            </div>
            <div className="self-center">{comment.text}</div>
        </div>
    )
}

export default Comment
