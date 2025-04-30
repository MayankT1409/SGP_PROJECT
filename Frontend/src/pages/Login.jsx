
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, formData);
      alert("Verification code sent to your email.");
      setVerificationStep(true);
    } catch (error) {
      console.error("Login Error:", error);  // 🔍 Log full error object
      console.error("Error Response:", error.response);  // 🔍 Log server response

      setError(error.response?.data?.message || "Login failed.");
    }

    setIsLoading(false);
  };

  // const handleVerifyCode = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setIsLoading(true);

  //   try {
  //     const { data } = await axios.post("http://localhost:5000/api/auth/verify-code", {
  //       email: formData.email,
  //       code: verificationCode,
  //     });

  //     localStorage.setItem('authToken', data.token);
  //     navigate('/');
  //   } catch (error) {
  //     setError(error.response?.data?.message || "Verification failed.");
  //   }
  //   setIsLoading(false);
  // };

  //   const handleVerifyCode = async (e) => {
  //     e.preventDefault();
  //     setError('');
  //     setIsLoading(true);

  //     try {
  //         const { data } = await axios.post("http://localhost:5000/api/auth/verify-code", {
  //             email: formData.email,
  //             code: verificationCode,
  //         });

  //         // Store user data in localStorage
  //         localStorage.setItem('authToken', data.token);
  //         localStorage.setItem('user', JSON.stringify({ name: formData.email.split('@')[0] })); // Example name storage

  //         navigate('/');
  //     } catch (error) {
  //         setError(error.response?.data?.message || "Verification failed.");
  //     }
  //     setIsLoading(false);
  // };
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/verify-code", {
        email: formData.email,
        code: verificationCode,
      });

      // Store both name and email now
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify({
        name: formData.email.split('@')[0],
        email: formData.email
      }));

      navigate('/profile');
    } catch (error) {
      setError(error.response?.data?.message || "Verification failed.");
    }
    setIsLoading(false);
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAF6E9] to-[#E3D5B8]">
      <div className="bg-white bg-opacity-90 shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-[#4B2E20] text-center mb-4">HeritageConnect</h1>

        <h2 className="text-2xl font-semibold mb-6 text-center text-[#4B2E20]">
          {verificationStep ? "Enter Verification Code" : "Login"}
        </h2>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>}

        {!verificationStep ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full px-5 py-3 border rounded-lg" />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full px-5 py-3 border rounded-lg" />
            <button type="submit" disabled={isLoading} className="w-full bg-[#A0522D] text-white py-3 rounded-lg">
              {isLoading ? "Logging In..." : "Login"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <input type="text" name="verificationCode" placeholder="Enter 6-digit code" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required className="w-full px-5 py-3 border rounded-lg" />
            <button type="submit" disabled={isLoading} className="w-full bg-[#A0522D] text-white py-3 rounded-lg">
              {isLoading ? "Verifying..." : "Verify Code"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center">
          Don't have an account? <Link to="/signup" className="text-[#A0522D] font-medium">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

