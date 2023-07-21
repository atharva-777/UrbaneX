"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast,{Toaster} from 'react-hot-toast'
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter()
    const [isLogin,setIsLogin] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: { target: any }) => {
    const { target } = e;
    const { name, value } = target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try{
      await axios.post('/api/users/login',user)
      toast.success('Login successful')
      setTimeout(() => {
        router.push('/')
      }, 2000);
    }catch(error){
      console.log(error)
      toast.error('Wrong password');
    }
  }

  return (
    <div className="text-center justify-center items-center mt-40">
      <Toaster/>
      <h1 className="text-3xl font-bold p-2">
        Login
      </h1>
      <form
        action="#"
        onSubmit={(e)=>handleSubmit(e)}
        className="my-12 justify-center items-center text-center"
      >
        <div className="space-x-4 m-4">
          <label htmlFor="name">Email:</label>
          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            className="border shadow hover:shadow-slate-700 p-4"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="space-x-4 m-4">
          <label htmlFor="name">password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="border shadow hover:shadow-slate-700 p-4"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="hover:bg-green-600 bg-green-400 p-3 font-medium text-center rounded text-md"
          >
            Submit
          </button>
        </div>

        </form>
        {
            isLogin===true ? <Link href='/profile'>Go to Profile</Link>:<div>Please login</div>
        }
        <br />  
      <h3>New User? <Link href='/signup'>Signup</Link></h3>
      <br />
      <Link href='/'>Home</Link>
    </div>
  );
};

export default Login;
