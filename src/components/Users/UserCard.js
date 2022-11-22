import defaultProfile from '../../assets/defaultUserImg.png'
import { useNavigate } from 'react-router-dom'

const UserCard = ({ user, currentUser, handleFollow }) => {
    const navigate = useNavigate()

    function handleRedirect(id) {
        navigate(`/profile/${id}`)
    }

    return (
        <div
            className="flex justify-between bg-white p-5 cursor-pointer drop-shadow-md rounded-md hover:bg-slate-200"
            key={user._id}
            onClick={() => handleRedirect(user._id)}>
            <div className="flex gap-2 items-center">
                <img src={defaultProfile} alt="" className="w-6" />
                <p>{user.username}</p>
            </div>
            {!(currentUser._id === user._id) && (
                <button
                    className="bg-slate-900 text-white text-xs px-2 font-semibold rounded-md flex items-center gap-1 hover:brightness-150"
                    onClick={(e) => handleFollow(e, user)}>
                    FOLLOW +
                </button>
            )}
        </div>
    )
}

export default UserCard
