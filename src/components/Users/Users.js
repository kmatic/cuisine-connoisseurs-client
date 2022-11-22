import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import defaultProfile from '../../assets/defaultUserImg.png'

const Users = ({ currentUser, setCurrentUser }) => {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState({
        query: '',
        filtered: [],
    })
    const navigate = useNavigate()

    async function getUsers() {
        try {
            const res = await fetch('http://localhost:5000/api/users')
            const data = await res.json()
            setUsers(data.users)
            setSearch({
                query: '',
                filtered: data.users,
            })
        } catch (err) {
            console.error(err)
        }
    }

    function handleRedirect(id) {
        navigate(`/profile/${id}`)
    }

    async function handleFollow(e, user) {
        e.stopPropagation()
        if (
            user.followers.includes(currentUser._id) ||
            currentUser.following.includes(user._id)
        ) {
            return
        }
        const followers = [...user.followers, currentUser._id]
        const following = [...currentUser.following, user._id]
        const token = localStorage.getItem('token')
        try {
            const res = await fetch(
                `http://localhost:5000/api/profile/${user._id}/follow`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        followers: followers,
                        following: following,
                        user: currentUser._id,
                    }),
                }
            )
            if (res.status !== 200) return console.error('Something went wrong')
            const data = await res.json()
            setCurrentUser(data.user)
            console.log(data)
        } catch (err) {
            console.error(err)
        }
    }

    function handleSearch(e) {
        const results = users.filter((user) => {
            if (e.target.value === '') return users
            return user.username
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
        })
        setSearch({
            query: e.target.value,
            filtered: results,
        })
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className="container mx-auto my-10 flex flex-col gap-6">
            <section className="self-center border-b-2">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Find a user"
                        className="bg-inherit focus:outline-none pb-1"
                        value={search.query}
                        onChange={handleSearch}
                    />
                    <BsSearch className="text-gray-400" />
                </div>
            </section>
            <section>
                <h3 className="font-bold text-lg">
                    Find others in the CuisineConnoisseurs community:
                </h3>
                <div className="grid grid-cols-2 gap-4 max-w-3xl my-8">
                    {!search.filtered.length ? (
                        <span className="font-semibold col-span-2">
                            No users found with the name "{search.query}"...
                        </span>
                    ) : (
                        search.filtered.map((user) => (
                            <div
                                className="flex justify-between bg-white p-5 cursor-pointer drop-shadow-md rounded-md hover:bg-slate-200"
                                key={user._id}
                                onClick={() => handleRedirect(user._id)}>
                                <div className="flex gap-2 items-center">
                                    <img
                                        src={defaultProfile}
                                        alt=""
                                        className="w-6"
                                    />
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
                        ))
                    )}
                </div>
            </section>
        </div>
    )
}

export default Users
