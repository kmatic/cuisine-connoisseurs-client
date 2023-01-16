import { ClipLoader } from 'react-spinners'

const Loader = ({ loading }) => {
    return (
        <div className="my-8 flex">
            <div className="mx-auto">
                <ClipLoader color="#000000" loading={loading} size={75} />
            </div>
        </div>
    )
}

export default Loader
