
import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';

interface QuizCardProps {
  question: QuizQuestion;
  questionNumber: number;
  onNextQuestion: (isCorrect: boolean) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, questionNumber, onNextQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [question]);

  const handleAnswerClick = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);
  };
  
  const getButtonClass = (option: string) => {
    if (!isAnswered) {
      return 'bg-white hover:bg-slate-100 text-slate-700';
    }
    if (option === question.correctAnswer) {
      return 'bg-green-500 text-white scale-105';
    }
    if (option === selectedAnswer && option !== question.correctAnswer) {
      return 'bg-red-500 text-white';
    }
    return 'bg-white text-slate-700 opacity-60';
  };

  return (
    <div className="w-full">
      <div className="mb-6 text-center">
        <p className="text-xl font-semibold text-slate-700">প্রশ্ন <span className="text-emerald-600">{questionNumber}</span></p>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 text-center">{question.question}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(option)}
            disabled={isAnswered}
            className={`w-full p-4 rounded-lg shadow-sm border border-slate-200 text-left text-lg font-medium transition-all duration-300 ease-in-out transform ${getButtonClass(option)} ${!isAnswered ? 'hover:scale-105' : 'cursor-not-allowed'}`}
          >
            {option}
          </button>
        ))}
      </div>
      
      {isAnswered && (
        <div className="text-center mt-6 animate-fade-in">
             <button 
                onClick={() => onNextQuestion(selectedAnswer === question.correctAnswer)}
                className="bg-emerald-600 text-white font-bold py-2 px-10 rounded-lg text-lg hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-colors"
             >
                পরবর্তী প্রশ্ন
             </button>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
