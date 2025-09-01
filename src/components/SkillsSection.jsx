import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Code, Database, Cloud, Palette, Brain, Settings } from 'lucide-react';
import { skillsData } from '../data/mock';

const SkillCategory = ({ category, skills, icon: Icon, color }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <Card className="h-full bg-white/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
        <CardContent className="p-6">
          {/* Category Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 ${color} rounded-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">{category}</h3>
          </div>

          {/* Skills List */}
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-700">{skill.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {skill.level}%
                  </Badge>
                </div>
                <div className="relative">
                  <Progress 
                    value={isVisible ? skill.level : 0} 
                    className="h-2"
                    style={{
                      transition: `all 1s ease-out ${index * 200}ms`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SkillBubbleCloud = ({ skills }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  const getRandomPosition = (index) => ({
    top: `${20 + (index * 137) % 60}%`,
    left: `${10 + (index * 73) % 80}%`,
    animationDelay: `${index * 0.2}s`
  });

  const getSizeByLevel = (level) => {
    if (level >= 90) return 'text-2xl px-6 py-3';
    if (level >= 80) return 'text-xl px-5 py-2.5';
    if (level >= 70) return 'text-lg px-4 py-2';
    return 'text-base px-3 py-1.5';
  };

  return (
    <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl overflow-hidden">
      {skills.map((skill, index) => (
        <div
          key={skill.name}
          className="absolute animate-float cursor-pointer transition-all duration-300 transform hover:scale-110"
          style={getRandomPosition(index)}
          onMouseEnter={() => setHoveredSkill(skill)}
          onMouseLeave={() => setHoveredSkill(null)}
        >
          <Badge 
            className={`${getSizeByLevel(skill.level)} bg-white/80 backdrop-blur text-slate-700 font-medium shadow-lg hover:shadow-xl border-0 hover:bg-blue-100 transition-all duration-300`}
          >
            {skill.name}
          </Badge>
        </div>
      ))}
      
      {/* Skill Details Popup */}
      {hoveredSkill && (
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg p-4 shadow-xl border">
          <h4 className="font-bold text-slate-800">{hoveredSkill.name}</h4>
          <p className="text-sm text-slate-600 mb-2">{hoveredSkill.category}</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${hoveredSkill.level}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-slate-700">{hoveredSkill.level}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

const SkillsSection = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'cloud'
  
  const categoryConfig = {
    Frontend: { icon: Code, color: 'bg-blue-500' },
    Backend: { icon: Database, color: 'bg-green-500' },
    DevOps: { icon: Cloud, color: 'bg-purple-500' },
    Database: { icon: Settings, color: 'bg-orange-500' },
    AI: { icon: Brain, color: 'bg-pink-500' },
    Design: { icon: Palette, color: 'bg-indigo-500' },
    Language: { icon: Code, color: 'bg-red-500' },
    API: { icon: Settings, color: 'bg-teal-500' }
  };

  const skillsByCategory = skillsData.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
            Technical <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            A comprehensive overview of my technical expertise across various domains and technologies.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-1 shadow-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('cloud')}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                viewMode === 'cloud'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Skill Cloud
            </button>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'grid' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {Object.entries(skillsByCategory).map(([category, skills]) => {
              const config = categoryConfig[category] || { icon: Code, color: 'bg-slate-500' };
              return (
                <SkillCategory
                  key={category}
                  category={category}
                  skills={skills}
                  icon={config.icon}
                  color={config.color}
                />
              );
            })}
          </div>
        ) : (
          <div className="mb-16">
            <SkillBubbleCloud skills={skillsData} />
          </div>
        )}

        {/* Skills Summary */}
        <div className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center text-slate-800 mb-8">Skill Proficiency Overview</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">90%+</div>
              <div className="text-slate-600 font-medium mb-1">Expert Level</div>
              <div className="text-sm text-slate-500">MongoDB Node.js, Express.js</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">80%+</div>
              <div className="text-slate-600 font-medium mb-1">Advanced Level</div>
              <div className="text-sm text-slate-500">React,TypeScript,Tailwind CSS</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">70%+</div>
              <div className="text-slate-600 font-medium mb-1">Proficient Level</div>
              <div className="text-sm text-slate-500">JavaScript Figma</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Add custom CSS animation
const styles = `
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const existingStyle = document.querySelector('style[data-skills-styles]');
  if (!existingStyle) {
    const styleSheet = document.createElement('style');
    styleSheet.setAttribute('data-skills-styles', 'true');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }
}

export default SkillsSection;