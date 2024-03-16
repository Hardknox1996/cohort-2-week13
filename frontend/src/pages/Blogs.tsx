import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkleton } from "../components/BlogSkleton"
import { useBlogs } from "../hooks"




export const Blogs = () => {

    const { loading, blogs } = useBlogs()

    if (loading) {
        return <>
            <AppBar />
            <div className="flex justify-center">

                <div className="justify-center ">
                    <BlogSkleton />
                    <BlogSkleton />
                    <BlogSkleton />
                    <BlogSkleton />
                    <BlogSkleton />

                </div></div></>
    }

    return (<>
        <AppBar />
        <div className="flex justify-center">

            <div className="justify-center ">
                {blogs.map((blog, idx) => {
                    return <BlogCard
                        id={blog.id}
                        key={idx}
                        authorName={blog.author.name || "User"}
                        title={blog.title}
                        content={blog.content}
                        publishedDate="2nd Feb 2024" />
                })}


            </div>
        </div>
    </>
    )
}
