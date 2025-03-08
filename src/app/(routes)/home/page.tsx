'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Scissors, Palette, Droplets, Clock, MapPin, Shield, Calendar, LogIn, CheckCircle, ChevronRight, Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react';
import { useRef } from 'react';

export default function Home() {
  const router = useRouter();
  const servicesRef = useRef(null);
  const featuresRef = useRef(null);
  const contactRef = useRef(null);

  const handleClick = () => {
    router.push('/bookyour');
  };

  interface ScrollRef {
    current: HTMLDivElement | null;
  }

  const scrollToSection = (ref: ScrollRef): void => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    { icon: <Scissors className="w-8 h-8" />, title: 'Haircut', description: 'Professional cuts at your location' },
    { icon: <Palette className="w-8 h-8" />, title: 'Hair Color', description: 'Expert coloring services' },
    { icon: <Droplets className="w-8 h-8" />, title: 'Hair Wash', description: 'Relaxing wash and treatment' }
  ];

  const features = [
    { icon: <Clock className="w-6 h-6" />, title: 'Flexible Timing', description: 'Book at your convenience' },
    { icon: <MapPin className="w-6 h-6" />, title: 'At Your Doorstep', description: 'We come to you' },
    { icon: <Shield className="w-6 h-6" />, title: 'Certified Experts', description: 'Trained professionals' }
  ];

  const bookingSteps = [
    { 
      icon: <Scissors className="w-12 h-12" />,
      title: 'Choose Your Service',
      description: 'Select from our range of professional hair care services',
      number: '1'
    },
    {
      icon: <Calendar className="w-12 h-12" />,
      title: 'Pick Date & Time',
      description: 'Choose your preferred appointment slot',
      number: '2'
    },
    {
      icon: <LogIn className="w-12 h-12" />,
      title: 'Login/Register',
      description: 'Create an account or login to continue',
      number: '3'
    },
    {
      icon: <CheckCircle className="w-12 h-12" />,
      title: 'Confirmation',
      description: 'Receive instant booking confirmation',
      number: '4'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-yellow-300 to-orange-400">
      <nav className="bg-blue-500/80 backdrop-blur-sm shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-yellow-300">MUSKAN</span>
            </div>
            <ul className="flex items-center space-x-8">
              <li className="text-white hover:text-orange-300 font-medium cursor-pointer transition-colors duration-200" onClick={() => scrollToSection(servicesRef)}>
                Services
              </li>
              <li className="text-white hover:text-orange-300 font-medium cursor-pointer transition-colors duration-200" onClick={() => scrollToSection(featuresRef)}>
                Features
              </li>
              <li className="text-white hover:text-orange-300 font-medium cursor-pointer transition-colors duration-200">
                About Us
              </li>
              <li className="text-white hover:text-orange-300 font-medium cursor-pointer transition-colors duration-200" onClick={() => scrollToSection(contactRef)}>
                Contact
              </li>
              <li>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200">
                  My Account
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="pt-20 px-4">
        {/* discription */}
        <div className="max-w-7xl mx-auto py-20 flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 tracking-wider font-serif">
              Professional Hair Care
              <span className="block text-orange-900">At Your Doorstep</span>
            </h1>
            <p className="text-white text-xl mb-8 max-w-2xl">
              Experience salon-quality hair services in the comfort of your home. Our certified professionals bring the salon to you.
            </p>
            <button 
              className="bg-white/90 text-orange-600 px-8 py-4 rounded-full font-bold text-lg 
                hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg"
              onClick={handleClick}
            >
              Book Appointment Now
            </button>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <Image
              src="/salon.jpg"
              alt="Hair Styling"
              width={600}
              height={400}
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>

        {/* Services Section */}
        <div ref={servicesRef} className="max-w-7xl mx-auto py-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white/90 rounded-xl p-8 text-center transform hover:scale-105 transition-all duration-300">
                <div className="text-orange-600 flex justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div ref={featuresRef} className="max-w-7xl mx-auto py-20 flex flex-col items-center">
          <h2 className="text-4xl font-bold text-purple-600 text-center mb-12">Our Features</h2>
          <div className="flex flex-col items-center">
            {features.map((feature, index) => (
              <div key={index} className={`flex flex-col items-center mb-12 transition-all duration-300 hover:scale-105 ${index % 2 === 0 ? 'ml-24' : '-ml-24'}`}>
                <div className="bg-white/20 rounded-lg p-6 w-64 text-center">
                  <div className="bg-white/20 rounded-full p-4 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-purple-600 mb-2">{feature.title}</h3>
                  <p className="text-purple-800 text-center">{feature.description}</p>
                </div>
                {index < features.length - 1 && (
                  <div className="h-12 w-1 bg-purple-300 mt-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Booking Process Section */}
        <div className="max-w-7xl mx-auto py-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/30 -translate-y-1/2 hidden md:block" />
            <div className="grid md:grid-cols-4 gap-8 relative">
              {bookingSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white/90 rounded-xl p-8 text-center transform hover:scale-105 transition-all duration-300 relative z-10">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold">
                      {step.number}
                    </div>
                    <div className="text-orange-600 flex justify-center mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  {index < bookingSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-20">
                      <ChevronRight className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer ref={contactRef} className="bg-slate-800 backdrop-blur-sm pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">MUSKAN</h3>
              <p className="text-white/80">Professional hair care services at your doorstep.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/80 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-white/80 hover:text-white">Services</a></li>
                <li><a href="#" className="text-white/80 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-white/80 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="flex items-center text-white/80">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+1 234 567 890</span>
                </li>
                <li className="flex items-center text-white/80">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>info@muskan.com</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-white/80 hover:text-white">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-white/80 hover:text-white">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-white/80 hover:text-white">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8">
            <p className="text-center text-white/60">
              &copy; {new Date().getFullYear()} MUSKAN. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
