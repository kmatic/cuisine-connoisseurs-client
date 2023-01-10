import { useState, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import defaultProfile from '../../assets/defaultUserImg.png'
import { FiEdit2 } from 'react-icons/fi'
import moment from 'moment'
import { TokenContext, UserContext } from '../../App'
import ReactStars from 'react-rating-stars-component'
import useFetchData from '../Hooks/useFetchData'

const Profile = () => {
    const { id } = useParams()
    const { currentUser } = useContext(UserContext)
    const { token } = useContext(TokenContext)
    const navigate = useNavigate()

    const postsUrl = `http://localhost:5000/api/posts/profile/${id}`
    const profileUrl = `http://localhost:5000/api/profile/${id}`

    const { data: posts } = useFetchData(postsUrl)
    const { data: profile, setData: setProfile } = useFetchData(profileUrl)

    // edit form
    const [editMode, setEditMode] = useState(false)
    const [city, setCity] = useState('')
    const [message, setMessage] = useState('')

    // picture state
    const [file, setFile] = useState()

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
            setProfile((prevState) => ({
                ...prevState,
                bio: data.updatedUser.bio,
                city: data.updatedUser.city,
            }))
            setEditMode(false)
        } catch (err) {
            console.error(err)
            setEditMode(false)
        }
    }

    async function handleUpload(e) {
        e.preventDefault()

        const formData = new FormData()
        formData.append('image', file)

        try {
            const res = await fetch(
                `http://localhost:5000/api/profile/${id}/image`,
                {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (res.status !== 200) return console.error('Something went wrong')
            const data = await res.json()
            setProfile((prevState) => ({
                ...prevState,
                imageUrl: data.imageUrl,
            }))
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="mx-auto my-10 flex w-full max-w-5xl flex-col gap-6">
            <div className="grid grid-cols-1 gap-y-6 rounded-xl bg-white p-8 drop-shadow-md min-[850px]:grid-cols-3">
                <div className="col-span-2 flex flex-col gap-6 min-[850px]:flex-row">
                    <div className="relative flex flex-col gap-1 self-center">
                        {profile && (
                            <img
                                src={profile.imageUrl || defaultProfile}
                                className="flex w-28 shrink-0 rounded-full"
                                alt=""
                            />
                        )}
                        {editMode && (
                            <form
                                className="flex flex-col gap-1"
                                onSubmit={(e) => handleUpload(e)}>
                                <input
                                    className="cursor-pointer bg-gray-100 text-xs text-gray-900"
                                    type="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    accept="image/*"
                                />
                                <button
                                    type="submit"
                                    className="h-6 flex-none self-start rounded-md bg-green-500 px-2 text-xs font-semibold text-white hover:brightness-125">
                                    SAVE PICTURE
                                </button>
                            </form>
                        )}
                    </div>
                    {!editMode ? (
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between border-b py-2">
                                <h2 className="break-all text-lg font-bold min-[850px]:text-2xl ">
                                    {profile && profile.username}
                                </h2>
                                {currentUser._id === id && (
                                    <button
                                        className="flex h-6 flex-none items-center gap-1 self-center rounded-md bg-slate-900 px-2 text-xs font-semibold text-white hover:brightness-150"
                                        onClick={handleEditMode}>
                                        <span>EDIT PROFILE</span>
                                        <FiEdit2 />
                                    </button>
                                )}
                            </div>
                            <div className="flex gap-8 text-sm min-[850px]:text-lg">
                                <div className="font-semibold">
                                    <p>JOINED:</p>
                                    <p>CITY:</p>
                                    <p>BIO:</p>
                                </div>
                                <div>
                                    {profile && (
                                        <>
                                            <p>
                                                {moment(profile.created).format(
                                                    'MM/DD/YYYY'
                                                )}
                                            </p>
                                            <p className="break-all">
                                                {profile.city || 'No city'}
                                            </p>
                                            <p className="text-clip">
                                                {profile.bio || 'No message'}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex w-full flex-col gap-2">
                            <div className="flex justify-between border-b py-2">
                                <h2 className="break-all text-lg font-bold min-[850px]:text-2xl">
                                    {profile.username}
                                </h2>
                                {currentUser._id === id && (
                                    <div className="flex gap-2">
                                        <button
                                            className="h-6 flex-none self-center rounded-md bg-red-500 px-2 text-xs font-semibold text-white hover:brightness-125"
                                            onClick={() => setEditMode(false)}>
                                            <span>CANCEL</span>
                                        </button>
                                        <button
                                            className="h-6 flex-none self-center rounded-md bg-green-500 px-2 text-xs font-semibold text-white hover:brightness-125"
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
                                        className="w-full bg-gray-100 p-1 focus:outline-none"
                                        placeholder="Your City"
                                        value={city}
                                        onChange={(e) =>
                                            setCity(e.target.value)
                                        }
                                    />
                                    <textarea
                                        type="text"
                                        className="w-full bg-gray-100 p-1 focus:outline-none"
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
                <div className="flex self-start justify-self-center text-center min-[850px]:justify-self-end">
                    <div className="border-r px-3">
                        <p className="text-2xl font-bold">
                            {posts && posts.length}
                        </p>
                        <p className="text-xs text-gray-600">ENTRIES</p>
                    </div>
                    <div className="border-r px-3">
                        <p className="text-2xl font-bold">
                            {profile && profile.followers.length}
                        </p>
                        <p className="text-xs text-gray-600">FOLLOWERS</p>
                    </div>
                    <div className="px-3">
                        <p className="text-2xl font-bold">
                            {profile && profile.following.length}
                        </p>
                        <p className="text-xs text-gray-600">FOLLOWING</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-y-6 min-[850px]:grid-cols-3 min-[850px]:gap-6">
                <div className="col-span-1 flex flex-col gap-2 self-start rounded-xl bg-white drop-shadow-md">
                    <div className="rounded-t-xl bg-slate-900 p-4">
                        <h2 className="text-xl font-bold text-white">
                            FOLLOWERS
                        </h2>
                    </div>
                    <div className="mb-4 px-4">
                        {profile &&
                            profile.followers.map((follower) => (
                                <div
                                    key={follower._id}
                                    className="flex items-center gap-4 rounded-md py-2">
                                    <div
                                        onClick={() =>
                                            navigate(`/profile/${follower._id}`)
                                        }
                                        className="shrink-0 cursor-pointer">
                                        <img
                                            src={
                                                follower.imageUrl ||
                                                defaultProfile
                                            }
                                            alt=""
                                            className="w-8 rounded-full"
                                        />
                                    </div>
                                    <Link
                                        className="break-all text-lg hover:text-blue-800 hover:underline"
                                        to={`/profile/${follower._id}`}>
                                        {follower.username}
                                    </Link>
                                </div>
                            ))}
                        {profile && profile.followers.length === 0 && (
                            <div className="py-2 italic">No followers yet</div>
                        )}
                    </div>
                </div>
                <div className="col-span-2 flex flex-col gap-2 self-start rounded-xl bg-white drop-shadow-md">
                    <div className="flex flex-col rounded-t-xl bg-slate-900 p-4 text-white min-[850px]:flex-row min-[850px]:items-center">
                        <h2 className="text-xl font-bold">RECENT ACTIVITY</h2>
                        <p className="text-xs min-[850px]:ml-auto">
                            View the posts on the homepage to like and comment!
                        </p>
                    </div>
                    <div className="relative mb-4 px-4">
                        {posts &&
                            posts.map((post) => (
                                <div
                                    key={post._id}
                                    className={`py-3 ${
                                        !currentUser.following.includes(id) &&
                                        !(currentUser._id === id) &&
                                        'blur-md'
                                    }`}>
                                    <h4 className="break-words text-xl font-bold">
                                        {post.restaurant}
                                    </h4>
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
                                            Posted on{' '}
                                            {moment(post.timestamp).format(
                                                'MM/DD/YYYY'
                                            )}
                                        </span>
                                    </div>
                                    <p className="break-words">
                                        {post.description}
                                    </p>
                                </div>
                            ))}
                        {posts && posts.length === 0 && (
                            <div
                                className={`py-3 italic ${
                                    !currentUser.following.includes(id) &&
                                    !(currentUser._id === id) &&
                                    'blur-md'
                                }`}>
                                No posts yet
                            </div>
                        )}
                        {!currentUser.following.includes(id) &&
                            !(currentUser._id === id) && (
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform font-semibold">
                                    FOLLOW THIS USER TO SEE THEIR POSTS
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
