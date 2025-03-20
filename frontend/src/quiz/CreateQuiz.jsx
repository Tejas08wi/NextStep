import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    title: '',
    category: 'Aptitude Test', 
    description: '',
    timeLimit: 30,
    questions: [
      {
        question: '',
        options: ['', '', '', ''], 
        correctAnswer: 0, 
        explanation: '' 
      }
    ]
  });

  const categories = [
    'Aptitude Test',
    'Mathematical Reasoning',
    'Technical Knowledge',
    'Verbal Communication'
  ];

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value
    };
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...quiz.questions];
    const updatedOptions = [...updatedQuestions[questionIndex].options];
    updatedOptions[optionIndex] = value;
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      options: updatedOptions
    };
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [
        ...quiz.questions,
        {
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
          explanation: ''
        }
      ]
    });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = quiz.questions.filter((_, i) => i !== index);
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting quiz data:', quiz); // Debug log
      const response = await fetch('http://localhost:8080/api/quiz/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(quiz)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.details?.[0]?.message || data.message || 'Failed to create quiz');
      }

      navigate('/body/quiz');
    } catch (error) {
      console.error('Error creating quiz:', error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-8">
          Create New Quiz
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quiz Details */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Quiz Title"
              value={quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700/50 rounded-lg text-white"
              required
            />

            <select
              value={quiz.category}
              onChange={(e) => setQuiz({ ...quiz, category: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700/50 rounded-lg text-white"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <textarea
              placeholder="Quiz Description"
              value={quiz.description}
              onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700/50 rounded-lg text-white"
              required
            />

            <input
              type="number"
              placeholder="Time Limit (minutes)"
              value={quiz.timeLimit}
              onChange={(e) => setQuiz({ ...quiz, timeLimit: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-slate-700/50 rounded-lg text-white"
              required
              min="1"
            />
          </div>

          {/* Questions */}
          <div className="space-y-8">
            {quiz.questions.map((question, questionIndex) => (
              <div key={questionIndex} className="p-6 bg-slate-700/30 rounded-xl space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-white">
                    Question {questionIndex + 1}
                  </h3>
                  {quiz.questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(questionIndex)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <textarea
                  placeholder="Question"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-600/50 rounded-lg text-white"
                  required
                />

                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-4">
                    <input
                      type="radio"
                      name={`correct-${questionIndex}`}
                      checked={question.correctAnswer === optionIndex}
                      onChange={() => handleQuestionChange(questionIndex, 'correctAnswer', optionIndex)}
                      className="text-emerald-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                      value={option}
                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                      className="flex-1 px-4 py-2 bg-slate-600/50 rounded-lg text-white"
                      required
                    />
                  </div>
                ))}

                <textarea
                  placeholder="Explanation (Optional)"
                  value={question.explanation}
                  onChange={(e) => handleQuestionChange(questionIndex, 'explanation', e.target.value)}
                  className="w-full px-4 py-2 bg-slate-600/50 rounded-lg text-white"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={addQuestion}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-lg text-white font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all"
            >
              Add Question
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              Create Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;
