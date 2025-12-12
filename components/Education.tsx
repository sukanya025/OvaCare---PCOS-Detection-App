import React from 'react';
import { FileText, ExternalLink, Globe, Users } from 'lucide-react';

const Education: React.FC = () => {
  const articles = [
    {
      title: "Understanding Insulin Resistance in PCOS",
      category: "Medical Research",
      readTime: "5 min read",
      summary: "A deep dive into how metabolic health affects hormonal balance and actionable dietary changes."
    },
    {
      title: "The Role of Stress on Cortisol Levels",
      category: "Mental Health",
      readTime: "3 min read",
      summary: "How chronic stress exacerbates PCOS symptoms and techniques for management."
    },
    {
      title: "Global Women's Health Dataset 2024",
      category: "Data Insights",
      readTime: "Dataset",
      summary: "Anonymized aggregate data showing trends in PCOS diagnoses across varying demographics."
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
        <div className="bg-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-2">Community Insights & Data</h2>
                <p className="text-indigo-100 max-w-xl">
                    Access real-world women's health datasets and medical research to understand patterns and risk factors in your region.
                </p>
            </div>
            <Globe className="absolute right-0 bottom-0 text-indigo-500 opacity-20 transform translate-x-1/4 translate-y-1/4" size={240} />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                    <Users className="text-rose-500" />
                    <h3 className="font-bold text-slate-800">Community Patterns</h3>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                        <span className="text-slate-600">Prevalence in Age 20-30</span>
                        <span className="font-bold text-slate-800">12%</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                        <span className="text-slate-600">Top Reported Symptom</span>
                        <span className="font-bold text-slate-800">Irregular Cycle</span>
                    </div>
                    <div className="flex justify-between items-center text-sm pb-2">
                        <span className="text-slate-600">Avg. Diagnosis Time</span>
                        <span className="font-bold text-slate-800">2.5 Years</span>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                 <div className="flex items-center gap-2 mb-4">
                    <FileText className="text-teal-600" />
                    <h3 className="font-bold text-slate-800">Latest Research</h3>
                </div>
                <div className="space-y-4">
                     {articles.map((article, i) => (
                         <div key={i} className="group cursor-pointer">
                             <h4 className="font-semibold text-slate-800 group-hover:text-rose-500 transition-colors flex items-center justify-between">
                                 {article.title}
                                 <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                             </h4>
                             <p className="text-xs text-slate-500 mt-1 line-clamp-2">{article.summary}</p>
                             <div className="flex gap-2 mt-2">
                                 <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-600">{article.category}</span>
                                 <span className="text-[10px] text-slate-400">{article.readTime}</span>
                             </div>
                         </div>
                     ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Education;
