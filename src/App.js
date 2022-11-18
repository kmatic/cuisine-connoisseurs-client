import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Users from './pages/Users'
import Profile from './pages/Profile'

const App = () => {
    const [auth, setAuth] = useState(false)

    useEffect(() => {
        const isAuth = localStorage.getItem('auth')

        if (isAuth) {
            setAuth(true)
        } else {
            setAuth(false)
        }
    }, [])

    return (
        <Router basename="/">
            <Header auth={auth} setAuth={setAuth} />
            <main className="flex justify-center">
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route
                        path="/login"
                        element={<Login auth={auth} setAuth={setAuth} />}
                    />
                    <Route path="/signup" element={<Signup auth={auth} />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/profile/:id" element={<Profile />} />
                </Routes>
            </main>
            {/* <Footer /> */}
        </Router>
    )
}

export default App
