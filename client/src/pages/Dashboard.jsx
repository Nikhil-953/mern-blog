import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div
      className="
        min-h-screen flex flex-col
        md:flex-row
      "
    >
      {/* Sidebar */}
      <div
        className="
          w-full md:w-56 h-screen 
        "
      >
        <DashSidebar />
      </div>

      {/* Main Content */}
      <div
        className="
          w-full 
        "
      >
        {tab === 'profile' && <DashProfile />}
      </div>
    </div>
  );
};

export default Dashboard;
