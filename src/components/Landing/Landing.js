import { Link } from 'react-router-dom'
import preview from '../../assets/preview.mp4'
import reactIcon from '../../assets/icons/react.svg'
import s3Icon from '../../assets/icons/aws-s3.svg'
import expressIcon from '../../assets/icons/expressjs.svg'
import mongoIcon from '../../assets/icons/mongodb.svg'
import nodeIcon from '../../assets/icons/nodejs.svg'
import tailwindIcon from '../../assets/icons/tailwind.svg'

const Landing = () => {
    return (
        <div className="mx-auto my-10 h-max w-full max-w-5xl">
            <section className="my-20 break-all text-center text-4xl">
                <h1 className="font-bold">Welcome to CuisineConnoisseurs!</h1>
            </section>
            <section className="flex flex-col gap-6 md:flex-row">
                <div className="flex flex-col gap-6 self-center text-center md:max-w-xs md:text-start">
                    <h1 className="text-3xl font-bold">
                        Track restaurants you've dined in
                    </h1>
                    <p className="text-lg">
                        Rate your meals, provide detailed reviews, and share
                        great restaurants! Follow others in the community and
                        interact with their posts by liking and commenting.
                        Cuisine Connoisseurs' everything a foodie needs.
                    </p>
                    <Link to="/signup">
                        <button className="self-start rounded-md border-2 border-solid border-slate-900 bg-slate-900 px-10 py-2 text-lg font-semibold text-white hover:bg-inherit hover:text-slate-900">
                            Create an Account
                        </button>
                    </Link>
                </div>
                <iframe
                    src={preview}
                    title="Preview video"
                    className="aspect-video w-full rounded-lg border-2 border-black drop-shadow-md"
                />
            </section>
            <section className="my-20 text-center">
                <h2 className="text-md">Made with:</h2>
                <ul className="my-4 flex justify-evenly">
                    <li>
                        <img
                            src={mongoIcon}
                            alt="mongodb icon"
                            className="h-12 w-12"
                        />
                    </li>
                    <li>
                        <img
                            src={expressIcon}
                            alt="expressjs icon"
                            className="h-12 w-12"
                        />
                    </li>
                    <li>
                        <img
                            src={reactIcon}
                            alt="react icon"
                            className="h-12 w-12"
                        />
                    </li>
                    <li>
                        <img
                            src={nodeIcon}
                            alt="nodejs icon"
                            className="h-12 w-12"
                        />
                    </li>
                    <li>
                        <img
                            src={tailwindIcon}
                            alt="tailwind icon"
                            className="h-12 w-12"
                        />
                    </li>
                    <li>
                        <img
                            src={s3Icon}
                            alt="aws s3 icon"
                            className="h-12 w-12"
                        />
                    </li>
                </ul>
            </section>
        </div>
    )
}

export default Landing
