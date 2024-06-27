"use client"

import React, { useState } from "react"
import Link from "next/link"

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: "", password: "" });

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let valid = true;
        let emailError = "";
        let passwordError = "";

        if (!email) {
            emailError = "Email is required.";
            valid = false;
        }

        if (!password) {
            passwordError = "Password is required.";
            valid = false;
        } else if (password.length < 6) {
            passwordError = "Password must be at least 6 characters.";
            valid = false;
        }

        setErrors({ email: emailError, password: passwordError });

        if (valid) {
            // Handle form submission
            console.log("Form submitted successfully!");
        }
    };

    return (
        <>
        <p className="fixed top-0 left-0 flex justify-center w-full border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
    <Link href="/">Back</Link>
</p>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto" style={{ marginTop: '15%' }}>
            <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 text-gray-700">Email</label>
                <input 
                    id="email" 
                    type="email" 
                    placeholder="Email" 
                    className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 text-black`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>
            <div className="flex flex-col">
                <label htmlFor="password" className="mb-1 text-gray-700">Password</label>
                <input 
                    id="password" 
                    type="password" 
                    placeholder="Password" 
                    className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 text-black`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
            </div>
            <button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 transition duration-200"
            >
                Login
            </button>
            <Link style={{color:"dodgerblue", display:"flex", justifyContent:'center'}} href={"/login"}>Don&apos;t have an account? Register</Link>
        </form>
        </>
    )
}
