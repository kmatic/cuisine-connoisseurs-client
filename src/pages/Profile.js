import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import userPicture from '../assets/defaultUserImg.png'
import { FiEdit2 } from 'react-icons/fi'

const Profile = ({ user }) => {
    const [profile, setProfile] = useState({})
    const { id } = useParams()

    useEffect(() => {
        async function getProfile() {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/profile/${id}`
                )
                const data = await res.json()
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
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between border-b py-2">
                            <h2 className="font-bold text-xl">ABOUT ME</h2>
                            {user._id === id && (
                                <button className="bg-slate-900 text-white text-xs px-2 font-semibold rounded-md flex items-center gap-1 hover:brightness-150">
                                    <span>EDIT PROFILE</span>
                                    <FiEdit2 />
                                </button>
                            )}
                        </div>
                        <div className="flex gap-8">
                            <div>
                                <p className="font-semibold text-lg">CITY:</p>
                                <p className="font-semibold text-lg">
                                    MESSAGE:
                                </p>
                                <p className="font-semibold text-lg">
                                    MEMBER SINCE:
                                </p>
                            </div>
                            <div>
                                <p className="text-lg">Vancouver</p>
                                <p className="text-lg">
                                    {profile.bio || 'No bio yet'}
                                </p>
                                <p className="text-lg">{profile.created}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex text-center self-start">
                    <div className="px-3 border-r">
                        <p className="font-bold text-2xl">10</p>
                        <p className="text-xs text-gray-600">ENTRIES</p>
                    </div>
                    <div className="px-3 border-r">
                        <p className="font-bold text-2xl">2</p>
                        <p className="text-xs text-gray-600">FOLLOWERS</p>
                    </div>
                    <div className="px-3">
                        <p className="font-bold text-2xl">3</p>
                        <p className="text-xs text-gray-600">FOLLOWING</p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
                <div className="bg-white drop-shadow-md p-8 rounded-lg col-span-1">
                    <h2 className="font-bold text-xl">FOLLOWERS</h2>
                </div>
                <div className="bg-white drop-shadow-md p-8 rounded-lg col-span-2">
                    <h2 className="font-bold text-xl">RECENT ACTIVITY</h2>
                </div>
            </div>
        </div>
    )
}

export default Profile
