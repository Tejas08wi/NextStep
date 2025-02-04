import React from 'react';

const MentorsSection = () => {
    return (
        <div className='flex justify-center w-full'>
            <div className="mentors-section text-center py-16 rounded-3xl bg-gradient-to-br from-yellow-50 via-orange-50 to-white mx-auto max-w-screen-xl my-8 mt-40 shadow-xl">
                <h2 className="text-4xl mb-6 font-bold text-gray-800 mt-5 font-sans tracking-tight">
                    Meet Our <span className="text-orange-500">Star Mentors</span>
                </h2>
                <div className='mt-6 max-w-2xl mx-auto'>
                    <p className="text-gray-600 mb-12 text-lg leading-relaxed">
                        Connect with industry leaders who have walked the path before you. Get personalized guidance to accelerate your career growth.
                    </p>
                </div>

                <div className='mt-8'>
                    <div className="mentors-grid flex flex-wrap justify-center gap-8">
                        {/* Mentor Card 1 */}
                        <div className="mentor-card bg-white rounded-2xl shadow-lg p-6 text-center relative hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out w-72 h-96 border border-gray-100">
                            <div className="mentor-image mb-6">
                                <img src="https://r2.erweima.ai/imgcompressed/compressed_3bd8a54079628cbf3098ca951c74a939.webp" 
                                     alt="Mentor" 
                                     className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-yellow-100 hover:ring-yellow-300 transition-all" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Vikas Bharti</h3>
                            <p className="text-gray-600 mb-4">Senior Software Engineer</p>
                            <div className="text-sm text-gray-500 mb-2">15 Years of Experience</div>
                            <div className="flex justify-center items-center text-gray-500 mb-6 text-sm bg-gray-50 py-2 rounded-lg">
                                <img src="https://www.preplaced.in/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fpreplaced-upload-prod%2Fo%2Fimage%252Fcomapny-logos%252FWalmart%2520Global%2520Tech%2520India%3Falt%3Dmedia%26token%3D19f0339a-a937-4d4b-8fc8-216ddd1be5f4&w=64&q=75" 
                                     alt="Company Logo" 
                                     className="w-5 h-5 mr-2" /> 
                                Walmart Global Tech India
                            </div>
                            <button className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-3 px-6 rounded-xl hover:from-gray-800 hover:to-black transition-all duration-300 w-full font-medium text-sm tracking-wide shadow-md hover:shadow-lg">
                                Book Free Trial Session
                            </button>
                            <div className="mentor-rating absolute top-6 right-6 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                                ★ 5.0
                            </div>
                        </div>

                        {/* Mentor Card 2 */}
                        <div className="mentor-card bg-white rounded-2xl shadow-lg p-6 text-center relative hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out w-72 h-96 border border-gray-100">
                            <div className="mentor-image mb-6">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs10cupyp3Wf-pZvdPjGQuKne14ngVZbYdDQ&s" 
                                     alt="Mentor" 
                                     className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-yellow-100 hover:ring-yellow-300 transition-all" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Shishir Chandra</h3>
                            <p className="text-gray-600 mb-4">Director of Technology</p>
                            <div className="text-sm text-gray-500 mb-2">16 Years of Experience</div>
                            <div className="flex justify-center items-center text-gray-500 mb-6 text-sm bg-gray-50 py-2 rounded-lg">
                                <img src="https://www.preplaced.in/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fpreplaced-upload-prod%2Fo%2Fimage%252Fcomapny-logos%252FTarget%3Falt%3Dmedia%26token%3D272e87c3-d761-461c-a86a-458fabad58cc&w=64&q=75" 
                                     alt="Company Logo" 
                                     className="w-5 h-5 mr-2" /> 
                                Target
                            </div>
                            <button className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-3 px-6 rounded-xl hover:from-gray-800 hover:to-black transition-all duration-300 w-full font-medium text-sm tracking-wide shadow-md hover:shadow-lg">
                                Book Free Trial Session
                            </button>
                            <div className="mentor-rating absolute top-6 right-6 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                                ★ 5.0
                            </div>
                        </div>

                        {/* Mentor Card 3 */}
                        <div className="mentor-card bg-white rounded-2xl shadow-lg p-6 text-center relative hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out w-72 h-96 border border-gray-100">
                            <div className="mentor-image mb-6">
                                <img src="https://www.profilebakery.com/wp-content/uploads/2023/05/headshot-ai-71-113.jpg" 
                                     alt="Mentor" 
                                     className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-yellow-100 hover:ring-yellow-300 transition-all" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">Laura Marano</h3>
                            <p className="text-gray-600 mb-4">Director of Technology</p>
                            <div className="text-sm text-gray-500 mb-2">16 Years of Experience</div>
                            <div className="flex justify-center items-center text-gray-500 mb-6 text-sm bg-gray-50 py-2 rounded-lg">
                                <img src="https://www.preplaced.in/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fpreplaced-upload-prod%2Fo%2Fimage%252Fcomapny-logos%252FMeta%3Falt%3Dmedia%26token%3Dc91a76cb-d7bc-441d-84f8-81cacaddfeb5&w=128&q=75" 
                                     alt="Company Logo" 
                                     className="w-5 h-5 mr-2" /> 
                                Meta
                            </div>
                            <button className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-3 px-6 rounded-xl hover:from-gray-800 hover:to-black transition-all duration-300 w-full font-medium text-sm tracking-wide shadow-md hover:shadow-lg">
                                Book Free Trial Session
                            </button>
                            <div className="mentor-rating absolute top-6 right-6 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                                ★ 4.7
                            </div>
                        </div>

                        {/* Mentor Card 4 */}
                        <div className="mentor-card bg-white rounded-2xl shadow-lg p-6 text-center relative hover:shadow-2xl hover:scale-105 transform transition-all duration-300 ease-in-out w-72 h-96 border border-gray-100">
                            <div className="mentor-image mb-6">
                                <img src="https://img.freepik.com/free-photo/smiley-handsome-man-posing_23-2148911841.jpg" 
                                     alt="Mentor" 
                                     className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-yellow-100 hover:ring-yellow-300 transition-all" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">David Chen</h3>
                            <p className="text-gray-600 mb-4">Senior Product Manager</p>
                            <div className="text-sm text-gray-500 mb-2">12 Years of Experience</div>
                            <div className="flex justify-center items-center text-gray-500 mb-6 text-sm bg-gray-50 py-2 rounded-lg">
                                <img src="https://www.preplaced.in/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fpreplaced-upload-prod%2Fo%2Fimage%252Fcomapny-logos%252FGoogle%3Falt%3Dmedia%26token%3D44825787-7e50-4c61-b686-6d4b7e3b1c84&w=64&q=75" 
                                     alt="Company Logo" 
                                     className="w-5 h-5 mr-2" /> 
                                Google
                            </div>
                            <button className="bg-gradient-to-r from-gray-700 to-gray-900 text-white py-3 px-6 rounded-xl hover:from-gray-800 hover:to-black transition-all duration-300 w-full font-medium text-sm tracking-wide shadow-md hover:shadow-lg">
                                Book Free Trial Session
                            </button>
                            <div className="mentor-rating absolute top-6 right-6 bg-green-400 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                                ★ 4.5
                            </div>
                        </div>

                        
                    </div>
                </div>

                <div className="explore-button mt-12">
                    <button className="group bg-white border-2 border-yellow-200 py-3 px-8 rounded-xl hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 hover:border-yellow-300 hover:scale-105 transform transition-all duration-300 ease-in-out flex items-center justify-center mx-auto shadow-md">
                        <span className="font-semibold text-gray-700 group-hover:text-gray-900">Explore All Mentors</span>
                        <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 group-hover:translate-x-1 transition-transform">
                            <path d="M6 12L10 8L6 4" stroke="#161616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MentorsSection;
