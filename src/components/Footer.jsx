import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin,
  Heart,
  Coffee,
  Code,
  Zap,
  ExternalLink,
  ArrowUp
} from 'lucide-react';
import { profileData, contactData } from '../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { label: 'About Me', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' }
  ];

  const services = [
    'Full-Stack Development',
    'Frontend Development',
    'Backend Development',
    'UI/UX Consultation',
    'Technical Mentoring',
    'Code Review'
  ];

  const technologies = [
    'React', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'TypeScript'
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-blue-400 rounded-full"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-green-400 rounded-lg rotate-45"></div>
        <div className="absolute bottom-20 left-1/3 w-12 h-12 border-2 border-purple-400 rotate-12"></div>
        <div className="absolute bottom-40 right-10 w-8 h-8 bg-blue-400 rounded-full"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full border-2 border-blue-400 overflow-hidden">
                  <img 
                    src={profileData.profileImage} 
                    alt={profileData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{profileData.name}</h3>
                  <p className="text-blue-300 text-sm">{profileData.title}</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {profileData.tagline}
              </p>
              
              {/* Status Badge */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  <Zap className="w-3 h-3 mr-1" />
                  Available for hire
                </Badge>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a 
                  href={profileData.social.github}
                  className="p-3 bg-slate-800/50 hover:bg-blue-600 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg group"
                >
                  <Github className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </a>
                <a 
                  href={profileData.social.linkedin}
                  className="p-3 bg-slate-800/50 hover:bg-blue-600 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg group"
                >
                  <Linkedin className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </a>
                {/* <a 
                  href={profileData.social.twitter}
                  className="p-3 bg-slate-800/50 hover:bg-blue-600 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg group"
                >
                  <Twitter className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </a> */}
                <a 
                  href={`mailto:${profileData.email}`}
                  className="p-3 bg-slate-800/50 hover:bg-blue-600 rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg group"
                >
                  <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-blue-300">Quick Links</h4>
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-300 group"
                  >
                    <div className="w-1 h-1 bg-blue-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-green-300">Services</h4>
              <div className="space-y-3">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-slate-300 group"
                  >
                    <Code className="w-4 h-4 text-green-400 group-hover:rotate-12 transition-transform duration-300" />
                    <span className="text-sm group-hover:text-white transition-colors duration-300">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-purple-300">Get In Touch</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-slate-300">
                  <Mail className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a 
                      href={`mailto:${profileData.email}`}
                      className="text-sm hover:text-white transition-colors duration-300"
                    >
                      {profileData.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-slate-300">
                  <Phone className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a 
                      href={`tel:${profileData.phone}`}
                      className="text-sm hover:text-white transition-colors duration-300"
                    >
                      {profileData.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-slate-300">
                  <MapPin className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm">{profileData.location}</p>
                  </div>
                </div>

                {/* Response Time */}
                <div className="bg-slate-800/50 rounded-lg p-4 mt-6">
                  <p className="text-sm text-slate-300 mb-2">Response Time</p>
                  <p className="text-white font-medium">{contactData.responseTime}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Technologies Section */}
          <div className="mt-16 pt-8 border-t border-slate-700/50">
            <h4 className="text-xl font-semibold mb-6 text-center text-blue-300">Technologies I Work With</h4>
            <div className="flex flex-wrap justify-center gap-3">
              {technologies.map((tech, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="bg-slate-800/50 text-slate-300 border-slate-600 hover:bg-blue-600/20 hover:border-blue-500 hover:text-white transition-all duration-300 cursor-pointer transform hover:scale-105"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <span>© {currentYear} {profileData.name}. Made with</span>
                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                <span>and</span>
                <Coffee className="w-4 h-4 text-amber-400" />
                <span>in {profileData.location}</span>
              </div>

              <div className="flex items-center gap-6">
                <a 
                  href="#"
                  className="text-slate-400 hover:text-white text-sm transition-colors duration-300"
                >
                  Privacy Policy
                </a>
                <a 
                  href="#"
                  className="text-slate-400 hover:text-white text-sm transition-colors duration-300"
                >
                  Terms of Service
                </a>
                
                {/* Scroll to Top Button */}
                {/* <Button
                  onClick={scrollToTop}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl group"
                >
                  <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                </Button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Floating Button */}
        <div className="fixed bottom-8 right-8 z-50">
          <Button
            onClick={scrollToTop}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-800 group animate-bounce hover:animate-none"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;