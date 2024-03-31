'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const onLogin = async(e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
        setLoading(true);
        // send data to the server
        const response = await axios.post('/api/users/login', user);
        console.log('login success', response);
        // redirect user to the profile page.
        toast.success("Login success");
        router.push('/profile');
    } catch(err: any) { 
        console.log('login failed', err);
        toast.error(err.response.data.error, {
            duration: 2500,
            position: 'top-center'
        });
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    if(user.password.length > 0 && user.email.length > 0) {
        setBtnDisabled(false);
    } else {
        setBtnDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Toaster />
        <h1>{loading ? 'Processing': "Log In"}</h1>
        <hr className="w-full my-4" />

        <form onSubmit={onLogin}>
            <div className="flex items-center justify-between my-4">
                <label htmlFor="email" className="min-w-[100px]">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    value={user.email} 
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                    className="p-2 border border-black rounded-md inline-block mx-2 shadow-md"
                    required
                />
            </div>

            <div className="flex items-center justify-between">
                <label htmlFor="password" className="min-w-[100px]">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    value={user.password} 
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                    className="p-2 border border-black rounded-md inline-block mx-2 shadow-md"
                />
            </div>
            <div className="flex justify-center items-center">
                <button
                    type="submit" 
                    disabled={btnDisabled}
                    className={`px-6 py-2 rounded-sm my-4 shadow-md cursor-pointer ${btnDisabled ? 'bg-gray-600 text-black' : 'bg-blue-600 text-white'}`}
                >Log In</button>
            </div>
        </form>
        <div>
            <Link href="signup">Visit Signup Page</Link>
        </div>
    </div>
  )
}

export default LoginPage
