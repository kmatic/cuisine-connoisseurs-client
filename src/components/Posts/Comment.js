import { Link } from 'react-router-dom'
import defaultProfile from '../../assets/defaultUserImg.png'
import moment from 'moment'

const Comment = ({ comment }) => {
    return (
        <div className="flex gap-10 border-t-2 py-3">
            <div className="gap flex items-center gap-1">
                <img src={defaultProfile} alt="" className="w-6" />
                <div className="flex flex-col">
                    <Link className="text-sm">{comment.user.username}</Link>
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
