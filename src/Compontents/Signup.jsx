import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function Signup() {
    let [signup, setsignup] = useState([])

    let inputvalue = (e) => {
        setsignup(
            { ...signup, [e.target.name]: e.target.value }
        )
    }

    // useNavigate--------------------------
    let go = useNavigate()


    let signupbtn = () => {
        let filterdata=already.filter((item)=>item.email==signup.email)
        let existuser=filterdata[0]
        if(!signup.username || !signup.email || !signup.password){
            alert("Fill the signup form...!")
        }
        else if(existuser){
            Swal.fire({
                icon:"error",
                title:"Already Signup...!"
            })
        }
        else{
        axios.post("http://localhost:8080/signup", { signup }).then((res) => {
            if (res.data.status) {
                Swal.fire({
                    icon: "success",
                    title: (res.data.msg)
                })
                go("/")
            }
        }).catch((err) => {
            console.log(err)
        })
        }
    }

    // allusers-----------------------------------------------------------------------------------
    let [already,setalready]=useState([])

    useEffect(()=>{
        allusers()
    },[])
    let allusers = () => {
        axios.get("http://localhost:8080/allusers").then((res) => {
            if (res.data.status) {
                setalready(res.data.Ourusers)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8 login">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    /> */}
                    <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign Up to your account
                    </h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="text" className="block text-sm/6 font-medium text-gray-900">
                                Username
                            </label>
                            <div className="mt-1">
                                <input onChange={inputvalue}
                                    id="name"
                                    name="username"
                                    type="text"
                                    required
                                    autoComplete="name"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 ">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input onChange={inputvalue}
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-1">
                                <input onChange={inputvalue}
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={signupbtn}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
