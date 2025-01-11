import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80',
    title: 'Switching From Photography to UX Design: Everything You Need to Know',
    subtitle: 'A Journey of Creative Evolution',
    description: 'Viola LeBlanc is a 23-year-old photographer and product designer from Toronto, Ontario. She has worked with Spotify, Nike, Chews, Makr, and Square. Sophia Munn asked her a few questions about her work.'
  },
  {
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80',
    title: 'The Future of Digital Design',
    subtitle: 'Trends That Will Shape Tomorrow',
    description: 'Explore the emerging trends and technologies that are revolutionizing the digital design landscape.'
  },
  {
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80',
    title: 'Mastering the Art of Visual Storytelling',
    subtitle: 'From Concept to Creation',
    description: 'Learn how to craft compelling visual narratives that engage and inspire your audience.'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full overflow-hidden rounded-md min-h-[80vh] ">
      {/* Image Slider */}
      <div className="absolute inset-0 ">
        <img
          src={slides[currentSlide].image}
          alt="Hero"
          className="w-full h-full object-cover transition-opacity duration-500"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center p-5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-blue-100 bg-blue-600/80 rounded-full">
              Featured
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl text-blue-100 mb-4">
              {slides[currentSlide].subtitle}
            </p>
            <p className="text-lg text-gray-200 mb-8">
              {slides[currentSlide].description}
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Read More
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full transition"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full transition"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;