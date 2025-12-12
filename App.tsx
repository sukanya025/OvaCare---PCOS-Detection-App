import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import RiskAssessment from './components/RiskAssessment';
import MentorshipChat from './components/MentorshipChat';
import Education from './components/Education';
import Login from './components/Login';
import Profile from './components/Profile';
import { ViewState, UserProfile } from './types';

const DEFAULT_USER: UserProfile = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane.doe@example.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, USA',
  age: 25,
  height: 165,
  weight: 60,
  bloodType: 'A+',
  cycleLength: 28,
  cycleRegularity: 'Regular',
  activityLevel: 'Moderate'
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Lifted User State
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);

  const handleLogin = (loginData?: {name: string, email: string}) => {
    if (loginData) {
      const names = loginData.name.split(' ');
      setUser(prev => ({
        ...prev,
        firstName: names[0] || prev.firstName,
        lastName: names.slice(1).join(' ') || prev.lastName,
        email: loginData.email || prev.email
      }));
    }
    setIsAuthenticated(true);
    setShowLogin(false);
    setCurrentView(ViewState.DASHBOARD);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView(ViewState.HOME);
  };

  const updateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <Home changeView={setCurrentView} />;
      case ViewState.DASHBOARD:
        return <Dashboard user={user} onUpdateUser={updateUser} />;
      case ViewState.ASSESSMENT:
        return <RiskAssessment />;
      case ViewState.MENTORSHIP:
        return <MentorshipChat />;
      case ViewState.EDUCATION:
        return <Education />;
      case ViewState.PROFILE:
        return <Profile user={user} onUpdate={updateUser} />;
      case ViewState.SETTINGS:
        return (
            <div className="p-8 text-center text-slate-400">
                <h2 className="text-xl font-bold text-slate-600 mb-4">Settings</h2>
                {isAuthenticated ? (
                  <button 
                      onClick={handleLogout}
                      className="px-6 py-2 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 font-medium"
                  >
                      Log Out
                  </button>
                ) : (
                  <p>Please log in to access settings.</p>
                )}
            </div>
        );
      default:
        return <Home changeView={setCurrentView} />;
    }
  };

  if (showLogin) {
    return <Login onLogin={handleLogin} onCancel={() => setShowLogin(false)} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        changeView={setCurrentView} 
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          onProfileClick={() => setCurrentView(ViewState.PROFILE)}
          isAuthenticated={isAuthenticated}
          onLoginClick={() => setShowLogin(true)}
          user={user}
        />
        
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto h-full">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;