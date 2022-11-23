import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './components/Landing/Landing'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Users from './components/Users/Users'
import Profile from './components/Profile/Profile'
import Posts from './components/Posts/Posts'
import { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'

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
                    <Route
                        path="/"
                        element={
                            !user ? (
                                <Landing />
                            ) : (
                                <Navigate replace to="/posts" />
                            )
                        }
                    />
                    <Route
                        path="/login"
                        element={<Login user={user} setUser={setUser} />}
                    />
                    <Route path="/signup" element={<Signup user={user} />} />
                    <Route
                        path="/users"
                        element={
                            !user ? (
                                <Navigate replace to="/login" />
                            ) : (
                                <Users
                                    currentUser={user}
                                    setCurrentUser={setUser}
                                />
                            )
                        }
                    />
                    <Route
                        path="/profile/:id"
                        element={
                            !user ? (
                                <Navigate replace to="/login" />
                            ) : (
                                <Profile user={user} />
                            )
                        }
                    />
                    <Route
                        path="/posts"
                        element={
                            !user ? <Navigate replace to="/login" /> : <Posts />
                        }
                    />
                </Routes>
            </main>
            {/* <Footer /> */}
        </Router>
    )
}

export default App
