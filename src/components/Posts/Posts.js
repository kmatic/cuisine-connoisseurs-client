import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { TokenContext, UserContext } from '../../App'
import PostCard from './PostCard'

const Posts = () => {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    const { currentUser } = useContext(UserContext)
    const { token } = useContext(TokenContext)

    async function getPosts() {
        try {
            const res = await fetch('http://localhost:5000/api/posts')
            const data = await res.json()
            setPosts(data.posts)
        } catch (err) {
            console.error(err)
        }
    }

    async function handleLike(post) {
        let newLikes = []

        if (post.likes.includes(currentUser._id)) {
            newLikes = post.likes.filter((id) => id !== currentUser._id)
        } else {
            newLikes = [...post.likes, currentUser._id]
        }

        try {
            const res = await fetch(
                `http://localhost:5000/api/posts/${post._id}/like`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        likes: newLikes,
                    }),
                }
            )
            if (res.status !== 200) return console.error('Something went wrong')
            const data = await res.json()
            const updatedPosts = posts.map((updatedPost) => {
                if (updatedPost._id === data.post._id) return data.post
                return updatedPost
            })
            setPosts(updatedPosts)
        } catch (err) {
            console.error(err)
        }
    }

    async function handleDeletePost(postId) {
        try {
            const res = await fetch(
                `http://localhost:5000/api/posts/${postId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (res.status !== 200) return console.error('Something went wrong')
            const data = await res.json()
            const updatedPosts = posts.filter(
                (post) => post._id !== data.deletedPost._id
            )
            setPosts(updatedPosts)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div className="mx-auto my-10 flex w-full max-w-5xl flex-col gap-6">
            <h2 className="text-center text-2xl">
                Hi, Kristopher! Heres where users you follow have been eating...
            </h2>
            <button
                className="self-start self-center rounded-md border-2 border-solid border-slate-900 bg-slate-900 px-6 py-1 text-lg font-semibold text-white hover:bg-inherit hover:text-slate-900"
                onClick={() => navigate(`/new`)}>
                &#43; NEW ENTRY
            </button>
            <div>
                <h3 className="text-lg font-semibold">RECENT REVIEWS</h3>
                <div>
                    {posts.map((post) => (
                        <PostCard
                            key={post._id}
                            post={post}
                            currentUser={currentUser}
                            token={token}
                            handleLike={handleLike}
                            handleDeletePost={handleDeletePost}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Posts
