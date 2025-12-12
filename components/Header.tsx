import React from 'react';
import { Menu, User, LogIn } from 'lucide-react';
import Logo from './Logo';
import { UserProfile } from '../types';

interface HeaderProps {
  toggleSidebar: () => void;
  onProfileClick: () => void;
  isAuthenticated: boolean;
  onLoginClick: () => void;
  user: UserProfile;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, onProfileClick, isAuthenticated, onLoginClick, user }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 h-16 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600">
          <Menu size={24} />
        </button>
        <div className="hidden sm:block">
            <Logo />
        </div>
        <div className="sm:hidden">
             {/* Simplified logo for very small screens if needed, or just the full logo */}
             <Logo />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div 
            onClick={onProfileClick}
            className="flex items-center gap-2 pl-4 border-l border-slate-200 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors group"
          >
            <div className="w-9 h-9 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-medium group-hover:bg-purple-200 transition-colors">
              <User size={18} />
            </div>
            <span className="hidden md:block text-sm font-medium text-slate-700 group-hover:text-purple-700">
                {user.firstName} {user.lastName}
            </span>
          </div>
        ) : (
          <button 
            onClick={onLoginClick}
            className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-xl font-semibold transition-all shadow-lg shadow-rose-200 transform active:scale-95 text-sm"
          >
            <LogIn size={18} />
            Login / Sign Up
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;