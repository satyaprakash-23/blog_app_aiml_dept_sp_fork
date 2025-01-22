import React from 'react';
import { Target, Lightbulb } from 'lucide-react';

const MissionVision = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-blue-50 p-8 rounded-2xl">
            <div className="flex items-center mb-4">
              <Target className="text-blue-600 mr-3" size={32} />
              <h2 className="text-2xl font-bold">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To foster collaboration and innovation through meaningful dialogue between students,
              faculty, and alumni. We strive to create a dynamic platform that showcases academic
              achievements while building a strong, engaged community.
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-2xl">
            <div className="flex items-center mb-4">
              <Lightbulb className="text-blue-600 mr-3" size={32} />
              <h2 className="text-2xl font-bold">Our Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To become the premier hub for academic discourse, professional networking, and
              knowledge exchange, empowering future generations of scholars and industry leaders
              through collaborative learning and shared experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionVision;