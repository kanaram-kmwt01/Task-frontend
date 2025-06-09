import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function Login() {
    let [login, setlogin] = useState([])

    let inputvalue = (e) => {
        setlogin(
            { ...login, [e.target.name]: e.target.value }
        )
    }

    let go = useNavigate()
    // allusers-----------------------------------------------------------------------------------
    let [already, setalready] = useState([])

    useEffect(() => {
        allusers()
    }, [])
    let allusers = () => {
        axios.get("http://localhost:8080/allusers").then((res) => {
            if (res.data.status) {
                setalready(res.data.Ourusers)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    let loginbtn=()=>{
        let filteruser=already.filter((item)=>item.email==login.email)
        let existdata=filteruser[0]
        
        if(!login.email || !login.password){
            alert("Fill the login form....!")
        }
        else if(!existdata){
            Swal.fire({
                icon:"error",
                title:"Invalid email"
            })
        }
        else if(existdata.password != login.password){
            Swal.fire({
                icon:"error",
                title:"Invalid password"
            })
        }
        else{
            Swal.fire({
                icon:"success",
                title:"Successfully login...!"
            })
            go("/home")
        }
    }
    
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8  login">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    /> */}
                    <h2 className="mt-7 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
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
                                <div className="text-sm">
                                    <Link to="/forget" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
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
                                onClick={loginbtn}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </div>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Not a member?{' '}
                        <Link to={"/signup"} className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login
