import axios from "axios";
import { AppBar } from "../components/AppBar";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const navgate = useNavigate()

    const addNewPost = async () => {

        try {
            let response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content: description
            }, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token")
                }
              })
            navgate(`/blog/${response.data.id}`)
        } catch (error) {
            console.log(error)
        }


    }


    return (
        <>
            <AppBar />
            <div className="flex justify-center pt-12">
                <div className="justify-center ">
                    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md">
                        <div className="w-full pb-4">
                            <label className="block mb-2 text-s m  text-gray-900 font-semibold">
                                Title
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                placeholder="Title"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                                required
                            />
                        </div>
                        <div className="w-full pb-4">
                            <label className="block mb-2 text-s m  text-gray-900 font-semibold">
                                Your story
                            </label>
                            <textarea
                                id=""
                                rows={4}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Write your story here..."
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                            />
                        </div>
                        <div className="w-full pb-4">
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                                onClick={addNewPost}
                            >
                                Publish Post
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
