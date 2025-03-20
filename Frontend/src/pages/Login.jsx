import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ email, password })
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAF6E9] to-[#E3D5B8]">
      <div className="bg-white bg-opacity-90 shadow-xl rounded-2xl p-8 w-full max-w-md">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-6">
          {/* <img src={logo} alt="Logo" className="w-24 h-24 mb-3" /> */}
          <h1 className="text-3xl font-semibold text-[#4B2E20] tracking-wide">
            HeritageConnect
          </h1>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#4B2E20] ">
          Login
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-3 bg-[#FAF6E9] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] transition duration-200 shadow-sm"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-3 bg-[#FAF6E9] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] transition duration-200 shadow-sm"
            required
          />
          <button className="w-full bg-[#A0522D] text-white py-3 rounded-lg shadow-md hover:bg-[#8B4513] transition duration-200">
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#A0522D] hover:text-[#8B4513] font-medium transition duration-200">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
