import defaultProfile from '../../assets/defaultUserImg.png'
import { useNavigate } from 'react-router-dom'

const UserCard = ({ user, currentUser, handleFollow, handleUnfollow }) => {
    const navigate = useNavigate()

    return (
        <div
            className="flex cursor-pointer justify-between self-start rounded-xl bg-white p-5 drop-shadow-md hover:bg-slate-200"
            key={user._id}
            onClick={() => navigate(`/profile/${user._id}`)}>
            <div className="flex items-center gap-2">
                <img src={defaultProfile} alt="" className="w-6" />
                <p className="break-all">{user.username}</p>
            </div>
            {currentUser.following.includes(user._id) ? (
                <button
                    className="h-6 flex-none self-center rounded-md bg-gray-400 px-2 text-xs font-semibold text-white hover:bg-red-600"
                    onClick={(e) => handleUnfollow(e, user)}>
                    FOLLOWED
                </button>
            ) : !(currentUser._id === user._id) ? (
                <button
                    className="h-6 flex-none self-center rounded-md bg-slate-900 px-2 text-xs font-semibold text-white hover:bg-green-600"
                    onClick={(e) => handleFollow(e, user)}>
                    FOLLOW +
                </button>
            ) : null}
        </div>
    )
}

export default UserCard
