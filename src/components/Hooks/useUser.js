import { useState } from 'react'

const useUser = () => {
    const getUser = () => {
        const user = localStorage.getItem('user')
        return user
    }

    const [user, setUser] = useState(getUser())

    const addUser = (user) => {
        localStorage.setItem('user', user)
        setUser(user)
    }

    const removeUser = () => {
        localStorage.removeItem('user')
        setUser(null)
    }

    return { addUser, user, removeUser }
}

export default useUser
