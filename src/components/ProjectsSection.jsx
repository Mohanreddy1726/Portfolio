import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Github, Eye, Zap } from 'lucide-react';
import { projectsData } from '../data/mock';

const ProjectCard = ({ project, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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

  const statusColors = {
    Production: 'bg-green-100 text-green-800 border-green-200',
    Beta: 'bg-blue-100 text-blue-800 border-blue-200',
    Development: 'bg-orange-100 text-orange-800 border-orange-200'
  };

  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="h-full bg-white/80 backdrop-blur border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group overflow-hidden">
        {/* Project Icon/Image */}
        <div className="relative h-48 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center overflow-hidden">
          <div className="text-6xl transform group-hover:scale-110 transition-transform duration-500">
            {project.image}
          </div>
          
          {/* Overlay with actions */}
          <div className={`absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center gap-4 transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white hover:text-slate-800"
            >
              <Github className="w-4 h-4 mr-2" />
              Code
            </Button>
          </div>
          
          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <Badge className={`${statusColors[project.status]} font-medium`}>
              <Zap className="w-3 h-3 mr-1" />
              {project.status}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-slate-800 mb-2">
            {project.title}
          </CardTitle>
          <p className="text-slate-600 text-sm leading-relaxed">
            {project.description}
          </p>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Features */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Key Features</h4>
            <div className="space-y-2">
              {project.features.slice(0, 2).map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-xs text-slate-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech, idx) => (
                <Badge 
                  key={idx}
                  variant="secondary"
                  className="text-xs bg-slate-100 text-slate-700 hover:bg-blue-100 transition-colors"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              size="sm"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
            <Button 
              size="sm"
              variant="outline"
              className="flex-1 hover:bg-slate-50"
            >
              <Github className="w-4 h-4 mr-1" />
              GitHub
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ProjectsSection = () => {
  const [filter, setFilter] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  
  const categories = ['All', 'AI/ML', 'Web Apps', 'Mobile', 'Tools'];

  useEffect(() => {
    if (filter === 'All') {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(projectsData.filter(project => 
        project.technologies.some(tech => 
          tech.toLowerCase().includes(filter.toLowerCase())
        )
      ));
    }
  }, [filter]);

  return (
    <section className="py-20 bg-gradient-to-br from-white to-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
            Featured <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            A showcase of innovative solutions I've built using cutting-edge technologies and creative problem-solving.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
        </div>

        {/* Filter Buttons */}
        {/* <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                filter === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-slate-600 hover:bg-slate-50 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </div> */}

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 mb-12">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-slate-600 font-medium">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">10M+</div>
              <div className="text-slate-600 font-medium">Users Reached</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-slate-600 font-medium">Technologies Used</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">99.9%</div>
              <div className="text-slate-600 font-medium">Uptime Achieved</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        {/* <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            Have a project in mind?
          </h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            I'm always excited to work on innovative projects that challenge me to push boundaries and create exceptional user experiences.
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-full text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <ExternalLink className="w-5 h-5 mr-2" />
            Let's Collaborate
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default ProjectsSection;