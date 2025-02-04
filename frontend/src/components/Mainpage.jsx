import React from "react";
import Fotter from "./Fotter";
import { Link } from "react-router-dom";

// the landing page
const NextStep = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-violet-200 to-pink-100 animate-gradient-x">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden point  er-events-none">
        <div className="absolute w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob top-0 left-0"></div>
        <div className="absolute w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000 top-0 right-0"></div>
        <div className="absolute w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000 bottom-0 left-1/4"></div>
      </div>

      <header className="fixed top-0 left-0 w-full text-white bg-white/80 backdrop-blur-sm body-font shadow-lg z-10">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 hover:scale-105 transition-transform">
            <span className="ml-3 text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-violet-600 font-extrabold">
              NextStep
            </span>
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            {["Features", "Partners", "About Us", "Contact Us"].map((item) => (
              <a key={item} className="mr-5 text-gray-800 hover:bg-gradient-to-r hover:from-pink-500 hover:to-violet-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105">
                {item}
              </a>
            ))}
          </nav>
          <Link to="/Login">
            <button className="inline-flex items-center text-white bg-gradient-to-r from-pink-500 to-violet-500 border-0 py-2 px-6 focus:outline-none hover:from-pink-600 hover:to-violet-600 rounded-full text-base mt-4 md:mt-0 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/50">
              Login
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </Link>
        </div>
      </header>

      <section className="relative text-gray-600 body-font pt-24">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center">
          <div className="lg:flex-grow md:w-1/2 flex flex-col items-center text-center z-10">
            <div className="mt-6 animate-fade-in-down">
              <h1 className="title-font text-6xl mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-violet-600 font-extrabold leading-tight">
                Boost Your Career 
                <br className="hidden lg:inline-block"/>
                With Us
              </h1>
            </div>
            <p className="mb-8 leading-relaxed text-gray-700 text-xl max-w-2xl animate-fade-in">
              Empower your career journey with expert guidance. Unlock your full
              potential and achieve career success.
            </p>
            <div className="flex justify-center animate-bounce-slow">
              <Link to="/signup">
                <button className="inline-flex text-white bg-gradient-to-r from-pink-500 to-violet-500 border-0 py-3 px-12 focus:outline-none hover:from-pink-600 hover:to-violet-600 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-110 shadow-xl hover:shadow-pink-500/50">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative w-full">
          <img
            className="w-full max-w-6xl mx-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500 animate-fade-in"
            src="https://www.survivedivorce.com/wp-content/uploads/3-What-Professions-Have-the-Highest-Rate-of-Divorce.jpg"
            alt="Career"
          />
        </div>

        <div className="bg-white/80 backdrop-blur-sm py-16 text-center relative rounded-3xl mx-4 lg:mx-20 -mt-20 shadow-xl z-10">
          <div className="flex flex-wrap justify-center items-center gap-16">
            {[
              {
                icon: "https://mindlerimages.imgix.net/tinyimg/Group%201310.svg",
                number: "1 Million",
                text: "Students Impacted"
              },
              {
                icon: "https://mindlerimages.imgix.net/tinyimg/Group%201311.svg",
                number: "10,000",
                text: "Educators Certified"
              },
              {
                icon: "https://mindlerimages.imgix.net/tinyimg/Group%201312.svg",
                number: "100+",
                text: "Partner Colleges"
              },
              {
                icon: "https://mindlerimages.imgix.net/tinyimg/Group%201313.svg",
                number: "25+",
                text: "University Partners"
              }
            ].map((stat, index) => (
              <div key={index} className="flex items-center text-left group hover:scale-110 transition-transform duration-300">
                <img
                  src={stat.icon}
                  alt={stat.text}
                  className="w-12 h-12 mr-4 group-hover:animate-spin-slow"
                />
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-violet-600 bg-clip-text text-transparent">
                    {stat.number}
                  </h3>
                  <p className="text-lg text-gray-600 mt-1">{stat.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Movilf Slider Section */}
      <section className="relative py-16 bg-gradient-to-r from-transparent to-transparent">
        <h2 className="text-3xl font-bold text-center mb-8">Our Partner Companies</h2>
        <div className="container mx-auto">
          <div className="flex justify-center items-center overflow-hidden">
            <div className="flex space-x-8 animate-marquee">
              {[
                "https://images.consultingmag.com/cdn-cgi/image/format=auto,fit=contain/http://images.consultingmag.com/contrib/content/uploads/sites/364/2022/03/ey-global-sq.png",
                "https://blog.logomyway.com/wp-content/uploads/2021/11/meta-logo.png",
                "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
                "data:image/png;base64,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"
              ].map((logo, index) => (
                <img key={index} src={logo} alt="Company Logo" className="h-16 w-auto object-contain animate-rotate" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div>
        <Fotter />
      </div>
    </div>
  );
};

export default NextStep;
