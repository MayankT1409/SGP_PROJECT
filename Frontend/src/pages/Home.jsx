import React, { useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import './home.css';

const Home = () => {
  // Array of image paths for the slideshow
  const images = [
    "/public/image1.jpg",
    "/public/image2.jpg",
    "/public/image3.jpg",
    "/public/image4.jpg",
    "/public/image5.jpg"
  ];

  // State to track current image index
  const [currentImage, setCurrentImage] = useState(0);

  // Effect to change image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500); // 5 seconds interval
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-stone-50 min-h-screen w-full overflow-x-hidden">
      <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 py-4">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-8">
          {/* Logo - Stays on the Left */}
          <a href="/" className="flex items-center gap-10 text-gray-800">
            <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">HC</span>
            </div>
            <span className="text-xl font-semibold">HeritageConnect</span>
          </a>
          
          {/* Navigation - Moves to Right */}
          <nav className="hidden md:flex items-center gap-6 ml-auto">
            <a href="/" className="text-gray-800 hover:text-amber-700 transition">Home</a>
            <a href="/events" className="text-gray-800 hover:text-amber-700 transition">Cultural Events</a>
            <a href="/traditions" className="text-gray-800 hover:text-amber-700 transition">Heritage</a>
            <a href="/gallery" className="text-gray-800 hover:text-amber-700 transition">Gallery</a>
            <a href="/about" className="text-gray-800 hover:text-amber-700 transition">About</a>
          </nav>
          
          {/* Join Button */}
          <a href="/join" className="bg-amber-800 hover:bg-amber-900 text-white px-6 py-2 rounded-full transition ml-6">
            Join Now
          </a>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="w-full pt-32 pb-16 text-center md:text-left">
        <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Preserve Your Heritage <span className="block text-amber-700">Effortlessly</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Connect with your roots through our intuitive platform. Share stories, document traditions, and build a lasting legacy for future generations.
            </p>
            <a href="/explore" className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition">
              <span>Explore Traditions</span>
              <FiArrowRight className="ml-2" />
            </a>
          </div>
          <div className="md:w-1/2 relative h-80 overflow-hidden rounded-xl shadow-lg">
            {/* Image Slideshow */}
            <div className="relative w-full h-full">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Cultural heritage showcase ${index + 1}`}
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                    index === currentImage ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Traditions */}
      <section className="py-16 bg-amber-50 w-full">
  <div className="max-w-screen-xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Traditions</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          title: "Cultural Festivals",
          image: "/public/festival.jpg",
          alt: "Cultural festival celebration"
        },
        {
          title: "Traditional Crafts",
          image: "/public/crafts.jpg",
          alt: "Traditional handmade crafts"
        },
        {
          title: "Culinary Heritage",
          image: "/public/food.jpg",
          alt: "Traditional culinary dishes"
        }
      ].map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-48 overflow-hidden">
            <img 
              src={item.image} 
              alt={item.alt}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-4">Explore various traditions and cultural elements.</p>
            <a href="#" className="text-amber-700 font-medium hover:underline">Learn more →</a>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
      
      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-12 w-full">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">HC</span>
                </div>
                <span className="text-lg font-semibold">HeritageConnect</span>
              </div>
              
              <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">© 2025 HeritageConnect. All rights reserved.</p>
            </div>
               </div>
            
            {/* Quick Links */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-amber-500 transition text-sm">Home</a></li>
                <li><a href="/events" className="text-gray-400 hover:text-amber-500 transition text-sm">Cultural Events</a></li>
                <li><a href="/traditions" className="text-gray-400 hover:text-amber-500 transition text-sm">Find on Map</a></li>
                <li><a href="/gallery" className="text-gray-400 hover:text-amber-500 transition text-sm">Gallery</a></li>
                <li><a href="/about" className="text-gray-400 hover:text-amber-500 transition text-sm">About Us</a></li>
                <li><a href="/privacy" className="text-gray-400 hover:text-amber-500 transition text-sm">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-amber-500 transition text-sm">Terms of Service</a></li>
              </ul>
            </div>
            
            {/* Contact */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400 text-sm">contact@heritageconnect.com</li>
                <li className="text-gray-400 text-sm">+1 (555) 123-4567</li>
                <li className="text-gray-400 text-sm">123 Heritage Street, Suite 101</li>
                <li className="text-gray-400 text-sm">Cultural City, HC 12345</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;