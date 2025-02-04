import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 py-20 text-gray-800 mt-20 shadow-inner relative">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 left-0 w-72 h-72 bg-blue-100/40 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-10 right-0 w-72 h-72 bg-orange-100/40 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Main Footer Content - Aligned Sections */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
          {/* Need Help Section */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 inline-block">Need Help?</h4>
            <p className="text-sm text-gray-600">Got career-related questions? Our experts are here to help!</p>
            <a
              href="tel:+918744987449"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <i className="fa fa-phone mr-3"></i> +91 8167008981
            </a>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 inline-block">Quick Links</h4>
            <div className="flex flex-col space-y-3">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">About Us</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">NextStep Goals</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Success Stories</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Pricing</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Blog</a>
            </div>
          </div>

          {/* Legal Section */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 inline-block">Legal</h4>
            <div className="flex flex-col space-y-3">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300">Disclaimer</a>
            </div>
          </div>

          {/* Stay Connected Section */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 inline-block">Stay Connected</h4>
            <p className="text-sm text-gray-600">Follow us on social media for updates</p>
            <div className="flex space-x-5">
              <a href="#" className="text-gray-600 hover:text-blue-500 transition-colors duration-300 text-xl">
                <i className="fa fa-twitter transform hover:scale-110 transition-transform duration-300"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 text-xl">
                <i className="fa fa-facebook transform hover:scale-110 transition-transform duration-300"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-600 transition-colors duration-300 text-xl">
                <i className="fa fa-instagram transform hover:scale-110 transition-transform duration-300"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-700 transition-colors duration-300 text-xl">
                <i className="fa fa-linkedin transform hover:scale-110 transition-transform duration-300"></i>
              </a>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-gray-800 border-b-2 border-blue-500 pb-2 inline-block">Contact Us</h4>
            <div className="space-y-2">
              <p className="text-gray-600">
                <i className="fa fa-map-marker mr-2"></i>
                20/31, Bhubaneswar, Patia - 751024
              </p>
              <p className="text-gray-600">
                <i className="fa fa-envelope mr-2"></i>
                <a href="mailto:hello@Nextstep.com" className="hover:text-blue-600 transition-colors duration-300">
                  hello@Nextstep.com
                </a>
              </p>
              <p className="text-gray-600">
                <i className="fa fa-phone mr-2"></i>
                <a href="tel:+918167008981" className="hover:text-blue-600 transition-colors duration-300">
                  +91 8167008981
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Information Sections */}
        <div className="border-t border-gray-200/60 mt-16 pt-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* How We Help - Enhanced */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <h3 className="text-xl font-bold text-blue-600 mb-4 pb-2 border-b-2 border-blue-500 group-hover:border-blue-600 transition-colors">
                How We Help
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Navigate through hundreds of career options and find your perfect path. Join thousands of successful students we've guided!
              </p>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3 group/item">
                  <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center group-hover/item:bg-green-200 transition-colors">
                    <i className="fa fa-check text-green-600"></i>
                  </span>
                  <span className="text-gray-600 group-hover/item:text-gray-900 transition-colors">Career Counselling for Class 8-9</span>
                </li>
                <li className="flex items-center space-x-3 group/item">
                  <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center group-hover/item:bg-green-200 transition-colors">
                    <i className="fa fa-check text-green-600"></i>
                  </span>
                  <span className="text-gray-600 group-hover/item:text-gray-900 transition-colors">Career Counselling for Class 10-12</span>
                </li>
                <li className="flex items-center space-x-3 group/item">
                  <span className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center group-hover/item:bg-green-200 transition-colors">
                    <i className="fa fa-check text-green-600"></i>
                  </span>
                  <span className="text-gray-600 group-hover/item:text-gray-900 transition-colors">Career Counselling for Graduates</span>
                </li>
              </ul>
            </div>

            {/* Popular Careers - Enhanced */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <h3 className="text-xl font-bold text-blue-600 mb-4 pb-2 border-b-2 border-blue-500 group-hover:border-blue-600 transition-colors">
                Popular Careers
              </h3>
              <ul className="space-y-3">
                <li className="group/item">
                  <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors">
                    <span className="transform group-hover/item:translate-x-2 transition-transform">→</span>
                    <span>Career in Design</span>
                  </a>
                </li>
                <li className="group/item">
                  <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors">
                    <span className="transform group-hover/item:translate-x-2 transition-transform">→</span>
                    <span>Career in Engineering</span>
                  </a>
                </li>
                <li className="group/item">
                  <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors">
                    <span className="transform group-hover/item:translate-x-2 transition-transform">→</span>
                    <span>Career in Media & Communication</span>
                  </a>
                </li>
                <li className="group/item">
                  <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors">
                    <span className="transform group-hover/item:translate-x-2 transition-transform">→</span>
                    <span>Career in Social Sciences</span>
                  </a>
                </li>
                <li className="group/item">
                  <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors">
                    <span className="transform group-hover/item:translate-x-2 transition-transform">→</span>
                    <span>Career in Ethical Hacking</span>
                  </a>
                </li>
              </ul>
              <a href="#" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium mt-4 group/link">
                <span>View All Careers</span>
                <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
              </a>
            </div>

            {/* Popular Blogs - Enhanced */}
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <h3 className="text-xl font-bold text-blue-600 mb-4 pb-2 border-b-2 border-blue-500 group-hover:border-blue-600 transition-colors">
                Popular Blogs
              </h3>
              <ul className="space-y-3">
                <li className="group/item">
                  <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors">
                    <span className="transform group-hover/item:translate-x-2 transition-transform">→</span>
                    <span>Career Options for PCM Students</span>
                  </a>
                </li>
                <li className="group/item">
                  <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors">
                    <span className="transform group-hover/item:translate-x-2 transition-transform">→</span>
                    <span>Career Options for PCB Students</span>
                  </a>
                </li>
                <li className="group/item">
                  <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors">
                    <span className="transform group-hover/item:translate-x-2 transition-transform">→</span>
                    <span>How to Become a Pilot in India</span>
                  </a>
                </li>
                <li className="group/item">
                  <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors">
                    <span className="transform group-hover/item:translate-x-2 transition-transform">→</span>
                    <span>How to Become a Psychologist</span>
                  </a>
                </li>
                <li className="group/item">
                  <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors">
                    <span className="transform group-hover/item:translate-x-2 transition-transform">→</span>
                    <span>CBSE vs ICSE vs IB Boards</span>
                  </a>
                </li>
              </ul>
              <a href="#" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium mt-4 group/link">
                <span>Read More Blogs</span>
                <span className="transform group-hover/link:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Enhanced Copyright Section */}
        <div className="text-center mt-16 pt-8 border-t border-gray-200/60">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">Terms</a>
              <span className="text-gray-300">•</span>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">Privacy</a>
              <span className="text-gray-300">•</span>
              <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">Cookies</a>
            </div>
            <p className="text-gray-500">
              © 2024 NextStep. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
