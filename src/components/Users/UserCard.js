import defaultProfile from '../../assets/defaultUserImg.png'
import { useNavigate } from 'react-router-dom'

const UserCard = ({ user, currentUser, handleFollow }) => {
    const navigate = useNavigate()

    console.log(currentUser)

    return (
        <div
            className="flex justify-between bg-white p-5 cursor-pointer drop-shadow-md rounded-md hover:bg-slate-200"
            key={user._id}
            onClick={() => navigate(`/profile/${user._id}`)}>
            <div className="flex gap-2 items-center">
                <img src={defaultProfile} alt="" className="w-6" />
                <p>{user.username}</p>
            </div>
            {currentUser.following.includes(user._id) ? (
                <button
                    className="bg-gray-400 text-white text-xs px-2 font-semibold rounded-md"
                    disabled>
                    FOLLOWED
                </button>
            ) : !(currentUser._id === user._id) ? (
                <button
                    className="bg-slate-900 text-white text-xs px-2 font-semibold rounded-md flex items-center gap-1 hover:brightness-150"
                    onClick={(e) => handleFollow(e, user)}>
                    FOLLOW +
                </button>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default UserCard
