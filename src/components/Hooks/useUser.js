import { useState } from 'react'

const useUser = () => {
    const getUser = () => {
        const jsonUser = localStorage.getItem('user')
        const user = JSON.parse(jsonUser)
        return user
    }

    const [currentUser, setCurrentUser] = useState(getUser())

    const addCurrentUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user))
        setCurrentUser(user)
    }

    const removeCurrentUser = () => {
        localStorage.removeItem('user')
        setCurrentUser(null)
    }

    return { addCurrentUser, currentUser, removeCurrentUser }
}

export default useUser
