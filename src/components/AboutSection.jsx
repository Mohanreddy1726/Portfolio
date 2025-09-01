import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Users, Award, Code, Heart } from 'lucide-react';
import { aboutData, profileData } from '../data/mock';

const StatCounter = ({ end, label, icon: Icon, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const increment = end / (duration / 50);
          
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 50);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div 
      ref={ref}
      className="text-center p-6 bg-white/60 backdrop-blur rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
        <Icon className="w-8 h-8 text-blue-600" />
      </div>
      <div className="text-3xl font-bold text-slate-800 mb-2">{count}+</div>
      <div className="text-slate-600 font-medium">{label}</div>
    </div>
  );
};

const SkillBubble = ({ skill, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ease-out ${
        isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}
    >
      <Badge 
        variant="secondary" 
        className="px-4 py-2 text-sm bg-slate-100 hover:bg-blue-100 transition-colors duration-300 cursor-pointer"
      >
        {skill}
      </Badge>
    </div>
  );
};

const AboutSection = () => {
  const [activeHighlight, setActiveHighlight] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHighlight(prev => (prev + 1) % aboutData.highlights.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const skills = [
    "React", "Node.js", "JavaScript", "TypeScript", "Tailwind CSS", "Express.js", 
    "MongoDB", "REST Api's", "Figma", "UI/UX"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-slate-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Image and Stats */}
          <div className="space-y-8">
            {/* 3D Profile Image */}
            <div className="relative group">
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-2xl transform group-hover:scale-105 transition-all duration-500 hover:rotate-1">
                  <img 
                    src={profileData.profileImage}
                    alt={profileData.name}
                    className="w-full h-full object-cover rounded-xl"
                    onLoad={() => setImageLoaded(true)}
                  />
                  <div className="absolute -bottom-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Available for hire
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <StatCounter end={5} label="Projects" icon={Code} />
              <StatCounter end={2} label="Years Experience" icon={Award} delay={200} />
              <StatCounter end={20} label="Skills Acquired" icon={Users} delay={400} />
              <StatCounter end={5} label="Softwares/Tools Used" icon={Heart} delay={600} />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            {/* Description */}
            <div className="prose prose-lg">
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                {aboutData.description}
              </p>
              <p className="text-slate-500 leading-relaxed">
                {aboutData.bio}
              </p>
            </div>

            {/* Highlights */}
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-4">Key Achievements</h3>
                <div className="space-y-3">
                  {aboutData.highlights.map((highlight, index) => (
                    <div 
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-300 ${
                        activeHighlight === index 
                          ? 'bg-blue-50 border-l-4 border-blue-500 transform scale-105' 
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                      <p className="text-slate-700">{highlight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills Bubbles */}
            <div>
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <SkillBubble key={skill} skill={skill} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        {/* <div className="text-center bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-slate-800 mb-4">
            Ready to build something amazing?
          </h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            I'm always excited to take on new challenges and collaborate with passionate teams. 
            Let's discuss how we can bring your ideas to life.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg">
              Let's Talk
            </button>
            <button className="border-2 border-slate-300 hover:border-blue-500 text-slate-700 px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300">
              Download Resume
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default AboutSection;