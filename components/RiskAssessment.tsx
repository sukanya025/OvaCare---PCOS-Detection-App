import React, { useState } from 'react';
import { AlertCircle, CheckCircle, ChevronRight, Loader2 } from 'lucide-react';
import { RiskAssessmentData, RiskResult } from '../types';
import { assessPCOSRisk } from '../services/geminiService';

const RiskAssessment: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RiskResult | null>(null);
  const [formData, setFormData] = useState<RiskAssessmentData>({
    age: 25,
    bmi: 22,
    cycleLength: 28,
    symptoms: [],
    familyHistory: false,
    stressLevel: 5,
    sleepHours: 7
  });

  const commonSymptoms = [
    "Irregular periods", "Acne", "Excess hair growth (Hirsutism)", 
    "Weight gain", "Hair loss (scalp)", "Darkening of skin"
  ];

  const handleSymptomToggle = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom) 
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const assessment = await assessPCOSRisk(formData);
      setResult(assessment);
    } catch (error) {
      console.error(error);
      alert("Something went wrong with the AI service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="max-w-4xl mx-auto p-4 animate-fade-in">
        <button 
            onClick={() => setResult(null)} 
            className="mb-4 text-sm text-slate-500 hover:text-rose-500 flex items-center gap-1"
        >
            &larr; Start Over
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 md:p-8 bg-gradient-to-r from-rose-50 to-white border-b border-rose-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">PCOS Risk Analysis Result</h2>
                  <p className="text-slate-600">Based on your provided health metrics and symptoms.</p>
               </div>
               <div className={`
                 px-6 py-3 rounded-full font-bold text-lg shadow-sm border
                 ${result.riskLevel === 'High' ? 'bg-red-50 text-red-600 border-red-100' : 
                   result.riskLevel === 'Moderate' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                   'bg-green-50 text-green-600 border-green-100'}
               `}>
                 {result.riskLevel} Risk ({result.riskScore}/100)
               </div>
            </div>
          </div>
          
          <div className="p-6 md:p-8 space-y-8">
            <section>
                <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="text-rose-500" size={20} />
                    Assessment Summary
                </h3>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {result.summary}
                </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8">
                <section>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">Key Recommendations</h3>
                    <ul className="space-y-3">
                        {result.recommendations.map((rec, i) => (
                            <li key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                <span className="bg-rose-100 text-rose-600 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                                <span className="text-slate-700 text-sm">{rec}</span>
                            </li>
                        ))}
                    </ul>
                </section>
                
                <section>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">Doctor-Friendly Report</h3>
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                        <p className="text-xs font-mono text-blue-800 mb-2 uppercase tracking-wider">Clinical Abstract</p>
                        <p className="text-sm text-slate-700 font-medium leading-relaxed">
                            {result.doctorReportSummary}
                        </p>
                        <button className="mt-4 text-xs bg-white text-blue-600 border border-blue-200 px-3 py-1.5 rounded-md font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                            Copy for Physician
                        </button>
                    </div>
                </section>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Early PCOS Risk Detector</h2>
        <p className="text-slate-500 mt-1">Answer a few questions to let our AI analyze potential risk factors.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
        
        {/* Basic Stats */}
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                <input 
                    type="number" 
                    value={formData.age}
                    onChange={e => setFormData({...formData, age: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">BMI (Approx)</label>
                <input 
                    type="number" 
                    value={formData.bmi}
                    onChange={e => setFormData({...formData, bmi: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
            </div>
        </div>

        {/* Cycle */}
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Average Cycle Length (Days)</label>
            <div className="flex items-center gap-4">
                <input 
                    type="range" 
                    min="20" max="60" 
                    value={formData.cycleLength}
                    onChange={e => setFormData({...formData, cycleLength: Number(e.target.value)})}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
                />
                <span className="font-semibold text-slate-700 min-w-[3rem] text-right">{formData.cycleLength} d</span>
            </div>
        </div>

        {/* Symptoms */}
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">Do you experience any of these symptoms?</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {commonSymptoms.map(sym => (
                    <button
                        key={sym}
                        onClick={() => handleSymptomToggle(sym)}
                        className={`
                            text-left px-4 py-3 rounded-xl border transition-all duration-200 flex items-center justify-between
                            ${formData.symptoms.includes(sym) 
                                ? 'bg-rose-50 border-rose-200 text-rose-700 font-medium' 
                                : 'bg-white border-slate-200 text-slate-600 hover:border-rose-200'
                            }
                        `}
                    >
                        {sym}
                        {formData.symptoms.includes(sym) && <CheckCircle size={16} />}
                    </button>
                ))}
            </div>
        </div>

        {/* Lifestyle */}
        <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Daily Stress (1-10)</label>
                <select 
                    value={formData.stressLevel}
                    onChange={e => setFormData({...formData, stressLevel: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none"
                >
                    {[...Array(10)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                </select>
            </div>
            <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Sleep Hours</label>
                 <select 
                    value={formData.sleepHours}
                    onChange={e => setFormData({...formData, sleepHours: Number(e.target.value)})}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none"
                >
                    {[4,5,6,7,8,9,10].map(h => <option key={h} value={h}>{h} hours</option>)}
                </select>
            </div>
        </div>

        <div className="flex items-center gap-2">
            <input 
                type="checkbox" 
                id="history"
                checked={formData.familyHistory}
                onChange={e => setFormData({...formData, familyHistory: e.target.checked})}
                className="w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500"
            />
            <label htmlFor="history" className="text-sm text-slate-700">Immediate family history of PCOS or Diabetes?</label>
        </div>

        <div className="pt-4">
            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-rose-200 transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
                {loading ? <Loader2 className="animate-spin" /> : <>Analyze Risk Profile <ChevronRight /></>}
            </button>
            <p className="text-xs text-slate-400 text-center mt-3 flex items-center justify-center gap-1">
                <AlertCircle size={12} />
                AI Analysis is for informational purposes only, not a medical diagnosis.
            </p>
        </div>

      </div>
    </div>
  );
};

export default RiskAssessment;
