'use client';
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState('nothing');

  const logoutHandler = async() => {
    try {
      await axios.get('/api/users/logout');
      router.push('/login');
      toast.success('Logout successful')
    } catch(err: any) {
      console.log(err.message);
      toast.error(err.message);
    } 
  }

  const getUserDetails = async() => {
    try {
      const res = await axios.get('/api/users/me');
      console.log(res.data);
      setUser(res.data.data._id);
    } catch(err: any) {
      console.log(err.message);
    }
  }
  return (
    <div>
        <Toaster />
        <h1>Profile</h1>
        <hr />
        <p>Profile page</p> 
        <h2>{user === 'nothing' ? "Nothing" : <Link href={`profile/${user}`}>Go to User Profile</Link>}</h2>
        <hr />
        <button onClick={getUserDetails} className="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-6 rounded">Get Profile</button>
        <button onClick={logoutHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">Logout</button>
    </div>
  )
}

export default ProfilePage
