import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function Forgetpassword() {

    let [forgetdata,setforgetdata]=useState([])

    let inputvalue=(e)=>{
        setforgetdata(
            {...forgetdata,[e.target.name]:e.target.value}
        )
    }

    let go =useNavigate()
    // allusers-------------------------------

    let [already,setalready]=useState([])

    useEffect(()=>{
        allusers()
    },[])

    
    let allusers=()=>{
        axios.get("http://localhost:8080/allusers").then((res)=>{
            if(res.data.status){
                setalready(res.data.Ourusers)
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    let forgetbtn=()=>{
        let filterforget=already.filter((data)=> data.email==forgetdata.email)
        let existdata=filterforget[0]

        if(!existdata){
            Swal.fire({
                icon:"error",
                title:"Not a user............!"
            })
        }
        else if(forgetdata.password != forgetdata.confirmpassword){
            Swal.fire({
                icon:"error",
                title:"Password not a match.....!"
            })
        }
        else{
            axios.post("http://localhost:8080/forget",{existdata,forgetdata}).then((res)=>{
                if(res.data.status){
                    Swal.fire({
                        icon:"success",
                        title:(res.data.msg)
                    })
                    go("/")
                }
                else{
                    Swal.fire({
                        icon:"error",
                        title:(res.data.msg)
                    })
                }
            })
        }
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
                    <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900 heading">
                        Forget Your Password
                    </h2>
                </div>

                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        
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
                                    New Password
                                </label>
                            </div>
                            <div className="mt-1">
                                <input onChange={inputvalue}
                                    id="newpassword"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>


                         <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Confirm Password
                                </label>
                            </div>
                            <div className="mt-1">
                                <input onChange={inputvalue}
                                    id="password"
                                    name="confirmpassword"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                onClick={forgetbtn}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Forget Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Forgetpassword
