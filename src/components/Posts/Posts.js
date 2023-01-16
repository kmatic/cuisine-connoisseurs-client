import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { TokenContext, UserContext } from '../../App'
import PostCard from './PostCard'
import useFetchData from '../Hooks/useFetchData'
import notify from '../../utils/notify'
import Loader from '../Loader'

const Posts = () => {
    const navigate = useNavigate()
    const { currentUser } = useContext(UserContext)
    const { token } = useContext(TokenContext)
    const url = `http://cuisineconnoisseursapi.onrender.com/api/posts/${currentUser._id}`

    const { data: posts, setData: setPosts, loading } = useFetchData(url)

    async function handleLike(post) {
        let newLikes = []

        if (post.likes.includes(currentUser._id)) {
            newLikes = post.likes.filter((id) => id !== currentUser._id)
        } else {
            newLikes = [...post.likes, currentUser._id]
        }

        try {
            const res = await fetch(
                `https://cuisineconnoisseursapi.onrender.com/api/posts/${post._id}/like`,
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
            const obj = await res.json()
            // update posts likes in state to rerender like
            const updatedPosts = posts.map((updatedPost) => {
                if (updatedPost._id === obj.post._id) {
                    updatedPost.likes = obj.post.likes
                }
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
                `https://cuisineconnoisseursapi.onrender.com/api/posts/${postId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            if (res.status !== 200) return console.error('Something went wrong')
            const obj = await res.json()
            // removed deleted post in state to rerender posts
            const updatedPosts = posts.filter(
                (post) => post._id !== obj.deletedPost._id
            )
            setPosts(updatedPosts)
            notify(obj, res.status, 'deletepost')
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="mx-auto my-10 flex w-full max-w-5xl flex-col gap-6">
            <h2 className="break-words text-center text-2xl">
                Hi, {currentUser.username}! Heres where users you follow have
                been eating...
            </h2>
            <button
                className="self-start self-center rounded-md border-2 border-solid border-slate-900 bg-slate-900 px-6 py-1 text-lg font-semibold text-white hover:bg-inherit hover:text-slate-900"
                onClick={() => navigate(`/new`)}>
                &#43; NEW ENTRY
            </button>
            <div>
                <h3 className="text-lg font-semibold">RECENT REVIEWS</h3>
                <div>
                    {loading && <Loader loading={loading} />}
                    {posts &&
                        posts.map((post) => (
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
