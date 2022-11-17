import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './pages/Landing'

const App = () => {
    return (
        <>
            <Header />
            <main className="bg-slate-100">
                <Landing />
            </main>
            {/* <Footer /> */}
        </>
    )
}

export default App
