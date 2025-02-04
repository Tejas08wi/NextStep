import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';

const Entrepreneurship = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      mirror: false,
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <header className={`fixed w-full z-50 transition-all duration-500 ease-in-out bg-white shadow-md ${
        isScrolled ? 'py-2' : 'py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2 group">
              <span className="text-3xl transform transition-transform duration-500 ease-in-out group-hover:rotate-180 group-hover:scale-110">🚀</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent transform transition-all duration-300 ease-in-out hover:scale-105">
                <span className="text-amber-500 hover:text-amber-600 transition-colors duration-300">E</span>ntrepreneurship
                <span className="text-amber-500 hover:text-amber-600 transition-colors duration-300">Hub</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <nav className="flex space-x-8">
                {['Home', 'Features', 'Success Stories', 'Contact'].map((item) => (
                  <Link
                    key={item}
                    to={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-700 hover:text-indigo-600 font-medium transition-all duration-300 ease-in-out relative group transform hover:scale-105"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-blue-500 group-hover:w-full transition-all duration-500 ease-in-out" />
                  </Link>
                ))}
              </nav>
              
              {/* Single CTA Button */}
              <Link
                to="#"
                className="px-4 py-2 text-white font-semibold bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg 
                  transform transition-all duration-300 ease-in-out
                  hover:shadow-lg hover:-translate-y-0.5 hover:scale-105
                  active:scale-95 hover:from-indigo-700 hover:to-blue-600"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-all duration-300 ease-in-out
                hover:bg-gray-100 transform hover:scale-105 active:scale-95"
            >
              <svg
                className="w-6 h-6 text-gray-700 transition-transform duration-300 ease-in-out"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                    className="transform rotate-0"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                    className="transform rotate-180"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`md:hidden transition-all duration-500 ease-in-out transform ${
              isMenuOpen 
                ? 'opacity-100 translate-y-0 max-h-96' 
                : 'opacity-0 -translate-y-4 max-h-0'
            } overflow-hidden`}
          >
            <nav className="flex flex-col space-y-4 py-4">
              {['Home', 'Features', 'Success Stories', 'Contact'].map((item) => (
                <Link
                  key={item}
                  to={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-700 hover:text-indigo-600 font-medium 
                    transition-all duration-300 ease-in-out transform hover:translate-x-2
                    hover:scale-105"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <Link
                to="#"
                className="px-4 py-2 text-center text-white font-semibold 
                  bg-gradient-to-r from-indigo-600 to-blue-500 rounded-lg
                  transform transition-all duration-300 ease-in-out
                  hover:shadow-lg hover:-translate-y-0.5 hover:scale-105
                  active:scale-95 hover:from-indigo-700 hover:to-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-800 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 transform transition-all duration-700 ease-in-out hover:scale-105" data-aos="fade-up">
              Transform Your <span className="text-amber-400 hover:text-amber-300 transition-colors duration-300">Ideas</span> Into 
              <br />
              Successful <span className="text-amber-400 hover:text-amber-300 transition-colors duration-300">Ventures</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto transition-all duration-500 ease-in-out hover:text-white" data-aos="fade-up" data-aos-delay="100">
              Join thousands of entrepreneurs who have turned their vision into reality with our comprehensive platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12" data-aos="fade-up" data-aos-delay="200">
              <button className="px-8 py-4 bg-amber-500 text-white font-bold rounded-full 
                transform transition-all duration-300 ease-in-out
                hover:bg-amber-400 hover:-translate-y-1 hover:scale-105 hover:shadow-lg
                active:scale-95">
                Start Your Journey
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full 
                transform transition-all duration-300 ease-in-out
                hover:bg-white hover:text-indigo-900 hover:-translate-y-1 hover:scale-105
                active:scale-95">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="300">
              {[
                { value: "1000+", label: "Startups Launched" },
                { value: "$50M+", label: "Funding Raised" },
                { value: "92%", label: "Success Rate" }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 
                  transform transition-all duration-300 ease-in-out
                  hover:bg-white/20 hover:-translate-y-2 hover:scale-105">
                  <h3 className="text-4xl font-bold text-amber-400 mb-2 transition-colors duration-300 hover:text-amber-300">
                    {stat.value}
                  </h3>
                  <p className="text-gray-300 transition-colors duration-300 hover:text-white">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 
              transform transition-all duration-500 ease-in-out hover:scale-105" data-aos="fade-up">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-300 hover:text-gray-900" 
              data-aos="fade-up" data-aos-delay="100">
              Everything you need to transform your startup idea into a thriving business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "💡",
                title: "Innovative Tools",
                description: "Access cutting-edge tools and resources designed for modern entrepreneurs"
              },
              {
                icon: "🤝",
                title: "Expert Mentorship",
                description: "Connect with industry leaders and successful entrepreneurs"
              },
              {
                icon: "📈",
                title: "Growth Strategy",
                description: "Data-driven approaches to scale your business effectively"
              },
              {
                icon: "🌐",
                title: "Global Network",
                description: "Join a worldwide community of innovative entrepreneurs"
              },
              {
                icon: "💰",
                title: "Funding Access",
                description: "Connect with investors and funding opportunities"
              },
              {
                icon: "📚",
                title: "Resource Library",
                description: "Comprehensive guides and learning materials"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-blue-50 rounded-xl p-8 shadow-lg 
                  transform transition-all duration-500 ease-in-out
                  hover:shadow-2xl hover:-translate-y-2 hover:scale-105
                  hover:bg-blue-100/80 group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="text-4xl mb-4 transform transition-all duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2 transition-colors duration-300 group-hover:text-indigo-600">
                  {feature.title}
                </h3>
                <p className="text-blue-800/80 transition-colors duration-300 group-hover:text-gray-900">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white" id="stories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 
              transform transition-all duration-500 ease-in-out hover:scale-105" data-aos="fade-up">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto transition-all duration-300 hover:text-gray-900" 
              data-aos="fade-up" data-aos-delay="100">
              Learn from entrepreneurs who have already achieved their dreams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "TechVision Founder",
                image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e",
                quote: "Starting with just an idea, we now serve millions globally."
              },
              {
                name: "Mark Rodriguez",
                role: "EcoSolutions CEO",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
                quote: "The mentorship and resources helped us scale beyond our expectations."
              },
              {
                name: "Lisa Wang",
                role: "HealthTech Innovator",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
                quote: "From concept to market leader in just 18 months. Amazing journey!"
              }
            ].map((story, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden
                  transform transition-all duration-500 ease-in-out
                  hover:shadow-2xl hover:-translate-y-2 hover:scale-105
                  group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <img 
                  src={story.image} 
                  alt={story.name} 
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 transition-colors duration-300 group-hover:text-indigo-600">
                    {story.name}
                  </h3>
                  <p className="text-indigo-600 mb-4 transition-colors duration-300 group-hover:text-indigo-800">
                    {story.role}
                  </p>
                  <p className="text-gray-600 italic transition-colors duration-300 group-hover:text-gray-900">
                    "{story.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-500 transform transition-all duration-700 ease-in-out hover:scale-105" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-500 hover:scale-105" 
            data-aos="fade-up">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto transition-all duration-300 hover:text-white" 
            data-aos="fade-up" data-aos-delay="100">
            Join thousands of successful entrepreneurs who have already taken the first step
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="200">
            <button className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-full
              transform transition-all duration-300 ease-in-out
              hover:bg-gray-100 hover:-translate-y-1 hover:scale-105 hover:shadow-lg
              active:scale-95">
              Get Started Now
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full
              transform transition-all duration-300 ease-in-out
              hover:bg-white hover:text-indigo-600 hover:-translate-y-1 hover:scale-105
              active:scale-95">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">EntrepreneurshipHub</h3>
              <p className="text-gray-400">Empowering the next generation of entrepreneurs</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Success Stories</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Guides</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="#" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center transition-colors duration-300 hover:text-white">
            <p>&copy; 2024 EntrepreneurshipHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Entrepreneurship;