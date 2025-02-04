import React, { useState } from 'react';

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const faqs = [
    {
      question: "Does Long-term mentorship really produce outcomes?",
      answer: "Yes! Our long-term mentorship program has helped thousands of students achieve their career goals. With dedicated 1:1 guidance, structured learning paths, and industry expert mentors, we've seen 89% of our students land their dream jobs within 6 months."
    },
    {
      question: "What should be the duration of my long-term mentorship?", 
      answer: "We recommend a minimum of 3-6 months to see significant results. This allows enough time to build strong foundations, work on real projects, and make meaningful progress in your career journey."
    },
    {
      question: "How many sessions can I have with the mentor?",
      answer: "Our standard program includes weekly 1-hour sessions. You'll get 4-5 sessions per month, plus unlimited text support through our platform. Premium plans offer additional session flexibility."
    },
    {
      question: "When is the right time to take long-term mentorship?",
      answer: "The best time is when you're ready to commit to your professional growth. Whether you're a student, early career professional, or looking to switch careers, our mentorship can be customized to your needs."
    },
    {
      question: "Do you provide any student discount on the long-term mentorship plan?",
      answer: "Yes! We offer special student discounts up to 25% off on our mentorship plans. Valid student ID required. Contact our support team for details."
    },
    {
      question: "What are 100% money-back guarantee & mentor-change policies?",
      answer: "We offer a 7-day money-back guarantee if you're not satisfied. You can also request a mentor change within the first month if you feel the current mentor isn't the right fit."
    }
  ];

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in">
            Frequently Asked <span className="text-blue-400">Questions</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Get answers to common questions about our Long Term Mentorship program
          </p>
        </div>

        <div className="grid gap-3">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500/50 transition-all duration-300"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-700/30"
              >
                <span className="text-base md:text-lg font-medium text-white">{faq.question}</span>
                <span className={`text-xl text-blue-400 transition-transform duration-300 ${activeIndex === index ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-72' : 'max-h-0'}`}>
                <p className="p-4 text-gray-300 border-t border-gray-700 text-sm">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
