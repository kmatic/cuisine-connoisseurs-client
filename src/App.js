import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './components/Landing/Landing'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Users from './components/Users/Users'
import Profile from './components/Profile/Profile'
import Posts from './components/Posts/Posts'
import NewEntry from './components/NewEntry/NewEntry'
import { createContext } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom'
import useToken from './components/Hooks/useToken'
import useUser from './components/Hooks/useUser'

export const UserContext = createContext()
export const TokenContext = createContext()

const App = () => {
    const { token, addToken, removeToken } = useToken()
    const { addCurrentUser, currentUser, removeCurrentUser } = useUser()

    console.log(currentUser)

    return (
        <Router basename="/">
            <TokenContext.Provider value={{ token, addToken, removeToken }}>
                <UserContext.Provider
                    value={{ addCurrentUser, currentUser, removeCurrentUser }}>
                    <Header />
                    <main>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    !currentUser ? (
                                        <Landing />
                                    ) : (
                                        <Navigate replace to="/posts" />
                                    )
                                }
                            />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route
                                path="/users"
                                element={
                                    !currentUser ? (
                                        <Navigate replace to="/login" />
                                    ) : (
                                        <Users currentUser={currentUser} />
                                    )
                                }
                            />
                            <Route
                                path="/profile/:id"
                                element={
                                    !currentUser ? (
                                        <Navigate replace to="/login" />
                                    ) : (
                                        <Profile />
                                    )
                                }
                            />
                            <Route
                                path="/posts"
                                element={
                                    !currentUser ? (
                                        <Navigate replace to="/login" />
                                    ) : (
                                        <Posts />
                                    )
                                }
                            />
                            <Route
                                path="/new"
                                element={
                                    !currentUser ? (
                                        <Navigate replace to="/login" />
                                    ) : (
                                        <NewEntry />
                                    )
                                }
                            />
                        </Routes>
                    </main>
                    {/* <Footer /> */}
                </UserContext.Provider>
            </TokenContext.Provider>
        </Router>
    )
}

export default App
