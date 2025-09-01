import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowDown, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { profileData } from '../data/mock';

const ParticleBackground = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute bg-blue-400 rounded-full animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `float ${particle.speed + 3}s ease-in-out infinite alternate`
          }}
        />
      ))}
    </div>
  );
};

const TypewriterText = ({ text, className, startDelay = 0, typingSpeed = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev < text.length) {
            setDisplayText(text.slice(0, prev + 1));
            return prev + 1;
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, typingSpeed);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
    };
  }, [text, startDelay, typingSpeed]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const FloatingElement = ({ children, className, delay = 0 }) => {
  return (
    <div 
      className={`${className} transform transition-all duration-1000 ease-out`}
      style={{
        animation: `float 6s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );
};

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden flex items-center justify-center">
      <ParticleBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <FloatingElement className="mb-8">
          <div className="relative inline-block">
            <div 
              className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-blue-200 overflow-hidden shadow-2xl transform"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`
              }}
            >
              <img 
                src={profileData.profileImage} 
                alt={profileData.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white animate-ping"></div>
          </div>
        </FloatingElement>

        <FloatingElement delay={0.5} className="mb-4">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
            <TypewriterText text={profileData.name} typingSpeed={100} />
          </h1>
        </FloatingElement>

        <FloatingElement delay={0.5} className="mb-6">
          <h2 className="text-2xl md:text-4xl text-slate-600 font-light">
            <TypewriterText text={profileData.title} startDelay={1500} typingSpeed={100} />
          </h2>
        </FloatingElement>

        <FloatingElement delay={1.5} className="mb-8">
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            <TypewriterText text={profileData.tagline} startDelay={3000} typingSpeed={100} />
          </p>
        </FloatingElement>

        <FloatingElement delay={2} className="mb-12">
          <div className="flex items-center justify-center gap-2 text-slate-500 mb-8">
            <MapPin className="w-5 h-5" />
            <span>{profileData.location}</span>
          </div>
          
          <div className="flex gap-4 justify-center">
            {/* <Button  
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Mail className="w-5 h-5 mr-2" />
              Get In Touch
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-slate-300 hover:border-blue-500 px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300"
            >
              <Github className="w-5 h-5 mr-2" />
              View Work
            </Button> */}
            <Button
  size="lg"
  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
  onClick={() => window.location.href = 'mailto:naradamohan1@gmail.com'}
>
  <Mail className="w-5 h-5 mr-2" />
  Get In Touch
</Button>

<Button 
  variant="outline"
  size="lg"
  className="border-2 border-slate-300 hover:border-blue-500 px-8 py-3 rounded-full transform hover:scale-105 transition-all duration-300"
  onClick={() => window.open('https://github.com/Mohanreddy1726', '_blank')}
>
  <Github className="w-5 h-5 mr-2" />
  View Work
</Button>

          </div>
        </FloatingElement>

        <FloatingElement delay={2.5} className="mb-16">
          <div className="flex gap-6 justify-center">
            <a 
              href={profileData.social.github}
              className="p-3 bg-white/80 backdrop-blur rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            >
              <Github className="w-6 h-6 text-slate-700" />
            </a>
            <a 
              href={profileData.social.linkedin}
              className="p-3 bg-white/80 backdrop-blur rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            >
              <Linkedin className="w-6 h-6 text-slate-700" />
            </a>
            <a 
              href={`mailto:${profileData.email}`}
              className="p-3 bg-white/80 backdrop-blur rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
            >
              <Mail className="w-6 h-6 text-slate-700" />
            </a>
          </div>
        </FloatingElement>

        <div 
          onClick={scrollToNext}
          className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
        >
          <div className="p-3 bg-white/80 backdrop-blur rounded-full shadow-lg">
            <ArrowDown className="w-6 h-6 text-slate-700" />
          </div>
        </div>
      </div>

      {/* Floating Decorations */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-lg transform rotate-12 animate-pulse opacity-20"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-green-200 rounded-full animate-bounce opacity-30"></div>
      <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-slate-300 transform rotate-45 animate-spin opacity-20" style={{animationDuration: '8s'}}></div>
      <div className="absolute bottom-20 right-1/3 w-24 h-24 border-4 border-blue-300 rounded-full animate-pulse opacity-25"></div>
    </section>
  );
};

export default HeroSection;

// Custom animations for CSS
const styles = `
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
