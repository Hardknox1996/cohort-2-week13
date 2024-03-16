import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id,
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
                <div className="flex">
                    {/* <div className="flex justify-center flex-row"> */}
                    <Avatar name={authorName} />
                    {/* </div> */}
                    <div className="font-extralight pl-2 text-sm flex justify-center flex-col">
                        {authorName}
                    </div>
                    <div className="pl-2 flex justify-center flex-col">
                        <Circle />
                    </div>
                    <div className="font-thin pl-2 text-slate-400 text-sm flex justify-center flex-col">
                        {" "}
                        {publishedDate}{" "}
                    </div>
                </div>
                <div className="font-semibold text-xl pt-2">{title}</div>
                <div className="font-thin text-md">{content.slice(0, 100) + "..."}</div>

                <div className="font-thin text-sm text-slate-500 pt-2">
                    {Math.ceil(content.length / 100)} minute(s)
                </div>

                {/* <div className="bg-slate-200 h-0.5 w-full"></div> */}
            </div>
        </Link>
    );
};

const Circle = () => {
    return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
};

export const Avatar = ({ name }: { name: string }) => {
    return (
        <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-xs text-gray-600 dark:text-gray-300">
                {name[0]}
            </span>
        </div>
    );
};
