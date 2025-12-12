import React from 'react';
import { LayoutDashboard, Activity, MessageCircleHeart, BookOpen, Settings, X, Home } from 'lucide-react';
import { ViewState } from '../types';
import Logo from './Logo';

interface SidebarProps {
  currentView: ViewState;
  changeView: (view: ViewState) => void;
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, changeView, isOpen, closeSidebar }) => {
  const menuItems = [
    { id: ViewState.HOME, label: 'Home', icon: Home },
    { id: ViewState.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: ViewState.ASSESSMENT, label: 'Risk Assessment', icon: Activity },
    { id: ViewState.MENTORSHIP, label: 'AI Mentor', icon: MessageCircleHeart },
    { id: ViewState.EDUCATION, label: 'Health Insights', icon: BookOpen },
    { id: ViewState.SETTINGS, label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:relative lg:translate-x-0 lg:z-0
      `}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100 lg:hidden">
          <div className="scale-90 origin-left">
            <Logo />
          </div>
          <button onClick={closeSidebar} className="text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  changeView(item.id);
                  closeSidebar();
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-rose-50 text-rose-600 font-semibold shadow-sm' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }
                `}
              >
                <Icon size={20} className={isActive ? 'text-rose-500' : 'text-slate-400'} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;