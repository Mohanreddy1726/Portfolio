import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock, 
  MessageCircle, 
  Github, 
  Linkedin, 
  Twitter,
  CheckCircle,
  Zap
} from 'lucide-react';
import { contactData, profileData } from '../data/mock';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="text-center p-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
          <p className="text-green-600">Thanks for reaching out. I'll get back to you within 24 hours.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-slate-800">Send a Message</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Name</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="border-slate-200 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Email</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="border-slate-200 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Subject</label>
            <Input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              required
              className="border-slate-200 focus:border-blue-500 transition-colors"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-slate-700 mb-2 block">Message</label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project or idea..."
              rows={6}
              required
              className="border-slate-200 focus:border-blue-500 transition-colors resize-none"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold disabled:opacity-50 transition-all duration-300 transform hover:scale-105"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form> */}
        <form
  action="https://formsubmit.co/mohan.anika123@gmail.com"
  method="POST"
  className="space-y-6"
>
  <input type="hidden" name="_captcha" value="false" /> {/* Disable captcha if needed */}

  <div className="grid md:grid-cols-2 gap-4">
    <div>
      <label className="text-sm font-medium text-slate-700 mb-2 block">Name</label>
      <Input
        name="name"
        placeholder="Your name"
        required
        className="border-slate-200 focus:border-blue-500 transition-colors"
      />
    </div>
    <div>
      <label className="text-sm font-medium text-slate-700 mb-2 block">Email</label>
      <Input
        name="email"
        type="email"
        placeholder="your@email.com"
        required
        className="border-slate-200 focus:border-blue-500 transition-colors"
      />
    </div>
  </div>

  <div>
    <label className="text-sm font-medium text-slate-700 mb-2 block">Subject</label>
    <Input
      name="subject"
      placeholder="What's this about?"
      required
      className="border-slate-200 focus:border-blue-500 transition-colors"
    />
  </div>

  <div>
    <label className="text-sm font-medium text-slate-700 mb-2 block">Message</label>
    <Textarea
      name="message"
      placeholder="Tell me about your project or idea..."
      rows={6}
      required
      className="border-slate-200 focus:border-blue-500 transition-colors resize-none"
    />
  </div>

  <Button
    type="submit"
    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105"
  >
    <Send className="w-5 h-5 mr-2" />
    Send Message
  </Button>
</form>

      </CardContent>
    </Card>
  );
};

const ContactInfo = () => {
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

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: profileData.email,
      href: `mailto:${profileData.email}`,
      color: 'bg-blue-500'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: profileData.phone,
      href: `tel:${profileData.phone}`,
      color: 'bg-green-500'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: profileData.location,
      href: '#',
      color: 'bg-purple-500'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: profileData.social.github,
      color: 'hover:bg-slate-800'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: profileData.social.linkedin,
      color: 'hover:bg-blue-600'
    },
    {
      icon: Mail,
      label: 'Gmail',
      href: profileData.social.gmail,
      color: 'hover:bg-red-400'
    }
  ];

  return (
    <div ref={ref} className="space-y-6">
      {/* Contact Methods */}
      <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-800">Get in Touch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {contactMethods.map((method, index) => (
            <div
              key={method.label}
              className={`flex items-center gap-4 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-all duration-300 cursor-pointer transform ${
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onClick={() => method.href !== '#' && window.open(method.href)}
            >
              <div className={`p-3 ${method.color} rounded-lg`}>
                <method.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-medium text-slate-800">{method.label}</div>
                <div className="text-sm text-slate-600">{method.value}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Availability Status */}
      {/* <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <Zap className="w-3 h-3 mr-1" />
              Available
            </Badge>
          </div>
          <h3 className="font-bold text-slate-800 mb-2">{contactData.availability}</h3>
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
            <Clock className="w-4 h-4" />
            <span>{contactData.responseTime}</span>
          </div>
          <p className="text-sm text-slate-600">{contactData.subtitle}</p>
        </CardContent>
      </Card> */}

      {/* Social Links */}
      <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-slate-800">Connect With Me</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 bg-slate-100 ${social.color} text-slate-600 hover:text-white rounded-lg transition-all duration-300 transform hover:scale-110 hover:shadow-lg group`}
                title={social.label}
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
          {/* <p className="text-sm text-slate-600 mt-4">
            Follow me for updates on my latest projects and tech insights.
          </p> */}
        </CardContent>
      </Card>
    </div>
  );
};

const ContactSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
            Let's <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            {contactData.title}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div>
            <ContactInfo />
          </div>
        </div>

        {/* Bottom CTA */}
        {/* <div className="text-center mt-20">
          <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0 shadow-xl">
            <CardContent className="p-12">
              <MessageCircle className="w-16 h-16 mx-auto mb-6 opacity-80" />
              <h3 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Whether you need a complete application, consultation, or just want to chat about technology, 
                I'm here to help bring your ideas to life.
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Start a Conversation
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Schedule a Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </section>
  );
};

export default ContactSection;