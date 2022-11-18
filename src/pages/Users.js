import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Users = () => {
    const [users, setUsers] = useState([])
    const [friendRequests, setFriendRequests] = useState([])
    const navigate = useNavigate()

    async function getUsers() {
        try {
            const res = await fetch('http://localhost:5000/api/users')
            const data = await res.json()
            setUsers(data.users)
        } catch (err) {
            console.error(err)
        }
    }

    async function getRequests() {
        // TODO
        try {
        } catch (err) {
            console.error(err)
        }
    }

    function handleRedirect(id) {
        navigate(`/profile/${id}`)
    }

    function handleAdd(e) {
        e.stopPropagation()
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div>
            <section>
                <h3>Pending friend requests:</h3>
                <div className="flex flex-col gap-4">
                    {friendRequests.map((request) => (
                        <div className="flex justify-between bg-slate-400 p-4">
                            <p>{request}</p>
                            <button>Add +</button>
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <h3>Find others in the CuisineConnoisseurs community:</h3>
                <div className="flex flex-col gap-4">
                    {users.map((user) => (
                        <div
                            className="flex justify-between bg-slate-400 p-4 cursor-pointer"
                            key={user._id}
                            onClick={() => handleRedirect(user._id)}>
                            <p>{user.username}</p>
                            <button onClick={(e) => handleAdd(e)}>Add +</button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Users
