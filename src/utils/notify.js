import { toast } from 'react-toastify'

function notify(obj, status, id) {
    if (status !== 200) {
        toast.error(obj.errors.message, {
            toastId: id,
        })
    } else {
        toast.success(obj.message, {
            toastId: id,
        })
    }
}

export default notify
