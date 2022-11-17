import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'

const App = () => {
    return (
        <>
            <Header />
            <main>
                {/* <Landing /> */}
                <Login />
                {/* <Signup /> */}
            </main>
            {/* <Footer /> */}
        </>
    )
}

export default App
