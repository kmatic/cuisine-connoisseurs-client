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

const App = () => {
    return (
        <Router basename="/">
            <Header />
            <main className="flex justify-center">
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/signin" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </main>
            {/* <Footer /> */}
        </Router>
    )
}

export default App
