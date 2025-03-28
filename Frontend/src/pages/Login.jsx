// import { useState } from 'react'
// import { useNavigate, Link } from 'react-router-dom'


// const Login = () => {
//   const navigate = useNavigate()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     console.log({ email, password })
//     navigate('/')
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAF6E9] to-[#E3D5B8]">
//       <div className="bg-white bg-opacity-90 shadow-xl rounded-2xl p-8 w-full max-w-md">
//         {/* Logo Section */}
//         <div className="flex flex-col items-center mb-6">
//           {/* <img src={logo} alt="Logo" className="w-24 h-24 mb-3" /> */}
//           <h1 className="text-3xl font-semibold text-[#4B2E20] tracking-wide">
//             HeritageConnect
//           </h1>
//         </div>

//         {/* Heading */}
//         <h2 className="text-2xl font-semibold mb-6 text-center text-[#4B2E20] ">
//           Login
//         </h2>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-5 py-3 bg-[#FAF6E9] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] transition duration-200 shadow-sm"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-5 py-3 bg-[#FAF6E9] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] transition duration-200 shadow-sm"
//             required
//           />
//           <button className="w-full bg-[#A0522D] text-white py-3 rounded-lg shadow-md hover:bg-[#8B4513] transition duration-200">
//             Login
//           </button>
//         </form>

//         {/* Signup Link */}
//         <p className="mt-6 text-center text-gray-600">
//           Don't have an account?{' '}
//           <Link to="/signup" className="text-[#A0522D] hover:text-[#8B4513] font-medium transition duration-200">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Login



// 2:

// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const { email, password } = formData;

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);
  
//     try {
//       const config = {
//         headers: { 'Content-Type': 'application/json' },
//       };
//       const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password }, config);

//       alert(data.message);

//       const verificationToken = prompt("Enter the verification token sent to your email:");

//       if (!verificationToken) {
//         setError("Verification token is required.");
//         setIsLoading(false);
//         return;
//       }

//       const verifyResponse = await axios.get(`http://localhost:5000/api/auth/verify/${verificationToken}`);


//       console.log("Verification Response:", verifyResponse.data);

  
//       console.log("Sending Data:", { email, password }); // ✅ Log the data being sent
  
//       const response = await axios.post(
//         'http://localhost:5000/api/auth/login',
//         { email, password },
//         config
//       );
  
//       console.log("Full Backend Response:", response.data); // ✅ Log the response
  
//       localStorage.setItem('authToken', response.data.token);
//       setIsLoading(false);
//       navigate('/');
//     } catch (error) {
//       console.error("Login error:", error.response?.data || error.message);
//       setError(error.response?.data?.message || "Login failed. Please check your credentials.");
//       setIsLoading(false);
//     }
//   };
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAF6E9] to-[#E3D5B8]">
//       <div className="bg-white bg-opacity-90 shadow-xl rounded-2xl p-8 w-full max-w-md">
//         {/* Logo Section */}
//         <div className="flex flex-col items-center mb-6">
//           <h1 className="text-3xl font-semibold text-[#4B2E20] tracking-wide">
//             HeritageConnect
//           </h1>
//         </div>

//         {/* Heading */}
//         <h2 className="text-2xl font-semibold mb-6 text-center text-[#4B2E20]">
//           Login
//         </h2>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
//             {error}
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={email}
//               onChange={handleChange}
//               className="w-full px-5 py-3 bg-[#FAF6E9] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] transition duration-200 shadow-sm"
//               required
//             />
//           </div>

//           <div>
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={password}
//               onChange={handleChange}
//               className="w-full px-5 py-3 bg-[#FAF6E9] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] transition duration-200 shadow-sm"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className={`w-full bg-[#A0522D] text-white py-3 rounded-lg shadow-md hover:bg-[#8B4513] transition duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
//             disabled={isLoading}
//           >
//             {isLoading ? 'Logging In...' : 'Login'}
//           </button>
//         </form>

//         {/* Signup Link */}
//         <p className="mt-6 text-center text-gray-600">
//           Don't have an account?{' '}
//           <Link
//             to="/signup"
//             className="text-[#A0522D] hover:text-[#8B4513] font-medium transition duration-200"
//           >
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


// 3
// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// const Login = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [verificationStep, setVerificationStep] = useState(false);
//   const [verificationCode, setVerificationCode] = useState('');

//   const { email, password } = formData;

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleVerificationChange = (e) => {
//     setVerificationCode(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);
    
//     try {
//       const config = { headers: { 'Content-Type': 'application/json' } };
//       const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password }, config);
      
//       alert("Verification code sent to your email");
//       setShowVerification(true);
//       setIsLoading(false);
//     } catch (error) {
//       setError(error.response?.data?.message || "Login failed. Please check your credentials.");
//       setIsLoading(false);
//     }
//   };

//   const handleVerify = async () => {
//     if (!verificationCode) {
//       setError("Please enter the verification code.");
//       return;
//     }

//     try {
//       const verifyResponse = await axios.post("http://localhost:5000/api/auth/verify", { email, code: verificationCode });
      
//       localStorage.setItem('authToken', verifyResponse.data.token);
//       alert("Verification successful");
//       navigate('/');
//     } catch (error) {
//       setError("Invalid verification code.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAF6E9] to-[#E3D5B8]">
//       <div className="bg-white bg-opacity-90 shadow-xl rounded-2xl p-8 w-full max-w-md">
//         <div className="flex flex-col items-center mb-6">
//           <h1 className="text-3xl font-semibold text-[#4B2E20] tracking-wide">HeritageConnect</h1>
//         </div>

//         <h2 className="text-2xl font-semibold mb-6 text-center text-[#4B2E20]">Login</h2>

//         {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

//         {!showVerification ? (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} className="w-full px-5 py-3 bg-[#FAF6E9] border border-gray-300 rounded-lg" required />
//             <input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} className="w-full px-5 py-3 bg-[#FAF6E9] border border-gray-300 rounded-lg" required />
//             <button type="submit" className="w-full bg-[#A0522D] text-white py-3 rounded-lg shadow-md" disabled={isLoading}>{isLoading ? 'Logging In...' : 'Login'}</button>
//           </form>
//         ) : (
//           <div className="space-y-4">
//             <input type="text" placeholder="Enter Verification Code" value={verificationCode} onChange={handleVerificationChange} className="w-full px-5 py-3 bg-[#FAF6E9] border border-gray-300 rounded-lg" required />
//             <button onClick={handleVerify} className="w-full bg-[#A0522D] text-white py-3 rounded-lg shadow-md">Verify</button>
//           </div>
//         )}

//         <p className="mt-6 text-center text-gray-600">Don't have an account? <Link to="/signup" className="text-[#A0522D] hover:text-[#8B4513] font-medium">Sign Up</Link></p>
//       </div>
//     </div>
//   );
// };

// export default Login;


// 4
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setIsLoading(true);

  //   try {
  //     const { data } = await axios.post("http://localhost:5000/api/auth/login", formData);
  //     alert("Verification code sent to your email.");
  //     setVerificationStep(true); // Move to verification step
  //   } catch (error) {
  //     setError(error.response?.data?.message || "Login failed.");
  //   }
  //   setIsLoading(false);
  // };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setIsLoading(true);
  
  //   try {
  //     const { data } = await axios.post("http://localhost:5000/api/auth/login", formData);
  //     alert("Verification code sent to your email.");
  //     setVerificationStep(true); // Move to verification step
  //   } catch (error) {
  //     console.error("Login Error:", error.response ? error.response.data : error.message);
  //     setError(error.response?.data?.message || "Login failed.");
  //   }
  //   setIsLoading(false);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", formData);
      alert("Verification code sent to your email.");
      setVerificationStep(true);
    } catch (error) {
      console.error("Login Error:", error);  // 🔍 Log full error object
      console.error("Error Response:", error.response);  // 🔍 Log server response
  
      setError(error.response?.data?.message || "Login failed.");
    }
  
    setIsLoading(false);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/verify-code", {
        email: formData.email,
        code: verificationCode,
      });

      localStorage.setItem('authToken', data.token);
      navigate('/');
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

