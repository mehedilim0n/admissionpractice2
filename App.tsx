
import React, { useState, useCallback } from 'react';
import { QuizQuestion, QuizState } from './types';
import { generateQuizQuestions } from './services/geminiService';
import StartScreen from './components/StartScreen';
import LoadingSpinner from './components/LoadingSpinner';
import QuizCard from './components/QuizCard';

const App: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>('idle');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);

  const fetchMoreQuestions = useCallback(async () => {
    if (isFetchingMore) return;
    
    setIsFetchingMore(true);
    try {
      const newQuestions = await generateQuizQuestions();
      if (newQuestions.length > 0) {
        setQuestions(prev => [...prev, ...newQuestions]);
      }
    } catch (err) {
      console.error("Failed to fetch more questions:", err);
      // Don't stop the quiz, just log the error.
    } finally {
      setIsFetchingMore(false);
    }
  }, [isFetchingMore]);

  const startQuiz = useCallback(async () => {
    setQuizState('loading');
    setError(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    try {
      const newQuestions = await generateQuizQuestions();
      if (newQuestions.length === 0) {
        throw new Error("No questions were generated. Please try again.");
      }
      setQuestions(newQuestions);
      setQuizState('active');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setQuizState('idle');
    }
  }, []);

  const handleNextQuestion = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    
    // Fetch more questions when the user is 3 questions away from the end
    if (nextIndex >= questions.length - 3 && !isFetchingMore) {
      fetchMoreQuestions();
    }
    
    setCurrentQuestionIndex(nextIndex);
  }, [currentQuestionIndex, questions.length, isFetchingMore, fetchMoreQuestions]);
  
  const goHome = () => {
      setQuizState('idle');
  };

  const renderContent = () => {
    switch (quizState) {
      case 'loading':
        return <LoadingSpinner text="আপনার জন্য প্রশ্ন তৈরি করা হচ্ছে..."/>;
      case 'active':
        if (!questions[currentQuestionIndex]) {
            return <LoadingSpinner text="আরো প্রশ্ন লোড করা হচ্ছে..." />;
        }
        return (
          <>
            <div className="w-full mb-6 text-center">
                <p className="text-xl text-slate-600">আপনার স্কোর</p>
                <p className="text-5xl font-bold text-emerald-600">{score}</p>
            </div>
            <QuizCard
              question={questions[currentQuestionIndex]}
              questionNumber={currentQuestionIndex + 1}
              onNextQuestion={handleNextQuestion}
            />
          </>
        );
      case 'idle':
      default:
        return (
          <>
            <StartScreen onStart={startQuiz} />
            {error && <p className="mt-4 text-center text-red-600 bg-red-100 p-3 rounded-lg">{error}</p>}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full h-96 bg-emerald-500/10 -skew-y-6 transform origin-top-left"></div>
      
      <header className="relative z-10 w-full max-w-2xl mx-auto mb-4">
         {quizState === 'active' && (
            <h1 
                onClick={goHome} 
                className="text-xl font-bold text-slate-600 text-center cursor-pointer hover:text-emerald-600 transition-colors"
                aria-label="Back to Home"
            >
                বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি
            </h1>
         )}
      </header>

      <main className="relative z-10 w-full max-w-2xl mx-auto bg-white/70 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl shadow-emerald-500/10 border border-slate-200">
        {renderContent()}
      </main>
      
      <footer className="relative z-10 mt-8 text-center text-slate-500 text-sm">
        <p>Powered by Google Gemini</p>
      </footer>
    </div>
  );
};

export default App;
