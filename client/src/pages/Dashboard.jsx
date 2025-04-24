import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  // Function to change tab and update URL
  const handleTabChange = (newTab) => {
    setTab(newTab);
    navigate(`?tab=${newTab}`); // Update the URL without refreshing the page
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-56 h-screen">
        <DashSidebar handleTabChange={handleTabChange} />
      </div>

      {/* Main Content */}
      <div className="w-full">
        {tab === 'profile' && <DashProfile />}
        {tab === 'posts' && <DashPosts />}
        {tab === 'users' && <DashUsers />} {/* Default to posts if no tab is selected */}
      </div>
    </div>
  );
};

export default Dashboard;
 