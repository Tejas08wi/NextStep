import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePoints } from '../context/PointsContext';

const QuizSection = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addPoints } = usePoints();

  const hasCompletedQuiz = (quizId) => {
    const completedQuizzes = JSON.parse(localStorage.getItem('completedQuizzes') || '[]');
    return completedQuizzes.includes(quizId);
  };

  const markQuizAsCompleted = (quizId) => {
    const completedQuizzes = JSON.parse(localStorage.getItem('completedQuizzes') || '[]');
    if (!completedQuizzes.includes(quizId)) {
      completedQuizzes.push(quizId);
      localStorage.setItem('completedQuizzes', JSON.stringify(completedQuizzes));
      return true; // Quiz was newly completed
    }
    return false; // Quiz was already completed before
  };

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (quiz && !quizSubmitted) {
      setTimeLeft(quiz.timeLimit * 60);
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quiz, quizSubmitted]);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:8080/api/quiz/take/${quizId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch quiz');
      }
      
      if (!data.quiz || !data.quiz.questions || !Array.isArray(data.quiz.questions)) {
        throw new Error('Invalid quiz data received');
      }
      
      setQuiz(data.quiz);
      setSelectedAnswers({}); // Reset selected answers
    } catch (error) {
      console.error('Error fetching quiz:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    if (!quiz || !quiz.questions) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!quiz || !quiz.questions) return;
    
    try {
      const response = await fetch('http://localhost:8080/api/quiz/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          quizId: quiz._id,
          answers: Object.entries(selectedAnswers).map(([questionIndex, answerIndex]) => ({
            questionId: quiz.questions[parseInt(questionIndex)]._id,
            selectedAnswer: answerIndex
          }))
        })
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit quiz');
      }
      
      setResults(data);
      setQuizSubmitted(true);
      
      // Award 5 points for each correct answer only if this quiz hasn't been completed before
      if (data.score > 0 && !hasCompletedQuiz(quiz._id)) {
        const pointsToAdd = data.score * 5;
        addPoints(pointsToAdd);
        markQuizAsCompleted(quiz._id);
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setError(error.message);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8 flex items-center justify-center">
        <div className="text-white text-xl">Loading quiz...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8">
          <div className="text-red-500 text-xl mb-4">Error: {error}</div>
          <button
            onClick={() => navigate('/body/quiz')}
            className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8">
          <div className="text-white text-xl mb-4">Quiz not found</div>
          <button
            onClick={() => navigate('/body/quiz')}
            className="px-6 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  if (quizSubmitted && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
        <div className="max-w-3xl mx-auto bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold text-center mb-8">Quiz Results</h2>
          <div className="text-center mb-8">
            <p className="text-6xl font-bold text-cyan-400 mb-4">{results.percentage}%</p>
            <p className="text-xl">
              You got <span className="text-cyan-400 font-bold">{results.score}</span> out of{" "}
              <span className="text-cyan-400 font-bold">{results.total}</span> questions correct
            </p>
            {!hasCompletedQuiz(quiz._id) && results.score > 0 ? (
              <p className="mt-4 text-lg text-yellow-400">
                +{results.score * 5} points earned!
              </p>
            ) : results.score > 0 ? (
              <p className="mt-4 text-lg text-gray-400">
                You've already earned points for this quiz
              </p>
            ) : null}
          </div>

          <div className="space-y-6">
            {results.results.map((result, index) => (
              <div
                key={result.questionId}
                className={`p-4 rounded-lg ${
                  result.correct ? 'bg-green-900/30' : 'bg-red-900/30'
                }`}
              >
                <p className="font-medium mb-2">
                  {index + 1}. {result.question}
                </p>
                <div className="ml-4">
                  <p className="text-sm text-gray-300">
                    Your answer: {quiz.questions.find(q => q._id === result.questionId).options[result.yourAnswer]}
                    {result.correct ? (
                      <span className="text-green-400 ml-2"> ✓ Correct</span>
                    ) : (
                      <span className="text-red-400 ml-2"> ✗ Incorrect</span>
                    )}
                  </p>
                  {!result.correct && (
                    <p className="text-sm text-gray-300 mt-1">
                      Correct answer: {quiz.questions.find(q => q._id === result.questionId).options[result.correctAnswer]}
                    </p>
                  )}
                  {result.explanation && (
                    <p className="text-sm text-gray-400 mt-2">
                      Explanation: {result.explanation}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/body/quiz')}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all duration-300"
            >
              Take Another Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8">
        {/* Quiz Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">{quiz.title}</h1>
          <div className="text-xl font-semibold text-cyan-400">
            Time Left: {formatTime(timeLeft)}
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl text-white mb-4">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </h2>
          <p className="text-lg text-white mb-6">{quiz.questions[currentQuestion].question}</p>

          {/* Options */}
          <div className="space-y-4">
            {quiz.questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleAnswerSelect(currentQuestion, index)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'bg-cyan-600/50 border-2 border-cyan-400'
                    : 'bg-slate-700/50 hover:bg-slate-600/50 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-600 text-white font-semibold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-white">{option}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestion === 0}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              currentQuestion === 0
                ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                : 'bg-slate-700 text-white hover:bg-slate-600'
            }`}
          >
            Previous
          </button>

          {currentQuestion === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmitQuiz}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all duration-300"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-emerald-600 transition-all duration-300"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizSection;
