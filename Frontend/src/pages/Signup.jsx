import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'


const Signup = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }
    console.log({ name, email, password })
    setError('')
    navigate('/login')
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
        <h2 className="text-2xl font-semibold mb-6 text-center text-[#4B2E20]">
          Create an Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-3 bg-[#FAF6E9] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] transition duration-200 shadow-sm"
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-5 py-3 bg-[#FAF6E9] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A0522D] transition duration-200 shadow-sm"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="w-full bg-[#A0522D] text-white py-3 rounded-lg shadow-md hover:bg-[#8B4513] transition duration-200">
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-[#A0522D] hover:text-[#8B4513] font-medium transition duration-200">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
