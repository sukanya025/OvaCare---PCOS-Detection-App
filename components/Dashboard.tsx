import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { Moon, Activity, HeartPulse, Trophy, Plus, X, RefreshCw, Save } from 'lucide-react';
import { generateWorkoutPlan } from '../services/geminiService';
import { WorkoutPlan, UserProfile } from '../types';

interface DashboardProps {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
}

// Initial Mock Data
const INITIAL_SLEEP_DATA = [
  { day: 'Mon', hours: 6.5 },
  { day: 'Tue', hours: 7.2 },
  { day: 'Wed', hours: 5.8 },
  { day: 'Thu', hours: 8.0 },
  { day: 'Fri', hours: 7.5 },
  { day: 'Sat', hours: 9.0 },
  { day: 'Sun', hours: 8.5 },
];

const INITIAL_STRESS_DATA = [
  { day: 'Mon', level: 7 },
  { day: 'Tue', level: 5 },
  { day: 'Wed', level: 8 },
  { day: 'Thu', level: 4 },
  { day: 'Fri', level: 6 },
  { day: 'Sat', level: 2 },
  { day: 'Sun', level: 3 },
];

const INITIAL_WORKOUT_DATA = [
  { day: 'Mon', cal: 320 },
  { day: 'Tue', cal: 450 },
  { day: 'Wed', cal: 200 },
  { day: 'Thu', cal: 0 },
  { day: 'Fri', cal: 500 },
  { day: 'Sat', cal: 600 },
  { day: 'Sun', cal: 150 },
];

const riskData = [
  { name: 'Low Risk', value: 30 },
  { name: 'Risk Score', value: 70 },
];

const COLORS = ['#e2e8f0', '#f43f5e'];

