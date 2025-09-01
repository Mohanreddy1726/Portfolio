import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Calendar, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';
import { experienceData } from '../data/mock';

const TimelineItem = ({ experience, index, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 200);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className={`relative transform transition-all duration-700 ease-out ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
      }`}
    >
      <div className="absolute left-6 top-20 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-green-500 opacity-30">
        {!isLast && <div className="w-full h-full"></div>}
      </div>

      <div className="absolute left-4 top-16 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10 animate-pulse"></div>

      <div className="ml-16 mb-8">
        <Card className="bg-white/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
          <CardHeader onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center text-2xl font-bold shadow-md">
                  {experience.logo}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{experience.position}</h3>
                  <h4 className="text-lg text-blue-600 font-semibold mb-2">{experience.company}</h4>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {experience.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {experience.location}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {experience.type}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-blue-500 hover:text-blue-700 transition-colors">
                {isExpanded ? <ChevronDown className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
              </div>
            </div>
          </CardHeader>

          <CardContent className={`transition-all duration-300 overflow-hidden ${
            isExpanded ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'
          }`}>
            <div className="space-y-6">
              <p className="text-slate-600 leading-relaxed">{experience.description}</p>

              <div>
                <h5 className="font-semibold text-slate-800 mb-3">Key Achievements</h5>
                <div className="grid gap-2">
                  {experience.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-700 text-sm">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-slate-800 mb-3">Technologies Used</h5>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, idx) => (
                    <Badge 
                      key={idx}
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ExperienceSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
            My <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Journey</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            From startup adventures to enterprise solutions, here's how I've grown as a developer and leader.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
        </div>

        {/* Timeline Items */}
        <div className="relative">
          {experienceData.map((experience, index) => (
            <TimelineItem
              key={experience.id}
              experience={experience}
              index={index}
              isLast={index === experienceData.length - 1}
            />
          ))}
        </div>

        {/* Stats Summary */}
        <div className="mt-20 bg-white/80 backdrop-blur rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center text-slate-800 mb-8">Career Highlights</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-2">2+</div>
              <div className="text-slate-600 font-medium">Years Experience</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="text-3xl font-bold text-green-600 mb-2">1</div>
              <div className="text-slate-600 font-medium">Company</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 mb-2">5+</div>
              <div className="text-slate-600 font-medium">Projects Delivered</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
              <div className="text-3xl font-bold text-orange-600 mb-2">20+</div>
              <div className="text-slate-600 font-medium">Skills Acquired</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-slate-600 mb-6">
            Interested in working together? Let's discuss your next project.
          </p>
          <button onClick={() => window.open('https://github.com/Mohanreddy1726', '_blank')} className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            <ExternalLink className="w-5 h-5 mr-2 inline" />
            Let's Connect
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
