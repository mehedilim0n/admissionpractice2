
import React from 'react';

interface ResultScreenProps {
  score: number;
  total: number;
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, total, onRestart }) => {
    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

    const getFeedback = () => {
        if (percentage === 100) return "অসাধারণ! আপনি একজন সত্যিকারের জ্ঞানী!";
        if (percentage >= 80) return "দারুণ! আপনার জ্ঞান প্রশংসার যোগ্য।";
        if (percentage >= 50) return "ভালো করেছেন! চালিয়ে যান।";
        return "চেষ্টা করার জন্য ধন্যবাদ! আবার চেষ্টা করুন।";
    };

  return (
    <div className="text-center flex flex-col items-center gap-6">
      <h2 className="text-3xl font-bold text-slate-800">কুইজ সম্পন্ন!</h2>
      <div className="bg-slate-100 p-6 rounded-xl shadow-inner w-full max-w-sm">
        <p className="text-xl text-slate-700">আপনার স্কোর</p>
        <p className="text-6xl font-bold text-emerald-600 my-2">{score} <span className="text-3xl text-slate-500">/ {total}</span></p>
        <div className="w-full bg-slate-200 rounded-full h-4 mt-4">
            <div className="bg-emerald-500 h-4 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
       <p className="text-xl font-medium text-slate-600">{getFeedback()}</p>
      <button
        onClick={onRestart}
        className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg text-xl hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        আবার খেলুন
      </button>
    </div>
  );
};

export default ResultScreen;
