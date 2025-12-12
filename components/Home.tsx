import React from 'react';
import { Activity, MessageCircleHeart, ArrowRight, LayoutDashboard } from 'lucide-react';
import { ViewState } from '../types';

interface HomeProps {
  changeView: (view: ViewState) => void;
}

const Home: React.FC<HomeProps> = ({ changeView }) => {
  return (
    <div className="space-y-8 animate-fade-in pb-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-rose-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/30 rounded-full translate-y-1/4 -translate-x-1/4 blur-2xl"></div>
        
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Empowering Your <br/>Health Journey
          </h1>
          <p className="text-rose-100 text-lg md:text-xl mb-8 leading-relaxed opacity-90">
            Early PCOS detection, personalized mentorship, and data-driven insights tailored just for you.
          </p>
          <button 
            onClick={() => changeView(ViewState.DASHBOARD)}
            className="bg-white text-rose-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-rose-50 transition-colors inline-flex items-center gap-2"
          >
            Go to Dashboard <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Assessment Card */}
        <div className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Activity size={120} className="text-rose-500 transform rotate-12" />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-rose-100 text-rose-500 rounded-2xl flex items-center justify-center mb-6">
              <Activity size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Risk Assessment</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Take our comprehensive screening test powered by AI to evaluate potential PCOS risk factors based on your symptoms and history.
            </p>
            <button 
              onClick={() => changeView(ViewState.ASSESSMENT)}
              className="w-full bg-rose-500 text-white py-4 rounded-xl font-semibold hover:bg-rose-600 transition-colors shadow-lg shadow-rose-200 flex items-center justify-center gap-2"
            >
              <Activity size={20} /> Take Assessment Test
            </button>
          </div>
        </div>

        {/* AI Mentor Card */}
        <div className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <MessageCircleHeart size={120} className="text-purple-500 transform -rotate-12" />
          </div>
          <div className="relative z-10">
             <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <MessageCircleHeart size={28} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">AI Mentor</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Chat with Dr. Ova for 24/7 medical guidance, lifestyle tips, and answers to your reproductive health questions.
            </p>
            <button 
              onClick={() => changeView(ViewState.MENTORSHIP)}
              className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200 flex items-center justify-center gap-2"
            >
              <MessageCircleHeart size={20} /> Open AI Mentor
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col items-center text-center">
             <div className="font-bold text-3xl text-slate-800 mb-1">92%</div>
             <div className="text-slate-500 text-sm">Accuracy in screening</div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col items-center text-center">
             <div className="font-bold text-3xl text-slate-800 mb-1">24/7</div>
             <div className="text-slate-500 text-sm">Expert AI Support</div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col items-center text-center">
             <div className="font-bold text-3xl text-slate-800 mb-1">10k+</div>
             <div className="text-slate-500 text-sm">Data points analyzed</div>
          </div>
      </div>
    </div>
  );
};

export default Home;