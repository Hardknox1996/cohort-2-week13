import { Blog } from "../hooks"
import { AppBar } from "./AppBar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <>
      <AppBar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 w-full px-10 max-w-screen-2xl pt-12">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold pb-2 ">
              {blog.title}
            </div>
            <div className="text-slate-500 pb-2">
              Posted on 2nd Dec 2023
            </div>
            <div className="text-xl ">
              {blog.content}
            </div>
          </div>
          <div className="col-span-4">
            Author
            <div className="flex">
              <div className="pr-2 pt-1">
                <Avatar name={blog.author.name || "User"} />
              </div>
              <div className="">
                <div className="text-2xl font-bold pb-2">{blog.author.name || "User"}</div>
                <div className="text-slate-500">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor exercitationem praesentium totam suscipit earum debitis perspiciatis quisquam
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
