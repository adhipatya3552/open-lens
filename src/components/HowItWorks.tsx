import React from 'react';
import { Upload, Palette, DollarSign } from 'lucide-react';
import { Step } from '../types';

const HowItWorks: React.FC = () => {
  const steps: Step[] = [
    {
      number: 1,
      icon: Upload,
      title: 'Upload & Tag',
      description: 'Upload your photos and videos. Our AI automatically tags and categorizes your content for maximum discoverability.'
    },
    {
      number: 2,
      icon: Palette,
      title: 'Set Your License',
      description: 'Choose from various licensing options - from free Creative Commons to premium commercial licenses with custom pricing.'
      description: 'Choose from various Creative Commons licensing options to share your content with the community.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            How It{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Start earning from your creative work in three simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="text-center group animate-slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Step Number */}
              <div className="relative mb-8">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300 shadow-xl">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-cyan-500/50 to-purple-500/50 transform -translate-y-1/2" />
                )}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 mx-auto bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all duration-300">
                <step.icon className="w-8 h-8 text-cyan-400" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-gray-300 leading-relaxed max-w-sm mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;