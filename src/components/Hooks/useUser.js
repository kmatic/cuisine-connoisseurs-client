import { useState } from 'react'

const useUser = () => {
    const getUser = () => {
        const user = localStorage.getItem('user')
        return user
    }

    const [currentUser, setCurrentUser] = useState(getUser())

    const addCurrentUser = (user) => {
        localStorage.setItem('user', user)
        setCurrentUser(user)
    }

    const removeCurrentUser = () => {
        localStorage.removeItem('user')
        setCurrentUser(null)
    }

    return { addCurrentUser, currentUser, removeCurrentUser }
}

export default useUser
