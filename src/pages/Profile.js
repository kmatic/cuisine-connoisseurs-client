import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import userPicture from '../assets/defaultUserImg.png'

const Profile = () => {
    const [profile, setProfile] = useState({})
    const { id } = useParams()

    async function getProfile() {
        try {
            const res = await fetch(`http://localhost:5000/api/profile/${id}`)
            const data = await res.json()
            setProfile(data.profile)
            console.log(data.profile)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <div className="flex flex-col gap-12">
            <div className="bg-white drop-shadow-md p-8 rounded-lg">
                <div className="flex items-center gap-6">
                    <img src={userPicture} className="w-28" />
                    <h2 className="text-2xl font-bold">{profile.username}</h2>
                </div>
                <div>
                    <h2 className="font-bold text-xl">About me</h2>
                    <p>BIO: {profile.bio || 'No bio yet'}</p>
                    <p>JOINED: {profile.created}</p>
                </div>
            </div>
            <div className="bg-white drop-shadow-md p-8 rounded-lg">
                <h2 className="font-bold text-xl">Friends</h2>
            </div>
            <div className="bg-white drop-shadow-md p-8 rounded-lg">
                <h2 className="font-bold text-xl">Posts</h2>
            </div>
        </div>
    )
}

export default Profile
