import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import {
    Header,
    Landing,
    Login,
    Signup,
    Users,
    Profile,
    Posts,
    NewEntry,
    Footer,
    NotFound,
} from './components'
import { createContext } from 'react'
import useToken from './components/Hooks/useToken'
import useUser from './components/Hooks/useUser'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const UserContext = createContext({})
export const TokenContext = createContext({})

const App = () => {
    const { token, addToken, removeToken } = useToken()
    const { addCurrentUser, currentUser, removeCurrentUser } = useUser()

    return (
        <Router basename="/">
            <TokenContext.Provider value={{ token, addToken, removeToken }}>
                <UserContext.Provider
                    value={{ addCurrentUser, currentUser, removeCurrentUser }}>
                    <ToastContainer
                        position={toast.POSITION.TOP_CENTER}
                        autoClose={4000}
                        pauseOnFocusLoss={false}
                        limit={3}
                    />
                    <Header />
                    <main className="p-4">
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
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                    <Footer />
                </UserContext.Provider>
            </TokenContext.Provider>
        </Router>
    )
}

export default App
