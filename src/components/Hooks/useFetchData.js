import { useState, useEffect } from 'react'

function useFetchData(url) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true)
                const res = await fetch(url)
                const obj = await res.json()
                setData(obj.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [url])

    return { data, setData, loading }
}

export default useFetchData
