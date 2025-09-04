import React from 'react';
import { TrendingUp, Users, Award, Zap, Globe, Shield } from 'lucide-react';
import { Benefit } from '../types';

const CreatorBenefits: React.FC = () => {
  const benefits: Benefit[] = [
    {
      icon: Users,
      title: 'Global Audience',
      description: 'Reach millions of buyers worldwide across diverse industries and creative fields.'
      highlight: true
    },
    {
      icon: Award,
      title: 'Creator Recognition',
      description: 'Build your reputation with our creator badge system and featured artist programs.'
    },
    {
      icon: Zap,
      title: 'AI-Powered Growth',
      description: 'Our AI suggests optimal tags, pricing, and content strategies to maximize your reach.'
    },
    {
      icon: Globe,
      title: 'Multi-Platform Sync',
      description: 'Seamlessly sync your portfolio across multiple platforms and social media channels.'
    },
    {
      icon: Shield,
      title: 'Content Protection',
      description: 'Advanced watermarking and copyright protection keep your work secure.'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-200/40 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-cyan-200/40 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Why Creators{' '}
            <span className="bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Choose OpenLens
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of creators who are building successful businesses 
            with our comprehensive media platform.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`relative p-8 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl group animate-slide-up ${
                benefit.highlight
                  ? 'bg-gradient-to-br from-purple-600 to-cyan-600 text-white hover:shadow-purple-500/25'
                  : 'bg-white/70 backdrop-blur-sm border border-white/50 hover:bg-white/90 hover:shadow-gray-500/10'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Highlight Badge */}
              {benefit.highlight && (
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Award className="w-3 h-3 text-yellow-900" />
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${
                benefit.highlight 
                  ? 'bg-white/20' 
                  : 'bg-gradient-to-br from-purple-500 to-cyan-500'
              }`}>
                <benefit.icon className={`w-7 h-7 ${benefit.highlight ? 'text-white' : 'text-white'}`} />
              </div>

              {/* Content */}
              <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                benefit.highlight 
                  ? 'text-white' 
                  : 'text-gray-900 group-hover:text-purple-700'
              }`}>
                {benefit.title}
              </h3>
              <p className={`leading-relaxed ${
                benefit.highlight 
                  ? 'text-white/90' 
                  : 'text-gray-600'
              }`}>
                {benefit.description}
              </p>

              {/* Hover Glow */}
              {!benefit.highlight && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-purple-500 hover:to-cyan-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25">
            Join the Community
            <Users className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreatorBenefits;