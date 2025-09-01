import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X, Home, User, Briefcase, FolderOpen, Zap, Award, Mail, ChevronDown } from 'lucide-react';
import { profileData } from '../data/mock';

const Navigation = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isHovered, setIsHovered] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id);
      let current = 'hero';

      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = sectionId;
          }
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg shadow-lg border-b border-slate-200/50 transition-all duration-500 ease-out">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3 transform transition-all duration-500 scale-100">
              <div className="w-10 h-10 rounded-full border-2 border-blue-500 shadow-md overflow-hidden transition-all duration-500">
                <img 
                  src={profileData.profileImage} 
                  alt={profileData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-bold text-lg text-slate-800 transition-all duration-500">
                {profileData.name.split(' ')[0]}
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <div 
                className="flex items-center gap-1 p-2 rounded-full bg-slate-100/80 transition-all duration-500"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {navItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform ${
                      activeSection === item.id
                        ? 'bg-blue-600 text-white shadow-md scale-105'
                        : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                    } hover:scale-105`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className={`w-4 h-4 transition-all duration-300 ${
                        activeSection === item.id ? 'rotate-12' : 'group-hover:rotate-12'
                      }`} />
                      <span className={`transition-all duration-500 ${
                        isHovered || activeSection === item.id ? 'opacity-100' : 'md:opacity-0 md:w-0 md:overflow-hidden'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                    {activeSection === item.id && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                        <div className="w-1 h-1 rounded-full bg-white animate-pulse"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300"
              >
                <div className="relative w-6 h-6">
                  <Menu className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${isMobileOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
                  <X className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${isMobileOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-180'}`} />
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-500 ease-out overflow-hidden ${isMobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white/95 backdrop-blur-lg border-t border-slate-200/50 shadow-lg">
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`group flex items-center gap-3 w-full px-4 py-3 rounded-lg text-left transition-all duration-300 transform ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white shadow-md scale-105'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50 hover:scale-105'
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    transform: isMobileOpen ? 'translateY(0)' : 'translateY(-10px)',
                    opacity: isMobileOpen ? 1 : 0
                  }}
                >
                  <item.icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                  <span className="font-medium">{item.label}</span>
                  <ChevronDown className={`w-4 h-4 ml-auto transition-transform duration-300 ${
                    activeSection === item.id ? 'rotate-180' : 'group-hover:rotate-90'
                  }`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="h-16"></div>

      {/* Floating Nav Dots (Right Side) */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col gap-3">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`group relative w-3 h-3 rounded-full transition-all duration-300 transform ${
                activeSection === item.id
                  ? 'bg-blue-600 scale-150 shadow-lg'
                  : 'bg-slate-300 hover:bg-blue-400 hover:scale-125'
              }`}
              title={item.label}
            >
              <div className={`absolute right-6 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-slate-800 text-white text-sm rounded-lg whitespace-nowrap transition-all duration-300 ${
                activeSection === item.id 
                  ? 'opacity-100 scale-100 translate-x-0' 
                  : 'opacity-0 scale-95 translate-x-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0'
              }`}>
                {item.label}
                <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-0 h-0 border-l-4 border-l-slate-800 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

// Custom animation styles
const styles = `
@keyframes slideInFromTop {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slideInFromTop 0.8s ease-out;
}

@keyframes float-nav {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.animate-float-nav {
  animation: float-nav 3s ease-in-out infinite;
}
`;

if (typeof document !== 'undefined') {
  const existingStyle = document.querySelector('style[data-nav-styles]');
  if (!existingStyle) {
    const styleSheet = document.createElement('style');
    styleSheet.setAttribute('data-nav-styles', 'true');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }
}

export default Navigation;
