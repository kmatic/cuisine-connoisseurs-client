import { FaGithub } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="absolute bottom-0 left-0 flex items-center justify-center bg-slate-700 p-2 text-white">
            <a
                href="https://github.com/kmatic/cuisine-connoisseurs-client"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2">
                kmatic
                <FaGithub className="text-2xl" />
            </a>
        </footer>
    )
}

export default Footer
