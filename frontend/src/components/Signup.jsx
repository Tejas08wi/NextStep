import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { motion } from 'framer-motion';
import google from './allimages/icons8-google-48.png';
import linkedin from './allimages/icons8-linkedin-48.png';
import lg from './allimages/lg.svg';
import register from './allimages/register.svg';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
        isAdmin: false,
        adminCode: ''
    });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password, isAdmin, adminCode } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password are required')
        }
        if (isAdmin && !adminCode) {
            return handleError('admin code is required for admin signup')
        }
        
        // Remove adminCode if not an admin
        const signupData = {
            name,
            email,
            password,
            isAdmin,
            ...(isAdmin ? { adminCode } : {})
        };
        
        try {
            const url = `http://localhost:8080/auth/signup`;
            console.log('Attempting to connect to:', url);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(signupData)
            });

            console.log('Response status:', response.status);
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                console.error('Error response:', errorData);
                throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            if (result.success) {
                handleSuccess(result.message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } else {
                handleError(result.message || 'Signup failed');
            }
        } catch (err) {
            handleError(err.message || 'Something went wrong');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500/80 via-purple-500/80 to-violet-500/80 relative overflow-hidden">
            <div className="absolute inset-0">
                <div className="absolute w-96 h-96 bg-pink-300/40 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000 top-0 -left-4"></div>
                <div className="absolute w-96 h-96 bg-violet-300/40 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob top-0 right-0"></div>
            </div>

            <motion.img
                className='absolute bottom-4 left-4 w-[350px] h-[300px] transition-transform duration-300'
                src={lg}
                alt="LG"
            />
            
            <motion.img
                className='absolute bottom-4 right-4 w-[350px] h-[300px] transition-transform duration-300'
                src={register}
                alt="Register"
            />

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="container w-full max-w-md p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 relative hover:shadow-pink-500/20 transition-all duration-300"
            >
                <h2 className="text-4xl font-bold text-center text-white mb-8">
                    {signupInfo.isAdmin ? 'Admin Sign Up' : 'Student Sign Up'}
                </h2>

                <form onSubmit={handleSignup} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={signupInfo.name}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-pink-500 text-white placeholder-white/50"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="email"
                                name="email"
                                value={signupInfo.email}
                                onChange={handleChange}
                                placeholder="Email Address"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-pink-500 text-white placeholder-white/50"
                                required
                            />
                        </div>

                        <div className="relative">
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                name="password"
                                value={signupInfo.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-pink-500 text-white placeholder-white/50"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                            >
                                {isPasswordVisible ? "Hide" : "Show"}
                            </button>
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="isAdmin"
                                name="isAdmin"
                                checked={signupInfo.isAdmin}
                                onChange={(e) => setSignupInfo({ ...signupInfo, isAdmin: e.target.checked })}
                                className="w-4 h-4 text-pink-500 border-white/10 rounded focus:ring-pink-500"
                            />
                            <label htmlFor="isAdmin" className="text-white">Sign up as Admin</label>
                        </div>

                        {signupInfo.isAdmin && (
                            <div>
                                <input
                                    type="password"
                                    name="adminCode"
                                    value={signupInfo.adminCode}
                                    onChange={handleChange}
                                    placeholder="Admin Code"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-pink-500 text-white placeholder-white/50"
                                    required
                                />
                            </div>
                        )}
                    </div>

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-pink-500/80 to-violet-500/80 text-white font-bold py-3 px-4 rounded-xl hover:from-pink-600/80 hover:to-violet-600/80 transition-all duration-300 transform hover:shadow-lg"
                    >
                        Sign Up
                    </motion.button>

                    <div className="relative flex items-center justify-center my-8">
                        <div className="border-t border-white/20 w-full"></div>
                        <span className="absolute bg-white/10 px-4 text-white/70">or</span>
                    </div>

                    <div className="space-y-4">
                        <motion.button 
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300"
                        >
                            <img src={google} alt="Google" className="w-5 h-5 mr-3" />
                            Sign up with Google
                        </motion.button>

                        <motion.button 
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300"
                        >
                            <img src={linkedin} alt="LinkedIn" className="w-5 h-5 mr-3" />
                            Sign up with LinkedIn
                        </motion.button>
                    </div>

                    <div className="mt-8 text-center">
                        <span className="text-white/70">
                            Already have an account?{' '}
                            <Link to="/login" className="text-white hover:text-pink-400 transition-colors">
                                Login
                            </Link>
                        </span>
                    </div>
                </form>
            </motion.div>
            <ToastContainer />
        </div>
    )
}

export default Signup