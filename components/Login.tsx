import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Loader2, X } from 'lucide-react';
import Logo from './Logo';

interface LoginProps {
  onLogin: (user?: {name: string; email:string}) => void; 
  onCancel?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onCancel }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API authentication delay
    setTimeout(() => {
      setLoading(false);
      onLogin({name: formData.name.trim(), email: formData.email.trim()});
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative">
      {onCancel && (
        <button 
          onClick={onCancel}
          className="absolute top-6 left-6 p-2 bg-white rounded-full shadow-sm text-slate-400 hover:text-slate-600 z-50 transition-colors"
          aria-label="Back to Home"
        >
          <X size={24} />
        </button>
      )}

      <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl flex overflow-hidden min-h-[600px]">
        
        {/* Left Side - Visual */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-rose-500 to-purple-600 p-12 flex-col justify-between text-white relative overflow-hidden">
           {/* Abstract shapes */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
           <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/30 rounded-full translate-y-1/4 -translate-x-1/4 blur-2xl"></div>

           <div className="relative z-10">
             <div className="mb-8">
               <Logo variant="white" />
             </div>
             
             <h2 className="text-4xl font-bold mb-6 leading-tight">
               Your Journey to <br/> Better Health <br/> Starts Here.
             </h2>
             <p className="text-rose-100 text-lg opacity-90">
               Join thousands of women empowering their lives with early detection, AI mentorship, and personalized care.
             </p>
           </div>

           <div className="relative z-10">
             <div className="flex items-center gap-4 text-sm font-medium opacity-80">
               <span>Secure</span>
               <span className="w-1 h-1 bg-white rounded-full"></span>
               <span>Private</span>
               <span className="w-1 h-1 bg-white rounded-full"></span>
               <span>Trusted</span>
             </div>
           </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center animate-fade-in">
          <div className="max-w-sm mx-auto w-full">
            <div className="md:hidden flex items-center justify-center mb-8">
               <Logo />
             </div>

            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h3>
            <p className="text-slate-500 mb-8">
              {isLogin ? 'Enter your details to access your dashboard.' : 'Start your personalized health journey today.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                      placeholder="Full Name"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="password" 
                    required
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button type="button" className="text-sm text-rose-500 hover:text-rose-600 font-medium">
                    Forgot Password?
                  </button>
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-rose-200 transition-all transform active:scale-95 flex items-center justify-center gap-2 mt-4"
              >
                {loading ? <Loader2 className="animate-spin" /> : (
                  <>
                    {isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-500 text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-1 text-rose-600 font-bold hover:underline"
                >
                  {isLogin ? 'Sign Up' : 'Log In'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;