import { useRef, useEffect } from 'react'

function useFocus() {
    const focusRef = useRef()

    useEffect(() => {
        focusRef.current.focus()
    }, [])

    return { focusRef }
}

export default useFocus
