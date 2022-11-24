import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
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
            <div className="flex items-center justify-between rounded-xl bg-white p-10 drop-shadow-md">
                <div className="flex gap-10">
                    <div>
                        <img src={userPicture} className="w-28" alt="" />
                        <h2 className="text-center text-2xl font-bold">
                            {profile.username}
                        </h2>
                    </div>
                    {!editMode ? (
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between border-b py-2">
                                <h2 className="text-xl font-bold">ABOUT ME</h2>
                                {currentUser._id === id && (
                                    <button
                                        className="flex items-center gap-1 rounded-md bg-slate-900 px-2 text-xs font-semibold text-white hover:brightness-150"
                                        onClick={handleEditMode}>
                                        <span>EDIT PROFILE</span>
                                        <FiEdit2 />
                                    </button>
                                )}
                            </div>
                            <div className="flex gap-8">
                                <div>
                                    <p className="text-lg font-semibold">
                                        CITY:
                                    </p>
                                    <p className="text-lg font-semibold">
                                        MESSAGE:
                                    </p>
                                    <p className="text-lg font-semibold">
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
                                            'MM/DD/YYYY'
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between border-b py-2">
                                <h2 className="text-xl font-bold">ABOUT ME</h2>
                                {currentUser._id === id && (
                                    <div className="flex gap-2">
                                        <button
                                            className="flex items-center gap-1 rounded-md bg-red-500 px-2 text-xs font-semibold text-white hover:brightness-125"
                                            onClick={() => setEditMode(false)}>
                                            <span>CANCEL</span>
                                        </button>
                                        <button
                                            className="flex items-center gap-1 rounded-md bg-green-500 px-2 text-xs font-semibold text-white hover:brightness-125"
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
                                        className="bg-gray-100 p-1 focus:outline-none"
                                        placeholder="Your City"
                                        value={city}
                                        onChange={(e) =>
                                            setCity(e.target.value)
                                        }
                                    />
                                    <textarea
                                        type="text"
                                        className="bg-gray-100 p-1 focus:outline-none"
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
                <div className="flex self-start text-center">
                    <div className="border-r px-3">
                        <p className="text-2xl font-bold">
                            {profile.posts ? profile.posts.length : '0'}
                        </p>
                        <p className="text-xs text-gray-600">ENTRIES</p>
                    </div>
                    <div className="border-r px-3">
                        <p className="text-2xl font-bold">
                            {profile.followers ? profile.followers.length : '0'}
                        </p>
                        <p className="text-xs text-gray-600">FOLLOWERS</p>
                    </div>
                    <div className="px-3">
                        <p className="text-2xl font-bold">
                            {profile.following ? profile.following.length : '0'}
                        </p>
                        <p className="text-xs text-gray-600">FOLLOWING</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-1 flex flex-col gap-2 rounded-xl bg-white drop-shadow-md">
                    <div className="rounded-t-xl bg-slate-900 p-4">
                        <h2 className="text-xl font-bold text-white">
                            FOLLOWERS
                        </h2>
                    </div>
                    <div className="mb-4 px-4">
                        {!(profile.followers.length === 0) ? (
                            profile.followers.map((follower) => (
                                <div
                                    key={follower._id}
                                    className="flex items-center gap-4 rounded-md py-2">
                                    <div
                                        onClick={() =>
                                            navigate(`/profile/${follower._id}`)
                                        }
                                        className="cursor-pointer">
                                        <img
                                            src={userPicture}
                                            alt=""
                                            className="w-8"
                                        />
                                    </div>
                                    <Link
                                        className="text-lg hover:text-blue-800 hover:underline"
                                        to={`/profile/${follower._id}`}>
                                        {follower.username}
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="py-2 italic">No followers yet</div>
                        )}
                    </div>
                </div>
                <div className="col-span-2 flex flex-col gap-2 rounded-xl bg-white drop-shadow-md">
                    <div className="rounded-t-xl bg-slate-900 p-4">
                        <h2 className="text-xl font-bold text-white">
                            RECENT ACTIVITY
                        </h2>
                    </div>
                    <div className="mb-4 px-4">
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
        </div>
    )
}

export default Profile
