import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const AppBar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4 ">
      <Link to={"/blogs"}>
        <svg viewBox="0 0 1043.63 592.71" className="q r" width={70}>
          <g data-name="Layer 2">
            <g data-name="Layer 1">
              <path d="M588.67 296.36c0 163.67-131.78 296.35-294.33 296.35S0 460 0 296.36 131.78 0 294.34 0s294.33 132.69 294.33 296.36M911.56 296.36c0 154.06-65.89 279-147.17 279s-147.17-124.94-147.17-279 65.88-279 147.16-279 147.17 124.9 147.17 279M1043.63 296.36c0 138-23.17 249.94-51.76 249.94s-51.75-111.91-51.75-249.94 23.17-249.94 51.75-249.94 51.76 111.9 51.76 249.94" />
            </g>
          </g>
        </svg>

      </Link>
      <div>
        <Link to={"/publish"}><button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-0 mr-4">New</button>
        </Link>
        <Avatar name="Shekhar" />
      </div>
    </div>
  )
}
