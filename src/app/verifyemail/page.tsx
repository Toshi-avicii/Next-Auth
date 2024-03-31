'use client';
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async() => {
    try {
        await axios.post('/api/users/verifyemail', { token });
        setVerified(true);
    } catch(err: any) {
        setError(true);
        console.log(err.response.data);
    }
  }

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if(token && token.length > 0) verifyUserEmail();
  }, [token])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl">Verify Email</h1>
        <h1 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "No token"}</h1>
        {
            verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login" className="text-blue-500">Login</Link>
                </div>
            )
        }

        {
            error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-white">Error Occurred</h2>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail
