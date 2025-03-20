import React, { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import "./home.css";


const Home = () => {

  const images = [
    "/public/image1.jpg",
    "/public/image2.jpg",
    "/public/image3.jpg",
    "/public/image4.jpg",
    "/public/image5.jpg",
  ];

  // State to track current image index
  const [currentImage, setCurrentImage] = useState(0);

  // Effect to change image every 1.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500); 
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Indian heritage places
  const indianHeritagePlaces = [
    {
      title: "Taj Mahal",
      location: "Agra, Uttar Pradesh",
      description: "Iconic white marble mausoleum built by Shah Jahan",
      image: "/public/taj-mahal.jpg",
    },
    {
      title: "Hampi",
      location: "Karnataka",
      description: "Ancient ruins of the Vijayanagara Empire",
      image: "/public/hampi.jpg",
    },
    {
      title: "Khajuraho Temples",
      location: "Madhya Pradesh",
      description: "Medieval Hindu and Jain temples with intricate carvings",
      image: "/public/khajuraho.jpg",
    },
    {
      title: "Konark Sun Temple",
      location: "Odisha",
      description: "13th-century temple dedicated to the sun god Surya",
      image: "/public/konark.jpg",
    },
  ];

  return (
    <div className="bg-stone-50 min-h-screen w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="w-full pt-32 pb-16 left-0 text-center md:text-left">
        <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Preserve Your Heritage{" "}
              <span className="block text-amber-700">Effortlessly</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Connect with your roots through our intuitive platform. Share
              stories, document traditions, and build a lasting legacy for
              future generations.
            </p>
            <a
              href="/explore"
              className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition"
            >
              <a
                href="https://indianculture.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore More
              </a>

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
                    index === currentImage ? "opacity-100" : "opacity-0"
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
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Featured Traditions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Cultural Festivals",
                image: "/public/festival.jpg",
                alt: "Cultural festival celebration",
              },
              {
                title: "Traditional Crafts",
                image: "/public/crafts.jpg",
                alt: "Traditional handmade crafts",
              },
              {
                title: "Culinary Heritage",
                image: "/public/food.jpg",
                alt: "Traditional culinary dishes",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">
                    Explore various traditions and cultural elements.
                  </p>
                  <a
                    href="#"
                    className="text-amber-700 font-medium hover:underline"
                  >
                    Learn more →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION: Explore Indian Heritage Places */}
      <section className="py-16 bg-white w-full">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                Explore Indian Heritage Places
              </h2>
              <p className="text-gray-600 mt-2">
                Discover the historical and cultural landmarks of India
              </p>
            </div>
            <a
              href="/heritage-places"
              className="mt-4 md:mt-0 inline-flex items-center text-amber-700 hover:text-amber-800 font-medium"
            >
              View all places <FiArrowRight className="ml-2" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {indianHeritagePlaces.map((place, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition bg-white border border-gray-100"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={place.image}
                    alt={place.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {place.title}
                  </h3>
                  <p className="text-amber-700 text-sm font-medium mt-1">
                    {place.location}
                  </p>
                  <p className="text-gray-600 mt-2 mb-4 text-sm">
                    {place.description}
                  </p>
                  <a
                    href={`/heritage-places/${place.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="flex items-center text-amber-700 font-medium hover:underline"
                  >
                    Explore this site{" "}
                    <FiArrowRight className="ml-1" size={14} />
                  </a>
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
                <p className="text-gray-400 text-sm">
                  © 2025 HeritageConnect. All rights reserved.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-gray-400 hover:text-amber-500 transition text-sm"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/events"
                    className="text-gray-400 hover:text-amber-500 transition text-sm"
                  >
                    Cultural Events
                  </a>
                </li>
                <li>
                  <a
                    href="/traditions"
                    className="text-gray-400 hover:text-amber-500 transition text-sm"
                  >
                    Find on Map
                  </a>
                </li>
                <li>
                  <a
                    href="/gallery"
                    className="text-gray-400 hover:text-amber-500 transition text-sm"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-gray-400 hover:text-amber-500 transition text-sm"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-gray-400 hover:text-amber-500 transition text-sm"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-gray-400 hover:text-amber-500 transition text-sm"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400 text-sm">
                  contact@heritageconnect.com
                </li>
                <li className="text-gray-400 text-sm">+1 (555) 123-4567</li>
                <li className="text-gray-400 text-sm">
                  123 Heritage Street, Suite 101
                </li>
                <li className="text-gray-400 text-sm">
                  Cultural City, HC 12345
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;


