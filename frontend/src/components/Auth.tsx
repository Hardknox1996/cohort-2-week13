import { Link, useNavigate } from "react-router-dom";
import { LabelledInput } from "./LabelledInput";
import { useState } from "react";
import { SignUpInput } from "@shekharchavan/medium-commons-learning";
import axios from "axios";
import { BACKEND_URL } from "../config";




export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const [postInputs, setpostInputs] = useState<SignUpInput>({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    async function sendRequest() {
        try {
            const respose = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
                postInputs
            );
            const jwt = respose.data;
            localStorage.setItem("token", jwt);
            navigate("/blogs")
        } catch (error) {
            console.log(error)
            alert("Invalid Data")
        }

    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="max-w-sm  w-3/4">
                    {/* {JSON.stringify(postInputs)} */}
                    <div className="text-center text-3xl font-extrabold mb-1">
                        {type === "signup" ? (
                            <>
                                Create an account
                            </>
                        ) : (
                            <>
                                Login to your account
                            </>
                        )}
                    </div>
                    <div className="text-center text-slate-400 mb-3">
                        {type === "signup" ? (
                            <>
                                Already have an account?{" "}
                                <Link className="pl-2 underline" to={"/signin"}>
                                    Login
                                </Link>
                            </>
                        ) : (
                            <>
                                Don't have an account?{" "}
                                <Link className="pl-2 underline" to={"/signup"}>
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="pt-4">
                        {type === "signup" ? (
                            <>
                                <LabelledInput
                                    label="Name"
                                    placeholder="Shekhar Chavan..."
                                    type="text"
                                    onChange={(e) => {
                                        setpostInputs((c) => ({
                                            ...c,
                                            name: e.target.value,
                                        }));
                                    }}
                                />
                            </>
                        ) : (
                            <>

                            </>
                        )}
                    </div>
                    <div className="pt-4">
                        <LabelledInput
                            label="Email"
                            placeholder="youremail@example.com"
                            type="text"
                            onChange={(e) => {
                                setpostInputs((c) => ({
                                    ...c,
                                    email: e.target.value,
                                }));
                            }}
                        />
                    </div>
                    <div className="pt-4">
                        <LabelledInput
                            label="Password"
                            placeholder="12345678"
                            type="password"
                            onChange={(e) => {
                                setpostInputs((c) => ({
                                    ...c,
                                    password: e.target.value,
                                }));
                            }}
                        />
                    </div>

                    <button
                        type="button"
                        className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-8"
                            onClick={sendRequest}
                    >
                        {type === "signup" ? "Sign Up" : "Sign In"}
                    </button>
                </div>
            </div>
        </div>
    );
};
