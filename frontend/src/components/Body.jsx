import React, { useEffect } from 'react';
import './bodystyle.css';
import ai from './allimages/artificial-intelligence-icon-sign-logo-vector-49693366.jpg';
import arrow from './allimages/reshot-icon-right-arrow-UCA8NGYZDJ.svg';
import mentor from './allimages/mmm.png';
import livementor from './allimages/connect.jpg';
import Navbar from './Navbar';
import Slider from './Slider';
import Inpage from './Inpage';
import Inpage2 from './Inpage2';
import Inpage3 from './Inpage3';
import Fotter from './Fotter';
import vr from './allimages/vr.jpg';
import cafe from './allimages/cafe.jpg';
import dream from './allimages/dream.webp';
import { Link } from 'react-router-dom';

function Body() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://unpkg.com/ionicons@5.1.2/dist/ionicons.js";
    script.async = true;
    document.body.appendChild(script);

    const showMenu = (toggleId, navbarId, bodyId) => {
      const toggle = document.getElementById(toggleId),
        navbar = document.getElementById(navbarId),
        bodyPadding = document.getElementById(bodyId);

      if (toggle && navbar) {
        toggle.addEventListener('click', () => {
          navbar.classList.toggle('expander');
          if (bodyPadding) {
            bodyPadding.classList.toggle('body-pd');
          }
        });
      }
    };
    showMenu('nav-toggle', 'navbar', 'body-pd');

    const linkColor = document.querySelectorAll('.nav__link');
    function colorLink() {
      linkColor.forEach((l) => l.classList.remove('active'));
      this.classList.add('active');
    }
    linkColor.forEach((l) => l.addEventListener('click', colorLink));

    const linkCollapse = document.getElementsByClassName('collapse__link');
    for (let i = 0; i < linkCollapse.length; i++) {
      linkCollapse[i].addEventListener('click', function () {
        const collapseMenu = this.nextElementSibling;
        collapseMenu.classList.toggle('showCollapse');

        const rotate = collapseMenu.previousElementSibling;
        rotate.classList.toggle('rotate');
      });
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full">
      <>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="assets/css/styles.css" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        <nav>{<Navbar />}</nav>
        <div>{<Slider />}</div>
        <div id="services" 
          className="py-16 text-white font-sans relative min-h-screen overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover'
          }}>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/60 animate-pulse"></div>
          <div className="px-4 mx-auto max-w-7xl relative z-10">
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-white font-bold mb-6 text-center animate-fade-in-down">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">Categories</span>
            </h1>
            <p className="text-white/90 mb-16 text-center font-serif text-xl md:text-2xl lg:text-3xl italic">
              Discover your passion and shape your future
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
              <div className="group bg-white/10 backdrop-blur-lg p-6 rounded-xl transition-all duration-300 hover:bg-gradient-to-r from-blue-500/90 via-purple-500/90 to-pink-500/90 hover:translate-y-[-12px] hover:scale-105 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-2xl w-full max-w-sm">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVZzfe672YVFxhvc-NrZ5lae-KU1psmsk-Aw&s" 
                       alt="img" 
                       className="w-24 h-24 mb-6 rounded-full object-cover mx-auto border-2 border-white/50 group-hover:border-white transition-all duration-300 relative z-10" />
                </div>
                <h2 className="text-2xl md:text-3xl mb-3 text-white text-center font-bold group-hover:text-white transition-colors duration-300">Referrals</h2>
                <p className="mb-6 text-white/80 text-center text-base md:text-lg group-hover:text-white transition-opacity duration-300">
                  Invite friends, earn rewards...
                </p>
                <Link to="/body/referrals" className="block text-center">
                <button className="w-full py-2 px-4 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300 font-medium text-sm md:text-base group-hover:bg-white/20">
                    Know More
                    <img src={arrow} className="w-4 h-4 inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>

              <div className="group bg-white/10 backdrop-blur-lg p-6 rounded-xl transition-all duration-300 hover:bg-gradient-to-r from-blue-500/90 via-purple-500/90 to-pink-500/90 hover:translate-y-[-12px] hover:scale-105 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-2xl w-full max-w-sm">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <img src="https://cdn-icons-png.flaticon.com/512/5677/5677749.png" 
                       alt="img" 
                       className="w-24 h-24 mb-6 rounded-full object-cover mx-auto border-2 border-white/50 group-hover:border-white transition-all duration-300 relative z-10" />
                </div>
                <h2 className="text-2xl md:text-3xl mb-3 text-white text-center font-bold group-hover:text-white transition-colors duration-300">Career Cafe</h2>
                <p className="mb-6 text-white/80 text-center text-base md:text-lg group-hover:text-white transition-colors duration-300">
                  Chill and connect with your Friends.......
                </p>
                <Link to="/body/career-cafe">
                  <button className="w-full py-2 px-4 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300 font-medium text-sm md:text-base group-hover:bg-white/20">
                    Know More
                    <img src={arrow} className="w-4 h-4 inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>

              <div className="group bg-white/10 backdrop-blur-lg p-6 rounded-xl transition-all duration-300 hover:bg-gradient-to-r from-blue-500/90 via-purple-500/90 to-pink-500/90 hover:translate-y-[-12px] hover:scale-105 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-2xl w-full max-w-sm">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <img src="https://www.southmoorschool.co.uk/wp-content/uploads/job_interview_illustration.jpg" 
                       alt="img" 
                       className="w-24 h-24 mb-6 rounded-full object-cover mx-auto border-2 border-white/50 group-hover:border-white transition-all duration-300 relative z-10" />
                </div>
                <h2 className="text-2xl md:text-3xl mb-3 text-white text-center font-bold group-hover:text-white transition-colors duration-300">Mock Interview</h2>
                <p className="mb-6 text-white/80 text-center text-base md:text-lg group-hover:text-white transition-colors duration-300">
                  Prepare for your next interview with us ..
                </p>
                <Link to="/body/interview">
                <button className="w-full py-2 px-4 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300 font-medium text-sm md:text-base group-hover:bg-white/20">
                  Know More
                  <img src={arrow} className="w-4 h-4 inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                </Link>
              </div>

              <div className="group bg-white/10 backdrop-blur-lg p-6 rounded-xl transition-all duration-300 hover:bg-gradient-to-r from-blue-500/90 via-purple-500/90 to-pink-500/90 hover:translate-y-[-12px] hover:scale-105 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-2xl w-full max-w-sm">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <img src={cafe} 
                       alt="img" 
                       className="w-24 h-24 mb-6 rounded-full object-cover mx-auto border-2 border-white/50 group-hover:border-white transition-all duration-300 relative z-10" />
                </div>
                <h2 className="text-2xl md:text-3xl mb-3 text-white text-center font-bold group-hover:text-white transition-colors duration-300">Daily Quiz and Exam</h2>
                <p className="mb-6 text-white/80 text-center text-base md:text-lg group-hover:text-white transition-colors duration-300">
                  Enhance your knowledge with us . . . . .
                </p>
                <Link to="/body/quiz">
                  <button className="w-full py-2 px-4 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300 font-medium text-sm md:text-base group-hover:bg-white/20">
                    Know More
                    <img src={arrow} className="w-4 h-4 inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>

              <div className="group bg-white/10 backdrop-blur-lg p-6 rounded-xl transition-all duration-300 hover:bg-gradient-to-r from-blue-500/90 via-purple-500/90 to-pink-500/90 hover:translate-y-[-12px] hover:scale-105 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-2xl w-full max-w-sm">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <img src="https://img.freepik.com/free-vector/simple-isometric-hiring-illustration_23-2148089417.jpg" 
                       alt="img" 
                       className="w-24 h-24 mb-6 rounded-full object-cover mx-auto border-2 border-white/50 group-hover:border-white transition-all duration-300 relative z-10" />
                </div>
                <h2 className="text-2xl md:text-3xl mb-3 text-white text-center font-bold group-hover:text-white transition-colors duration-300">Job Opportunities</h2>
                <p className="mb-6 text-white/80 text-center text-base md:text-lg group-hover:text-white transition-colors duration-300">
                  Explore exciting career opportunities...
                </p>
                <Link to="/body/job-opportunities">
                  <button className="w-full py-2 px-4 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300 font-medium text-sm md:text-base group-hover:bg-white/20">
                    Know More
                    <img src={arrow} className="w-4 h-4 inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>

              <div className="group bg-white/10 backdrop-blur-lg p-6 rounded-xl transition-all duration-300 hover:bg-gradient-to-r from-blue-500/90 via-purple-500/90 to-pink-500/90 hover:translate-y-[-12px] hover:scale-105 border border-white/20 hover:border-white/40 shadow-lg hover:shadow-2xl w-full max-w-sm">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                  <img src="https://img.freepik.com/free-vector/startup-life-concept-illustration_114360-1068.jpg" 
                       alt="Entrepreneurship"
                       className="w-24 h-24 mb-6 rounded-full object-cover mx-auto border-2 border-white/50 group-hover:border-white transition-all duration-300 relative z-10" />
                </div>
                <h2 className="text-2xl md:text-3xl mb-3 text-white text-center font-bold group-hover:text-white transition-colors duration-300">Entrepreneurship Hub</h2>
                <p className="mb-6 text-white/80 text-center text-base md:text-lg group-hover:text-white transition-colors duration-300">
                  Learn how to start your own business
                </p>
                <Link to="/body/entrepreneurship">
                <button className="w-full py-2 px-4 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300 font-medium text-sm md:text-base group-hover:bg-white/20">
                  Know More
                  <img src={arrow} className="w-4 h-4 inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                </Link>
              </div>

              
            </div>
          </div>
        </div>
        <div>
          <Inpage />
        </div>
        <div>
          <Inpage3/>
        </div>
        <div>
          <Inpage2/>
        </div>
        <div>
          <Fotter/>
        </div>
      </>
    </div>
  );
}

export default Body;
