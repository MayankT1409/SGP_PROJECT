import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyC2p5PxoPk54PA4Bzk4kGVNeohLOwgMpZg');

const HeritageBot = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Namaste! I am your HeritageConnect assistant. Ask me anything about Indian culture, traditions, heritage sites, or festivals!' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e) => setUserInput(e.target.value);

  const generateResponse = async (userQuestion) => {
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      
      const instruction = `You are an expert in Indian culture, history, heritage, traditions, art, cuisine, and festivals. 
      If the user's question is NOT related to Indian culture and heritage, politely inform them that you only answer questions about Indian heritage.`;
      
      //here we check instruction which we give to ai and users question
      const result = await model.generateContent(instruction + "\n\nUser: " + userQuestion);
      const responseText = await result.response.text();
      
      setMessages((prev) => [...prev, { role: 'assistant', content: responseText }]);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'I apologize, but I am having trouble connecting right now. Please try again later.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', content: userInput }]);
    generateResponse(userInput);
    setUserInput('');
  };

  return (
    <div className="flex flex-col h-[600px] w-full pt-2 max-w-md mx-auto rounded-lg overflow-hidden shadow-lg bg-white border border-amber-100">
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-4 text-white">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-white text-orange-600 flex items-center justify-center font-bold text-xl">HC</div>
          <div className="ml-3">
            <h3 className="font-semibold text-lg">Heritage Assistant</h3>
            <p className="text-xs opacity-80">Ask about Indian culture & heritage</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-amber-50">
        {messages.map((message, index) => (
          <div key={index} className={`mb-3 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-3 rounded-lg max-w-xs md:max-w-md ${message.role === 'user' ? 'bg-orange-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-amber-200'}`}>
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left mb-3">
            <div className="inline-block p-3 rounded-lg rounded-tl-none bg-white text-gray-800 border border-amber-200">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-amber-600 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white">
        <div className="flex rounded-lg border border-amber-300 overflow-hidden">
          <input type="text" value={userInput} onChange={handleInputChange} placeholder="Ask about Indian heritage..." className="flex-1 px-4 py-2 focus:outline-none" disabled={isLoading} />
          <button type="submit" disabled={isLoading || userInput.trim() === ''} className={`px-4 text-white ${isLoading || userInput.trim() === '' ? 'bg-gray-300' : 'bg-orange-600 hover:bg-orange-700'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeritageBot;
