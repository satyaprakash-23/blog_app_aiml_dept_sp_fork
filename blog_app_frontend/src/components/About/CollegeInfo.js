import React from "react";
import { Award } from "lucide-react";

const CollegeInfo = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20241220154613589971/Maharaja-Agrasen-Institute-of-Technology_Delhi.webp"
                alt="College Campus"
                className="rounded-2xl object-cover shadow-lg"
              />
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">About Our College</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                Established in 1999, Maharaja Agrasen Institute of Technology
                (MAIT), Delhi, has emerged as one of the leading institutions
                for engineering and management education in India. With a legacy
                of academic excellence, MAIT is dedicated to shaping innovative
                minds and future leaders. Consistently ranked among the top
                engineering colleges in Delhi and India. Equipped with
                state-of-the-art infrastructure, cutting-edge laboratories, and
                a robust placement record. Our highly qualified faculty and
                vibrant campus life foster an environment of holistic
                development and academic growth.
              </p>
              <div className="flex items-center space-x-2 text-blue-600">
                <Award size={24} />
                <span className="font-semibold">
                  Ranked among top (201-300) institutions nationwide
                </span>
              </div>
              <p className="text-gray-700">
                At MAIT, we are committed to empowering students with the skills
                and knowledge to thrive in an ever-evolving world. Our
                state-of-the-art facilities, distinguished faculty, and diverse
                student body create an enriching environment for learning and
                growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeInfo;
