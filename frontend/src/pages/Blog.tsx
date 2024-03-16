import { useParams } from "react-router-dom"
import { FullBlog } from "../components/FullBlog"
import { useBlog } from "../hooks"
import { Spinner } from "../components/Spinner"
import { AppBar } from "../components/AppBar"

export const Blog = () => {

  const { id } = useParams()
  const { loading, blog } = useBlog({
    id: id || ""
  })

  if (loading) {
    return <>
      <AppBar />
      <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center"><Spinner /></div>
      </div>
    </>
  }
  return (
    <div>
      {blog ? (<FullBlog blog={blog} />) : (<></>)}
      {/* {JSON.stringify(blog)} */}
      {/* <FullBlog blog={blog} /> */}
    </div>
  )
}
