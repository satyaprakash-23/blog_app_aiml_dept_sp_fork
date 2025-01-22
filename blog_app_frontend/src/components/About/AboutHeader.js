import React from 'react';
import { BookOpen } from 'lucide-react';

const AboutHeader = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-6">
          <BookOpen size={48} className="mr-4" />
          <h1 className="text-4xl md:text-5xl font-bold">AI & ML Department Blog</h1>
        </div>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl mb-6">
            Your gateway to academic excellence, community engagement, and knowledge sharing
          </p>
          <button className="bg-white text-blue-800 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors">
            Explore Our Stories
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutHeader;