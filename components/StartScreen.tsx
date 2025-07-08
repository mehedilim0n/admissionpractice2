
import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-2">
        বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি
      </h1>
      <p className="text-slate-600 mb-8 text-lg">
        ঢাকা বিশ্ববিদ্যালয় ও অন্যান্য ভর্তি পরীক্ষার জন্য নিজেকে প্রস্তুত করুন!
      </p>
      <button
        onClick={onStart}
        className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg text-xl hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        প্রস্তুতি শুরু করুন
      </button>
    </div>
  );
};

export default StartScreen;
