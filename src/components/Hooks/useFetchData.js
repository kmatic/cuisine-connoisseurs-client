import { useState, useEffect } from 'react'

function useFetchData(url) {
    const [data, setData] = useState(null)

    useEffect(() => {
        async function getData() {
            try {
                const res = await fetch(url)
                const obj = await res.json()
                setData(obj.data)
            } catch (err) {
                console.error(err)
            }
        }
        getData()
    }, [url])

    return { data, setData }
}

export default useFetchData
