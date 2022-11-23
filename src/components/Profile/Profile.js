import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import userPicture from '../../assets/defaultUserImg.png'
import { FiEdit2 } from 'react-icons/fi'
import moment from 'moment'
import { TokenContext, UserContext } from '../../App'

const Profile = () => {
    const { id } = useParams()
    const { currentUser } = useContext(UserContext)
    const { token } = useContext(TokenContext)
    const navigate = useNavigate()

    const [profile, setProfile] = useState({
        followers: [],
        posts: [],
    })

    const [editMode, setEditMode] = useState(false)
    const [city, setCity] = useState('')
    const [message, setMessage] = useState('')

    function handleEditMode() {
        setEditMode(true)
        setCity(profile.city)
        setMessage(profile.bio)
    }

    async function handleSave() {
        try {
            const res = await fetch(`http://localhost:5000/api/profile/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    city: city,
                    bio: message,
                }),
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.status !== 200) return console.error('Something went wrong')
            const data = await res.json()
            // console.log(data)
            setProfile(data.updatedUser)
            setEditMode(false)
        } catch (err) {
            console.error(err)
            setEditMode(false)
        }
    }

    useEffect(() => {
        async function getProfile() {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/profile/${id}`
                )
                const data = await res.json()
                // console.log(data.profile)
                setProfile(data.profile)
            } catch (err) {
                console.error(err)
            }
        }

        getProfile()
    }, [id])

    return (
        <div className="container mx-auto my-10 flex flex-col gap-6">
            <div className="bg-white drop-shadow-md p-10 rounded-lg flex items-center justify-between">
                <div className="flex gap-10">
                    <div>
                        <img src={userPicture} className="w-28" alt="" />
                        <h2 className="text-2xl font-bold text-center">
                            {profile.username}
                        </h2>
                    </div>
                    {!editMode ? (
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between border-b py-2">
                                <h2 className="font-bold text-xl">ABOUT ME</h2>
                                {currentUser._id === id && (
                                    <button
                                        className="bg-slate-900 text-white text-xs px-2 font-semibold rounded-md flex items-center gap-1 hover:brightness-150"
                                        onClick={handleEditMode}>
                                        <span>EDIT PROFILE</span>
                                        <FiEdit2 />
                                    </button>
                                )}
                            </div>
                            <div className="flex gap-8">
                                <div>
                                    <p className="font-semibold text-lg">
                                        CITY:
                                    </p>
                                    <p className="font-semibold text-lg">
                                        MESSAGE:
                                    </p>
                                    <p className="font-semibold text-lg">
                                        MEMBER SINCE:
                                    </p>
                                </div>
                                <div>
                                    <p className="text-lg">
                                        {profile.city || 'No city'}
                                    </p>
                                    <p className="text-lg">
                                        {profile.bio || 'No message'}
                                    </p>
                                    <p className="text-lg">
                                        {moment(profile.created).format(
                                            'YYYY-MM-DD'
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between border-b py-2">
                                <h2 className="font-bold text-xl">ABOUT ME</h2>
                                {currentUser._id === id && (
                                    <div className="flex gap-2">
                                        <button
                                            className="bg-red-500 text-white text-xs px-2 font-semibold rounded-md flex items-center gap-1 hover:brightness-125"
                                            onClick={() => setEditMode(false)}>
                                            <span>CANCEL</span>
                                        </button>
                                        <button
                                            className="bg-green-500 text-white text-xs px-2 font-semibold rounded-md flex items-center gap-1 hover:brightness-125"
                                            onClick={handleSave}>
                                            <span>SAVE CHANGES</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div>
                                <form className="flex flex-col gap-2">
                                    <input
                                        type="text"
                                        className="bg-gray-100 focus:outline-none p-1"
                                        placeholder="Your City"
                                        value={city}
                                        onChange={(e) =>
                                            setCity(e.target.value)
                                        }
                                    />
                                    <textarea
                                        type="text"
                                        className="bg-gray-100 focus:outline-none p-1"
                                        placeholder="Message to other users"
                                        value={message}
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                    />
                                </form>
                            </div>
                        </div>
                    )}
                </div>
                <div className="flex text-center self-start">
                    <div className="px-3 border-r">
                        <p className="font-bold text-2xl">
                            {profile.posts ? profile.posts.length : '0'}
                        </p>
                        <p className="text-xs text-gray-600">ENTRIES</p>
                    </div>
                    <div className="px-3 border-r">
                        <p className="font-bold text-2xl">
                            {profile.followers ? profile.followers.length : '0'}
                        </p>
                        <p className="text-xs text-gray-600">FOLLOWERS</p>
                    </div>
                    <div className="px-3">
                        <p className="font-bold text-2xl">
                            {profile.following ? profile.following.length : '0'}
                        </p>
                        <p className="text-xs text-gray-600">FOLLOWING</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white drop-shadow-md p-8 rounded-lg col-span-1 flex flex-col gap-2">
                    <h2 className="font-bold text-xl">FOLLOWERS</h2>
                    {!(profile.followers.length === 0) ? (
                        profile.followers.map((follower) => (
                            <div
                                key={follower._id}
                                className="flex gap-4 items-center cursor-pointer hover:bg-gray-200 py-2 rounded-md"
                                onClick={() =>
                                    navigate(`/profile/${follower._id}}`)
                                }>
                                <img src={userPicture} alt="" className="w-8" />
                                <p className="text-lg">{follower.username}</p>
                            </div>
                        ))
                    ) : (
                        <div className="py-2 italic">No followers yet</div>
                    )}
                </div>
                <div className="bg-white drop-shadow-md p-8 rounded-lg col-span-2 flex flex-col gap-2">
                    <h2 className="font-bold text-xl">RECENT ACTIVITY</h2>
                    {!(profile.posts.length === 0) ? (
                        profile.posts.map((post) => (
                            <div key={post._id}>{post.text}</div>
                        ))
                    ) : (
                        <div className="py-2 italic">No posts yet</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile
