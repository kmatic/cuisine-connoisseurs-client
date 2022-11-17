import { FaGithub } from 'react-icons/fa'

const Footer = () => {
    return (
        <div>
            <footer className="bg-slate-700 text-white flex justify-center items-center p-2">
                <a href="" className="flex gap-2">
                    kmatic
                    <FaGithub className="text-2xl" />
                </a>
            </footer>
        </div>
    )
}

export default Footer
