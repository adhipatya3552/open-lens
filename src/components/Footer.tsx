import React from 'react';
import { Camera, Twitter, Instagram, Facebook, Youtube, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = {
    Product: ['Features', 'AI Tools', 'API', 'Mobile App'],
    Creators: ['Creator Hub', 'Resources', 'Community', 'Success Stories'],
    Legal: ['Terms of Service', 'Privacy Policy', 'Licensing', 'DMCA', 'Cookie Policy'],
    Support: ['Help Center', 'Contact Us', 'Status', 'Blog', 'Guidelines']
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Mail, href: '#', label: 'Email' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">OpenLens</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                The open media sharing platform that empowers creators to monetize 
                their work with advanced licensing and AI-powered features.
              </p>
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-cyan-500 transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-semibold text-lg mb-4 text-white">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-400">Get the latest features and creator tips delivered to your inbox.</p>
            </div>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors duration-300 min-w-[250px]"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-cyan-500 transition-all duration-300 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 OpenLens. All rights reserved. Built with ❤️ for creators worldwide.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-gray-400 text-sm">🌍 Available in 15+ languages</span>
              <span className="text-gray-400 text-sm">⚡ 99.9% uptime</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;