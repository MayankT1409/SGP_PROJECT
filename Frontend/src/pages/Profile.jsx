import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('authToken');

    if (userData && token) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAF6E9] to-[#E3D5B8]">
      <div className="bg-white bg-opacity-90 shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-[#4B2E20] text-center mb-6">
          Welcome, {user.name}!
        </h1>
        <div className="text-center text-lg text-[#4B2E20] space-y-2">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-[#A0522D] text-white py-3 rounded-lg hover:bg-[#8B4513] transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
