// import { useState } from 'react'
// import { useNavigate, Link } from 'react-router-dom'


// const Signup = () => {
//   const navigate = useNavigate()
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [error, setError] = useState('')

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     if (password !== confirmPassword) {
//       setError("Passwords don't match")
//       return
//     }
//     try {
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };

//       const { data } = await axios.post(
//         '/api/auth/signup',
//         { name, email, password },
//         config
//       );

//       localStorage.setItem('authToken', data.token);
//       setError('');
//       navigate('/');
//     } catch (error) {
//       setError(
//         error.response?.data?.errors?.[0]?.msg ||
//         'Something went wrong during registration'
//       );
//       console.error(error);
//     }
//   };
//   console.log({ name, email, password })
//   setError('')
//   navigate('/login')
// }

// return (
//   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAF6E9] to-[#E3D5B8]">
//     <div className="bg-white bg-opacity-90 shadow-xl rounded-2xl p-8 w-full max-w-md">
//       {/* Logo Section */}
//       <div className="flex flex-col items-center mb-6">
//         {/* <img src={logo} alt="Logo" className="w-24 h-24 mb-3" /> */}
//         <h1 className="text-3xl font-semibold text-[#4B2E20] tracking-wide">
//           HeritageConnect
//         </h1>
//       </div>

//       {/* Heading */}
//       <h2 className="text-2xl font-semibold mb-6 text-center text-[#4B2E20]">
//         Create an Account
//       </h2>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-5">
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full px-5 py-3 bg-[#FAF6E9] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] transition duration-200 shadow-sm"
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-5 py-3 bg-[#FAF6E9] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] transition duration-200 shadow-sm"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full px-5 py-3 bg-[#FAF6E9] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] transition duration-200 shadow-sm"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           className="w-full px-5 py-3 bg-[#FAF6E9] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] transition duration-200 shadow-sm"
//           required
//         />
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//         <button className="w-full bg-[#A0522D] text-white py-3 rounded-lg shadow-md hover:bg-[#8B4513] transition duration-200">
//           Sign Up
//         </button>
//       </form>

//       {/* Login Link */}
//       <p className="mt-6 text-center text-gray-600">
//         Already have an account?{' '}
//         <Link to="/login" className="text-[#A0522D] hover:text-[#8B4513] font-medium transition duration-200">
//           Login
//         </Link>
//       </p>
//     </div>
//   </div>
// )
// }

// export default Signup


import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // const { data } = await axios.post(
      //   '/api/auth/signup',
      //   { name, email, password },
      //   config
      // );
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/signup',
        { name, email, password },
        config
      );

      localStorage.setItem('authToken', data.token);
      setIsLoading(false);
      alert('Successfully Created!!!')
      navigate('/login');
    } catch (error) {
      setError(
        error.response?.data?.errors?.[0]?.msg ||
        error.response?.data?.message ||
        'Registration failed. Please try again.'
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAF6E9] to-[#E3D5B8]">
      <div className="bg-white bg-opacity-90 shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-semibold text-[#4B2E20] tracking-wide">
            HeritageConnect
          </h1>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#4B2E20]">
          Create an Account
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={name}
              onChange={handleChange}
              className="w-full px-5 py-3 bg-[#FAF6E9] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] transition duration-200 shadow-sm"
              required
            />
          </div>
          
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              className="w-full px-5 py-3 bg-[#FAF6E9] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] transition duration-200 shadow-sm"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={handleChange}
              className="w-full px-5 py-3 bg-[#FAF6E9] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] transition duration-200 shadow-sm"
              required
              minLength="6"
            />
          </div>
          
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleChange}
              className="w-full px-5 py-3 bg-[#FAF6E9] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] transition duration-200 shadow-sm"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-[#A0522D] text-white py-3 rounded-lg shadow-md hover:bg-[#8B4513] transition duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="text-[#A0522D] hover:text-[#8B4513] font-medium transition duration-200"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;