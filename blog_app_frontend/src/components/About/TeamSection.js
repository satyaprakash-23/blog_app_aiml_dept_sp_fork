import React from "react";
import { Code, Palette } from "lucide-react";
import profile from "../../assets/profile-pic.jpg";

const teamData = [
  {
    name: "Satya Prakash",
    role: "Frontend Developer",
    description:
      "Creative lead behind the blog's visual design and user experience",
    image: profile,
    icon: Palette,
  },
  {
    name: "Kumar Harsh",
    role: "Backend Developer",
    description:
      "Backend developer responsible for the blog's architecture and functionality",
    image:
      "https://media.licdn.com/dms/image/v2/D5603AQEGrc1YYqI_yg/profile-displayphoto-shrink_400_400/B56ZRoNAq2HwAk-/0/1736915029517?e=1743033600&v=beta&t=_s6yXUtjRq0LjQ8AiepJBxnLYM3MT3ydE63SUTUy2BU",
    icon: Code,
  },
];

const TeamSection = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Meet The Developers
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {teamData.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center space-x-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <div className="flex items-center text-blue-600 mb-2">
                    <member.icon size={16} className="mr-2" />
                    <span>{member.role}</span>
                  </div>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;