const Dashboard: React.FC<DashboardProps> = ({ user, onUpdateUser }) => {
  // Data States
  const [sleepData, setSleepData] = useState(INITIAL_SLEEP_DATA);
  const [stressData, setStressData] = useState(INITIAL_STRESS_DATA);
  const [workoutData, setWorkoutData] = useState(INITIAL_WORKOUT_DATA);

  // Workout Plan States
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Modal States
  const [activeModal, setActiveModal] = useState<'sleep' | 'stress' | 'workout' | null>(null);
  
  // Form States
  const [entryForm, setEntryForm] = useState({ day: 'Today', value: '' });

  useEffect(() => {
    fetchPlan();
  }, [user.age, user.activityLevel]); // Refetch if user profile significantly changes

  const fetchPlan = async () => {
    setLoadingPlan(true);
    const plan = await generateWorkoutPlan(user.age, user.activityLevel); 
    setWorkoutPlan(plan);
    setLoadingPlan(false);
    setIsEditingProfile(false);
  };

  const handleAddEntry = (type: 'sleep' | 'stress' | 'workout') => {
    const val = Number(entryForm.value);
    if (!entryForm.day || isNaN(val)) return;

    if (type === 'sleep') {
      setSleepData(prev => [...prev.slice(1), { day: entryForm.day, hours: val }]);
    } else if (type === 'stress') {
      setStressData(prev => [...prev.slice(1), { day: entryForm.day, level: Math.min(10, Math.max(1, val)) }]);
    } else if (type === 'workout') {
      setWorkoutData(prev => [...prev.slice(1), { day: entryForm.day, cal: val }]);
    }

    setActiveModal(null);
    setEntryForm({ day: 'Today', value: '' });
  };

  const ModalOverlay = ({ title, label, type, max }: { title: string, label: string, type: 'sleep' | 'stress' | 'workout', max?: number }) => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <button onClick={() => setActiveModal(null)} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Day Label</label>
            <input 
              type="text" 
              value={entryForm.day} 
              onChange={e => setEntryForm({...entryForm, day: e.target.value})}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
            <input 
              type="number" 
              max={max}
              value={entryForm.value} 
              onChange={e => setEntryForm({...entryForm, value: e.target.value})}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
            />
          </div>
          <button 
            onClick={() => handleAddEntry(type)}
            className="w-full bg-rose-500 text-white font-semibold py-2 rounded-lg hover:bg-rose-600 transition-colors"
          >
            Save Entry
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in relative">
      
      {/* Modals */}
      {activeModal === 'sleep' && <ModalOverlay title="Log Sleep" label="Hours Slept" type="sleep" max={24} />}
      {activeModal === 'stress' && <ModalOverlay title="Log Stress" label="Stress Level (1-10)" type="stress" max={10} />}
      {activeModal === 'workout' && <ModalOverlay title="Log Workout" label="Calories Burned" type="workout" />}

      {/* Top Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Risk Score Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-rose-200 transition-all">
          <div className="flex justify-between items-start mb-4">
             <div>
                <h3 className="text-slate-500 text-sm font-medium">Current Risk Score</h3>
                <p className="text-3xl font-bold text-slate-800">Moderate</p>
             </div>
             <div className="bg-rose-100 p-2 rounded-lg text-rose-500">
                <HeartPulse size={20} />
             </div>
          </div>
          <div className="h-32 w-full flex items-center justify-center">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="80%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute top-[65%] left-1/2 transform -translate-x-1/2 text-xl font-bold text-slate-700">70%</div>
          </div>
          <p className="text-xs text-center text-slate-400 mt-[-20px]">Based on recent analysis</p>
        </div>

        {/* Sleep Score Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative group">
           <div className="flex justify-between items-start mb-4">
             <div>
                <h3 className="text-slate-500 text-sm font-medium">Avg. Sleep</h3>
                <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-slate-800">
                        {(sleepData.reduce((acc, curr) => acc + curr.hours, 0) / sleepData.length).toFixed(1)}
                    </p>
                    <span className="text-sm font-normal text-slate-400">hrs</span>
                </div>
             </div>
             <button 
                onClick={() => setActiveModal('sleep')}
                className="bg-indigo-50 hover:bg-indigo-100 p-2 rounded-lg text-indigo-500 transition-colors"
             >
                <Plus size={20} />
             </button>
          </div>
           <div className="h-32">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={sleepData}>
                 <Bar dataKey="hours" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
                 <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Stress Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative group">
           <div className="flex justify-between items-start mb-4">
             <div>
                <h3 className="text-slate-500 text-sm font-medium">Stress Level</h3>
                <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-slate-800">
                        {stressData[stressData.length - 1].level > 5 ? 'High' : 'Low'}
                    </p>
                    <span className="text-sm font-normal text-slate-400">(Avg)</span>
                </div>
             </div>
             <button 
                onClick={() => setActiveModal('stress')}
                className="bg-amber-50 hover:bg-amber-100 p-2 rounded-lg text-amber-500 transition-colors"
             >
                <Plus size={20} />
             </button>
          </div>
           <div className="h-32">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={stressData}>
                 <defs>
                   <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <Area type="monotone" dataKey="level" stroke="#f59e0b" fillOpacity={1} fill="url(#colorStress)" strokeWidth={2} />
                 <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Workout & Planner Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Workout Tracker Graph */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-800">Workout Tracker</h3>
                    <p className="text-sm text-slate-500">Calories burned this week</p>
                </div>
                <div className="flex gap-2 items-center">
                    <button 
                        onClick={() => setActiveModal('workout')}
                        className="flex items-center gap-1 text-xs px-3 py-1 bg-rose-50 text-rose-600 rounded-full font-medium hover:bg-rose-100"
                    >
                        <Plus size={14} /> Log Workout
                    </button>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={workoutData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                        <Line type="monotone" dataKey="cal" stroke="#f43f5e" strokeWidth={3} dot={{r: 4, fill: '#f43f5e', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
                    </LineChart>
                </ResponsiveContainer>
              </div>
          </div>

          {/* AI Workout Planner */}
          <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-6 rounded-2xl border border-rose-100 flex flex-col">
             <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-2">
                     <div className="bg-rose-500 text-white p-1.5 rounded-lg"><Trophy size={16} /></div>
                     <h3 className="font-bold text-slate-800">Your AI Plan</h3>
                 </div>
                 <button 
                    onClick={() => setIsEditingProfile(!isEditingProfile)}
                    className="text-rose-400 hover:text-rose-600 p-1"
                 >
                    {isEditingProfile ? <X size={18}/> : <RefreshCw size={18} />}
                 </button>
             </div>

             {isEditingProfile ? (
                 <div className="flex-1 space-y-3 animate-fade-in bg-white/50 p-4 rounded-xl">
                     <h4 className="text-sm font-semibold text-slate-700">Update Profile</h4>
                     <div>
                         <label className="text-xs text-slate-500">Age</label>
                         <input 
                            type="number" 
                            value={user.age}
                            onChange={e => onUpdateUser({...user, age: Number(e.target.value)})}
                            className="w-full text-sm p-2 rounded border border-rose-200"
                         />
                     </div>
                     <div>
                         <label className="text-xs text-slate-500">Activity Level</label>
                         <select 
                            value={user.activityLevel}
                            onChange={e => onUpdateUser({...user, activityLevel: e.target.value as any})}
                            className="w-full text-sm p-2 rounded border border-rose-200"
                         >
                             <option value="Sedentary">Sedentary</option>
                             <option value="Moderate">Moderate</option>
                             <option value="Active">Active</option>
                         </select>
                     </div>
                     <button 
                        onClick={fetchPlan}
                        className="w-full bg-rose-500 text-white py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 mt-2"
                     >
                        <Save size={14} /> Generate Plan
                     </button>
                 </div>
             ) : (
                 <div className="flex-1">
                     {loadingPlan ? (
                         <div className="h-full flex flex-col items-center justify-center text-rose-400 gap-2 animate-pulse">
                             <RefreshCw className="animate-spin" />
                             <span className="text-sm">Creating personalized plan...</span>
                         </div>
                     ) : workoutPlan ? (
                         <div className="space-y-4">
                             <div className="flex justify-between items-end border-b border-rose-200/50 pb-2">
                                <div className="text-xs font-semibold text-rose-600 uppercase tracking-wider">
                                    Focus: {workoutPlan.focus}
                                </div>
                                <span className="text-[10px] text-rose-400 bg-white px-2 py-0.5 rounded-full border border-rose-100">
                                    Age: {user.age}
                                </span>
                             </div>
                             
                             <div className="space-y-3">
                                {workoutPlan.exercises.slice(0, 4).map((ex, i) => (
                                    <div key={i} className="bg-white p-3 rounded-xl shadow-sm border border-rose-100/50 flex justify-between items-center group hover:border-rose-200 transition-all">
                                        <div>
                                            <p className="font-medium text-slate-800 text-sm group-hover:text-rose-600 transition-colors">{ex.name}</p>
                                            <p className="text-xs text-slate-500">{ex.intensity}</p>
                                        </div>
                                        <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded-md whitespace-nowrap">{ex.duration}</span>
                                    </div>
                                ))}
                             </div>
                             
                             <div className="pt-2">
                                <button className="w-full py-2 bg-white text-rose-600 border border-rose-200 rounded-lg text-sm font-semibold hover:bg-rose-50 transition-colors">
                                    View Full Schedule
                                </button>
                             </div>
                         </div>
                     ) : (
                         <p className="text-sm text-slate-500 text-center mt-10">Plan not available.</p>
                     )}
                 </div>
             )}
          </div>
      </div>

    </div>
  );
};

export default Dashboard;