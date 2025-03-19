import React, { useState } from 'react';

const FestivalDetail = () => {
  const [activeState, setActiveState] = useState('all');
  
  // Sample festival data organized by states
  const festivals = {
    maharashtra: [
      {
        id: 1,
        name: 'Ganesh Chaturthi',
        description: 'A 10-day festival celebrating the birth of Lord Ganesha, with elaborate idol installations and immersion ceremonies.',
        date: 'August-September',
        image: '/api/placeholder/400/300',
      },
      {
        id: 2,
        name: 'Diwali in Maharashtra',
        description: 'The festival of lights features unique Maharashtrian traditions including faral (festive snacks) and abhyangasnan (ritual bath).',
        date: 'October-November',
        image: '/api/placeholder/400/300',
      },
    ],
    rajasthan: [
      {
        id: 3,
        name: 'Pushkar Camel Fair',
        description: 'One of the world\'s largest camel fairs, combining livestock trading with cultural performances and religious rituals.',
        date: 'November',
        image: '/api/placeholder/400/300',
      },
      {
        id: 4,
        name: 'Desert Festival',
        description: 'A celebration of Rajasthani culture in Jaisalmer featuring camel races, folk performances, turban tying competitions, and more.',
        date: 'February',
        image: '/api/placeholder/400/300',
      },
    ],
    kerala: [
      {
        id: 5,
        name: 'Onam',
        description: 'Kerala\'s harvest festival featuring Vallam Kali (boat races), Pookalam (flower arrangements), and Onasadya (grand feast).',
        date: 'August-September',
        image: '/api/placeholder/400/300',
      },
      {
        id: 6,
        name: 'Theyyam',
        description: 'A ritual dance form where performers embody divine spirits in elaborate costumes and makeup.',
        date: 'November-May',
        image: '/api/placeholder/400/300',
      },
    ],
    westBengal: [
      {
        id: 7,
        name: 'Durga Puja',
        description: 'A grand celebration honoring Goddess Durga with elaborate pandals, cultural performances, and community festivities.',
        date: 'September-October',
        image: '/api/placeholder/400/300',
      },
      {
        id: 8,
        name: 'Poush Mela',
        description: 'Traditional fair in Shantiniketan celebrating Bengali folk culture, crafts, and performances.',
        date: 'December',
        image: '/api/placeholder/400/300',
      },
    ],
    punjab: [
      {
        id: 9,
        name: 'Baisakhi',
        description: 'Harvest festival featuring bhangra and gidda dances, marking the Sikh New Year and formation of the Khalsa panth.',
        date: 'April 13-14',
        image: '/api/placeholder/400/300',
      },
      {
        id: 10,
        name: 'Lohri',
        description: 'Winter folk festival celebrated with bonfire, traditional foods like revri and gajak, and folk songs.',
        date: 'January 13',
        image: '/api/placeholder/400/300',
      },
    ],
  };

  // List of states with proper names for display
  const states = [
    { id: 'all', name: 'All States' },
    { id: 'maharashtra', name: 'Maharashtra' },
    { id: 'rajasthan', name: 'Rajasthan' },
    { id: 'kerala', name: 'Kerala' },
    { id: 'westBengal', name: 'West Bengal' },
    { id: 'punjab', name: 'Punjab' },
  ];

  // Get festivals based on active state
  const getFestivalsToDisplay = () => {
    if (activeState === 'all') {
      return Object.values(festivals).flat();
    }
    return festivals[activeState] || [];
  };

  return (
    <div className="bg-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cultural Festivals of India</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the vibrant and diverse cultural festivals celebrated across different states of India, 
            each with its unique traditions, colors, and significance.
          </p>
        </div>

        {/* State Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {states.map((state) => (
            <button
              key={state.id}
              onClick={() => setActiveState(state.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeState === state.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-orange-100'
              }`}
            >
              {state.name}
            </button>
          ))}
        </div>

        {/* Festival Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getFestivalsToDisplay().map((festival) => (
            <div key={festival.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src={festival.image} 
                alt={festival.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{festival.name}</h3>
                  <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">{festival.date}</span>
                </div>
                <p className="text-gray-600 mb-6">{festival.description}</p>
                <button className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
                  Read more
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FestivalDetail;