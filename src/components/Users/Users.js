import { useState, useEffect, useContext } from 'react'
import { BsSearch } from 'react-icons/bs'
import { TokenContext, UserContext } from '../../App'
import UserCard from './UserCard'
import useFetchData from '../Hooks/useFetchData'
import useFocus from '../Hooks/useFocus'

const Users = () => {
    const { token } = useContext(TokenContext)
    const { currentUser, addCurrentUser } = useContext(UserContext)

    const [search, setSearch] = useState({
        query: '',
        filtered: [],
    })

    const { focusRef } = useFocus()

    const url = 'http://localhost:5000/api/users'
    const { data: users } = useFetchData(url)

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
            const obj = await res.json()
            addCurrentUser(obj.user)
            console.log(obj.user)
        } catch (err) {
            console.error(err)
        }
    }

    async function handleUnfollow(e, user) {
        console.log('yeet')
        e.stopPropagation()
        if (
            !user.followers.includes(currentUser._id) ||
            !currentUser.following.includes(user._id)
        ) {
            return
        }

        // followed users new followers with current users id included
        const newUserFollowers = user.followers.filter(
            (id) => id !== currentUser._id
        )

        // current users following with followed user id included
        const newCurrentUserFollowing = currentUser.following.filter(
            (id) => id !== user._id
        )
        console.log('yeet2')
        try {
            const res = await fetch(
                `http://localhost:5000/api/profile/${user._id}/unfollow`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        followers: newUserFollowers,
                        following: newCurrentUserFollowing,
                        user: currentUser._id,
                    }),
                }
            )
            if (res.status !== 200) return console.error('Something went wrong')
            const obj = await res.json()
            addCurrentUser(obj.user)
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
        setSearch({
            query: '',
            filtered: users,
        })
    }, [users])

    return (
        <div className="mx-auto my-10 flex w-full max-w-5xl flex-col gap-6">
            <section className="self-center border-b-2">
                <div className="flex items-center gap-2">
                    <input
                        ref={focusRef}
                        type="text"
                        placeholder="Find a user"
                        className="bg-inherit pb-1 focus:outline-none"
                        value={search.query}
                        onChange={handleSearch}
                    />
                    <BsSearch className="text-gray-400" />
                </div>
            </section>
            <section>
                <h3 className="text-center text-lg font-bold md:text-start">
                    Find others in the CuisineConnoisseurs community:
                </h3>
                <div className="my-8 grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
                    {search.filtered &&
                        search.filtered.map((user) => (
                            <UserCard
                                key={user._id}
                                user={user}
                                currentUser={currentUser}
                                handleFollow={handleFollow}
                                handleUnfollow={handleUnfollow}
                            />
                        ))}
                    {search.filtered && search.filtered.length === 0 && (
                        <span className="col-span-2 font-semibold">
                            No users found with the name "{search.query}"...
                        </span>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Users
