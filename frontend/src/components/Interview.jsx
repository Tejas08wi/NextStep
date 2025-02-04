import React, { useState, useEffect } from 'react'

const Interview = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [selectedPlan, setSelectedPlan] = useState('monthly')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const resources = [
    { category: 'technical', title: 'Technical Interview Guide', description: 'Master data structures and algorithms', icon: '💻' },
    { category: 'behavioral', title: 'Behavioral Questions', description: 'STAR method explained', icon: '🤝' },
    { category: 'technical', title: 'System Design', description: 'Large scale system design concepts', icon: '🏗️' },
    { category: 'behavioral', title: 'Leadership Principles', description: 'Key leadership traits and examples', icon: '👥' },
  ]

  const stats = [
    { number: '500+', label: 'Practice Questions' },
    { number: '50k+', label: 'Success Stories' },
    { number: '100+', label: 'Expert Mentors' },
    { number: '95%', label: 'Success Rate' },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      text: "Interview Hub helped me land my dream job! The AI mock interviews were incredibly realistic."
    },
    {
      name: "Michael Chen",
      role: "Product Manager at Meta",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      text: "The structured approach and expert feedback made all the difference in my interviews."
    },
    {
      name: "Emma Davis",
      role: "Data Scientist at Amazon",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      text: "Comprehensive resources and great community support. Highly recommended!"
    }
  ]

  const pricingPlans = [
    {
      name: "Basic",
      monthlyPrice: "29",
      yearlyPrice: "290",
      features: [
        "5 AI Mock Interviews",
        "Basic Resources Access",
        "Community Support",
        "Email Support"
      ]
    },
    {
      name: "Pro",
      monthlyPrice: "49",
      yearlyPrice: "490",
      popular: true,
      features: [
        "Unlimited AI Mock Interviews",
        "Full Resources Access",
        "Priority Support",
        "1 Expert Coaching Session",
        "Interview Analytics"
      ]
    },
    {
      name: "Enterprise",
      monthlyPrice: "99",
      yearlyPrice: "990",
      features: [
        "Everything in Pro",
        "Custom Interview Scenarios",
        "3 Expert Coaching Sessions",
        "Team Dashboard",
        "API Access"
      ]
    }
  ]

  return (
    <div className="font-['Poppins'] bg-gradient-to-br from-indigo-500 via-purple-500 to-green-200 min-h-screen">
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 shadow-lg' : 'bg-transparent'
      }`}>
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-5xl font-extrabold animate-pulse">
            <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Interview Hub
            </span>
          </div>
          <ul className="hidden md:flex space-x-8">
            {['Home', 'Features', 'Resources', 'Contact'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`font-medium relative overflow-hidden group ${
                    isScrolled ? 'text-gray-800' : 'text-white'
                  }`}
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50"></div>
        </div>
        <div className="relative z-10 text-white px-4 max-w-4xl">
          <div className="animate-[slideDown_1s_ease-out]">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Your Journey to Interview
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"> Success</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Join thousands of successful candidates who have mastered their interview skills with us
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a
              href="#features"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-bold shadow-lg transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl w-48"
            >
              Get Started
            </a>
            <a
              href="#demo"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-bold border border-white/30 transform hover:-translate-y-1 transition-all duration-300 hover:bg-white/20 w-48"
            >
              Watch Demo ▶️
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 -mt-20 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-lg rounded-xl p-6 text-center transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-gray-600 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Our Premium Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group bg-white/90 rounded-xl p-8 text-center transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <div className="relative z-10 group-hover:text-white transition-colors duration-300">
              <div className="text-5xl mb-4">📹</div>
              <h3 className="text-xl font-semibold mb-4">AI Mock Interviews</h3>
              <p className="text-gray-600 group-hover:text-white/90">
                Practice with our advanced AI interviewer and get instant feedback
              </p>
              <button className="mt-6 px-6 py-2 border border-blue-500 rounded-full group-hover:border-white transition-colors duration-300">
                Try Now
              </button>
            </div>
          </div>

          <div className="group bg-white/90 rounded-xl p-8 text-center transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <div className="relative z-10 group-hover:text-white transition-colors duration-300">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-4">Resource Library</h3>
              <p className="text-gray-600 group-hover:text-white/90">
                Access our vast library of interview questions and expert answers
              </p>
              <button className="mt-6 px-6 py-2 border border-purple-500 rounded-full group-hover:border-white transition-colors duration-300">
                Explore
              </button>
            </div>
          </div>

          <div className="group bg-white/90 rounded-xl p-8 text-center transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <div className="relative z-10 group-hover:text-white transition-colors duration-300">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-4">Expert Coaching</h3>
              <p className="text-gray-600 group-hover:text-white/90">
                Get personalized guidance from industry professionals
              </p>
              <button className="mt-6 px-6 py-2 border border-pink-500 rounded-full group-hover:border-white transition-colors duration-300">
                Connect
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Success Stories</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/90 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mr-4 border-2 border-purple-500"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-8 text-white">Pricing Plans</h2>
        <div className="flex justify-center mb-8">
          <div className="bg-white/20 backdrop-blur-md p-1 rounded-full">
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedPlan === 'monthly' 
                  ? 'bg-white text-blue-500 shadow-md' 
                  : 'text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelectedPlan('yearly')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                selectedPlan === 'yearly' 
                  ? 'bg-white text-blue-500 shadow-md' 
                  : 'text-white'
              }`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white/90 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative ${
                plan.popular ? 'transform -translate-y-4' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="text-4xl font-bold mb-6">
                ${selectedPlan === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                <span className="text-base font-normal text-gray-600">/{selectedPlan === 'monthly' ? 'mo' : 'yr'}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:shadow-lg transition-all duration-300">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white/90 backdrop-blur-lg rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "How do AI mock interviews work?",
                a: "Our AI system uses advanced natural language processing to conduct realistic interview scenarios, providing instant feedback on your responses.",
                icon: "🤖"
              },
              {
                q: "Can I switch plans later?",
                a: "Yes, you can upgrade or downgrade your plan at any time. The changes will be reflected in your next billing cycle.",
                icon: "🔄"
              },
              {
                q: "Are the expert coaches real industry professionals?",
                a: "Yes, all our coaches are verified industry professionals with at least 5 years of experience in their respective fields.",
                icon: "👨‍💼"
              },
              {
                q: "Is there a money-back guarantee?",
                a: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our services.",
                icon: "💰"
              }
            ].map((faq, index) => (
              <div 
                key={index} 
                className="group p-6 bg-gradient-to-br from-white to-purple-50 rounded-xl border border-purple-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
                    {faq.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 text-lg bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
                      {faq.q}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
                <div className="mt-4 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full"/>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              View More FAQs
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Ready to Ace Your Interviews?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of successful candidates who have transformed their interview performance with Interview Hub.
            </p>
            <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              Start Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white/90 backdrop-blur-lg rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Interview Resources
          </h2>
          <div className="flex justify-center space-x-4 mb-8">
            {['all', 'technical', 'behavioral'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-full capitalize transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {resources
              .filter((resource) => activeTab === 'all' || resource.category === activeTab)
              .map((resource, index) => (
                <div
                  key={index}
                  className="group p-6 bg-white rounded-lg border border-gray-200 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"/>
                  <div className="relative z-10">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {resource.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent">
                      {resource.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                      {resource.description}
                    </p>
                    <button className="mt-4 px-4 py-2 rounded-full text-sm font-medium text-purple-600 hover:text-white border border-purple-600 hover:bg-purple-600 transition-all duration-300">
                      Learn More →
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <div className="text-center mt-8">
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              View All Resources
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/90 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Interview Hub</h3>
              <p className="text-gray-400">Empowering candidates to succeed in their dream roles.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-2xl hover:text-blue-500 transition-colors duration-300">💬</a>
                <a href="#" className="text-2xl hover:text-blue-500 transition-colors duration-300">🐦</a>
                <a href="#" className="text-2xl hover:text-blue-500 transition-colors duration-300">💼</a>
                <a href="#" className="text-2xl hover:text-blue-500 transition-colors duration-300">📸</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Interview Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Interview