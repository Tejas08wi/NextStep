import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import { motion } from 'framer-motion';
// Import your images here
import google from './allimages/icons8-google-48.png';
import linkedin from './allimages/icons8-linkedin-48.png';
import lg from './allimages/lg.svg';
import register from './allimages/register.svg';

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            const url = `http://localhost:8080/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/body')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500/80 via-purple-500/80 to-violet-500/80 relative overflow-hidden">
            {/* Background Elements */}
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
                    Student Login
                </h2>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="group">
                        <label className="block text-white font-medium mb-2">Email</label>
                        <input
                            onChange={handleChange}
                            type="email"
                            name="email"
                            value={loginInfo.email}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400/50 text-white placeholder-white/50 transition-all duration-300"
                            placeholder="Enter your email..."
                        />
                    </div>

                    <div className="group relative">
                        <label className="block text-white font-medium mb-2">Password</label>
                        <input
                            onChange={handleChange}
                            type={isPasswordVisible ? "text" : "password"}
                            name="password"
                            value={loginInfo.password}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400/50 text-white placeholder-white/50 transition-all duration-300"
                            placeholder="Enter your password..."
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-[42px] text-white/70 hover:text-white transition-colors"
                            onClick={togglePasswordVisibility}
                        >
                            {isPasswordVisible ? "Hide" : "Show"}
                        </button>
                    </div>

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-pink-500/80 to-violet-500/80 text-white font-bold py-3 px-4 rounded-xl hover:from-pink-600/80 hover:to-violet-600/80 transition-all duration-300 transform hover:shadow-lg"
                    >
                        Login
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
                            Sign in with Google
                        </motion.button>

                        <motion.button 
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center bg-white/5 hover:bg-white/10 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300"
                        >
                            <img src={linkedin} alt="LinkedIn" className="w-5 h-5 mr-3" />
                            Sign in with LinkedIn
                        </motion.button>
                    </div>

                    <div className="mt-8 text-center">
                        <span className="text-white/70">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-white hover:text-pink-400 transition-colors">
                                Sign Up
                            </Link>
                        </span>
                    </div>
                </form>
            </motion.div>
            <ToastContainer />
        </div>
    )
}

export default Login