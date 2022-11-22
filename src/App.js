import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Users from './pages/Users'
import Profile from './pages/Profile'
import Posts from './pages/Posts'

const App = () => {
    const [user, setUser] = useState(false)

    useEffect(() => {
        const isUser = localStorage.getItem('user')

        if (isUser) {
            setUser(isUser)
        } else {
            setUser(false)
        }
    }, [])

    return (
        <Router basename="/">
            <Header user={user} setUser={setUser} />
            <main>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route
                        path="/login"
                        element={<Login user={user} setUser={setUser} />}
                    />
                    <Route path="/signup" element={<Signup user={user} />} />
                    <Route
                        path="/users"
                        element={
                            <Users
                                currentUser={user}
                                setCurrentUser={setUser}
                            />
                        }
                    />
                    <Route
                        path="/profile/:id"
                        element={<Profile user={user} />}
                    />
                    <Route path="/posts" element={<Posts />} />
                </Routes>
            </main>
            {/* <Footer /> */}
        </Router>
    )
}

export default App
