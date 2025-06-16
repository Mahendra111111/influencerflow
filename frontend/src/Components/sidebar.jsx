import React from 'react'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()
  
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    navigate('/adminLogin')
  }

  return (
    <div className="w-[230px] bg-white h-screen flex flex-col shadow-md">
      {/* Logo */}
      <div className="p-5 mb-6 flex justify-center">
        <div className="flex items-center">
          <span className="text-blue-500 text-2xl mr-1"></span>
          <span className="text-xl font-bold text-green-600">Influencerflow</span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 px-2">
        <div 
          className={`flex items-center py-3 px-4 mb-2 rounded-md cursor-pointer font-medium ${window.location.pathname === '/dashboard' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-50'}`}
          onClick={() => navigate('/dashboard')}
        >
          <span className="mr-3">📊</span>
          <span>Dashboard</span>
        </div>

        <div 
          className={`flex items-center py-3 px-4 mb-2 rounded-md cursor-pointer font-medium ${window.location.pathname === '/influencers' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-50'}`}
          onClick={() => navigate('/influencers')}
        >
          <span className="mr-3">👥</span>
          <span>Influencers</span>
        </div>

        <div 
          className={`flex items-center py-3 px-4 mb-2 rounded-md cursor-pointer font-medium ${window.location.pathname === '/logs' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-50'}`}
          onClick={() => navigate('/logs')}
        >
          <span className="mr-3">📝</span>
          <span>Logs</span>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-medium"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default Sidebar
