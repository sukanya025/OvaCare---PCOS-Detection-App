import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, Activity, Calendar, Heart } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileProps {
  user: UserProfile;
  onUpdate: (user: UserProfile) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Local state for the form
  const [formData, setFormData] = useState<UserProfile>(user);

  // Sync local state if prop changes (e.g. external update)
  useEffect(() => {
    setFormData(user);
  }, [user]);

  const bmi = (formData.weight / ((formData.height / 100) ** 2)).toFixed(1);

  const handleSave = () => {
    setLoading(true);
    // Simulate API call and update parent state
    setTimeout(() => {
      onUpdate(formData);
      setLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  const handleCancel = () => {
    setFormData(user); // Reset to original
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-rose-400 to-purple-500 opacity-90 z-0"></div>
         
         <div className="relative z-10 mt-12 md:mt-8 group">
            <div className="w-28 h-28 rounded-full bg-white p-1 shadow-lg">
                <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden relative">
                    <User size={48} />
                    {isEditing && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer transition-opacity opacity-0 group-hover:opacity-100">
                            <Camera className="text-white" size={24} />
                        </div>
                    )}
                </div>
            </div>
         </div>

         <div className="relative z-10 flex-1 text-center md:text-left pt-0 md:pt-8">
            <h1 className="text-2xl font-bold text-slate-800">{formData.firstName} {formData.lastName}</h1>
            <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Active Member
            </p>
         </div>

         <div className="relative z-10 pt-0 md:pt-8">
            {isEditing ? (
                <div className="flex gap-2">
                    <button 
                        onClick={handleCancel}
                        className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSave}
                        className="px-4 py-2 text-white bg-rose-500 hover:bg-rose-600 rounded-xl font-medium shadow-lg shadow-rose-200 transition-colors flex items-center gap-2"
                    >
                        {loading ? 'Saving...' : <><Save size={18} /> Save Changes</>}
                    </button>
                </div>
            ) : (
                <button 
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 text-slate-600 border border-slate-200 hover:border-rose-300 hover:text-rose-500 rounded-xl font-medium transition-colors"
                >
                    Edit Profile
                </button>
            )}
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Personal Info */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <User className="text-rose-500" size={20} /> Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase">First Name</label>
                    <input 
                        disabled={!isEditing}
                        value={formData.firstName}
                        onChange={e => setFormData({...formData, firstName: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:bg-white disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase">Last Name</label>
                    <input 
                        disabled={!isEditing}
                        value={formData.lastName}
                        onChange={e => setFormData({...formData, lastName: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:bg-white disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1"><Mail size={12}/> Email</label>
                    <input 
                        disabled={!isEditing}
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:bg-white disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1"><Phone size={12}/> Phone</label>
                    <input 
                        disabled={!isEditing}
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:bg-white disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                </div>
                 <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1"><MapPin size={12}/> Location</label>
                    <input 
                        disabled={!isEditing}
                        value={formData.location}
                        onChange={e => setFormData({...formData, location: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:bg-white disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                </div>
            </div>
        </div>

        {/* Health Metrics */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Activity className="text-purple-500" size={20} /> Health Metrics
            </h3>

            <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3">
                         <div className="bg-white p-2 rounded-lg text-rose-500 shadow-sm"><Heart size={16}/></div>
                         <div>
                            <p className="text-xs text-slate-500">BMI Score</p>
                            <p className="font-bold text-slate-800">{bmi}</p>
                         </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${Number(bmi) < 25 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {Number(bmi) < 25 ? 'Normal' : 'Monitor'}
                    </span>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500">Age</label>
                    <input 
                        type="number"
                        disabled={!isEditing}
                        value={formData.age}
                        onChange={e => setFormData({...formData, age: Number(e.target.value)})}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm disabled:bg-slate-50"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-500">Height (cm)</label>
                        <input 
                            type="number"
                            disabled={!isEditing}
                            value={formData.height}
                            onChange={e => setFormData({...formData, height: Number(e.target.value)})}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm disabled:bg-slate-50"
                        />
                    </div>
                     <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-500">Weight (kg)</label>
                        <input 
                            type="number"
                            disabled={!isEditing}
                            value={formData.weight}
                            onChange={e => setFormData({...formData, weight: Number(e.target.value)})}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm disabled:bg-slate-50"
                        />
                    </div>
                </div>

                 <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 flex items-center gap-1"><Calendar size={12}/> Avg. Cycle Length</label>
                    <select
                        disabled={!isEditing}
                        value={formData.cycleLength}
                        onChange={e => setFormData({...formData, cycleLength: Number(e.target.value)})}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm disabled:bg-slate-50"
                    >
                        {[26,27,28,29,30,31,32,33,34,35].map(d => (
                            <option key={d} value={d}>{d} Days</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500">Activity Level</label>
                    <select
                        disabled={!isEditing}
                        value={formData.activityLevel}
                        onChange={e => setFormData({...formData, activityLevel: e.target.value as any})}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm disabled:bg-slate-50"
                    >
                        <option value="Sedentary">Sedentary</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Active">Active</option>
                    </select>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;