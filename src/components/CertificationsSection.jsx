import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Award, ExternalLink, Calendar, Building, CheckCircle, Shield, Star } from 'lucide-react';
import { certificationsData } from '../data/mock';

const CertificationCard = ({ certification, index }) => {
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
      className={`transform transition-all duration-700 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <Card className="h-full bg-white/80 backdrop-blur border-0 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden hover:scale-105">
        <CardHeader className="text-center pb-4">
          {/* Badge Icon with animated background */}
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-green-500 rounded-full animate-pulse opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <span className="text-4xl">{certification.badge}</span>
            </div>
            {/* Verification checkmark */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
          </div>
          
          {/* Certification Name */}
          <h3 className="text-xl font-bold text-slate-800 mb-3 leading-tight group-hover:text-blue-700 transition-colors duration-300">
            {certification.name}
          </h3>
          
          {/* Issuer */}
          <div className="flex items-center justify-center gap-2 text-blue-600 font-semibold mb-4">
            <Building className="w-4 h-4" />
            <span className="text-sm">{certification.issuer}</span>
          </div>
        </CardHeader>

        <CardContent className="text-center pt-0">
          {/* Date */}
          <div className="flex items-center justify-center gap-2 text-slate-500 mb-4">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Earned in {certification.date}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed mb-6 px-2">
            {certification.description}
          </p>

          {/* Status and Credential Info */}
          <div className="space-y-3 mb-6">
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <Shield className="w-3 h-3 mr-1" />
              Verified Active
            </Badge>
            
            <div className="bg-slate-50 rounded-lg p-3">
              <div className="text-xs text-slate-500 mb-1">Credential ID</div>
              <div className="font-mono text-xs text-slate-700 break-all">
                {certification.credentialId}
              </div>
            </div>
          </div>

          {/* Rating Stars */}
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </div>

          {/* Action Button */}
          <Button
            size="sm"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform group-hover:scale-105"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Verify Credential
          </Button>
        </CardContent>

        {/* Hover overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-green-600/5 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
      </Card>
    </div>
  );
};

const CertificationsSection = () => {
  const [filter, setFilter] = useState('All');
  const [filteredCertifications, setFilteredCertifications] = useState(certificationsData);
  
  const categories = ['All', 'Cloud', 'Development', 'Database', 'DevOps'];

  useEffect(() => {
    if (filter === 'All') {
      setFilteredCertifications(certificationsData);
    } else {
      // Simple filtering based on issuer - you can enhance this logic
      setFilteredCertifications(certificationsData.filter(cert => 
        cert.issuer.toLowerCase().includes(filter.toLowerCase()) ||
        cert.name.toLowerCase().includes(filter.toLowerCase())
      ));
    }
  }, [filter]);

  const getIssuerStats = () => {
    const issuers = certificationsData.reduce((acc, cert) => {
      acc[cert.issuer] = (acc[cert.issuer] || 0) + 1;
      return acc;
    }, {});
    
    return Object.entries(issuers).map(([issuer, count]) => ({ issuer, count }));
  };

  return (
    <section id="certifications" className="py-20 bg-gradient-to-br from-white to-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Certifications</span> & Credentials
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Professional certifications that validate my expertise across various technologies and platforms.
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

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredCertifications.map((certification, index) => (
            <CertificationCard key={certification.id} certification={certification} index={index} />
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Achievement Stats */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
            <CardHeader>
              <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Award className="w-6 h-6 text-blue-600" />
                Achievement Overview
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/60 backdrop-blur rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{certificationsData.length}</div>
                  <div className="text-sm text-slate-600">Total Certifications</div>
                </div>
                <div className="text-center p-4 bg-white/60 backdrop-blur rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">5</div>
                  <div className="text-sm text-slate-600">Different Providers</div>
                </div>
                <div className="text-center p-4 bg-white/60 backdrop-blur rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">2023</div>
                  <div className="text-sm text-slate-600">Latest Earned</div>
                </div>
                <div className="text-center p-4 bg-white/60 backdrop-blur rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-1">100%</div>
                  <div className="text-sm text-slate-600">Verified Active</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Issuer Breakdown */}
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
            <CardHeader>
              <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Building className="w-6 h-6 text-green-600" />
                Certification Providers
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getIssuerStats().map(({ issuer, count }) => (
                  <div key={issuer} className="flex items-center justify-between p-3 bg-white/60 backdrop-blur rounded-lg">
                    <span className="font-medium text-slate-700">{issuer}</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {count} {count === 1 ? 'cert' : 'certs'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        {/* <div className="text-center bg-gradient-to-r from-slate-800 to-blue-900 text-white rounded-2xl p-12">
          <h3 className="text-3xl font-bold mb-4">
            Continuous Learning & Growth
          </h3>
          <p className="text-slate-200 mb-6 max-w-2xl mx-auto">
            I'm committed to staying current with the latest technologies and best practices. 
            Always pursuing new certifications and expanding my skill set.
          </p>
          <Button 
            size="lg"
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <Award className="w-5 h-5 mr-2" />
            View All Credentials
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default CertificationsSection;