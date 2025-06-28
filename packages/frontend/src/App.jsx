import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './Pages/Admin/adminLogin';
import Dashboard from './Pages/Dashboard/Dashboard';
import Influencers from './Pages/Influencer/Influencers';
import InfluencerProfile from './Pages/Influencer/InfluencerProfile';
import InfluencerRegistration from './Pages/Influencer/InfluencerRegistration';
import TermsAndConditions from './Pages/Legal/TermsAndConditions';
import PrivacyPolicy from './Pages/Legal/PrivacyPolicy';
import Logs from './Pages/logs/logs.jsx';
import LandingPage from './Pages/Landing/LandingPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/index.html" element={<Navigate to="/" />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/register" element={<InfluencerRegistration />} />
        <Route path="/influencer-registration" element={<InfluencerRegistration />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/influencers" element={<Influencers />} />
        <Route path="/influencers/:id" element={<InfluencerProfile />} />
        <Route path="/logs" element={<Logs />} />

        {/* Redirect unknown paths to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
