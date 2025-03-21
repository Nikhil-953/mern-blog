import { Sidebar } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function DashSidebar() {
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
   <Sidebar
  className="
    w-full sm:w-full md:w-64  sm:h-[250px] md:h-[350px] lg:h-screen
  "
>
  <Sidebar.Items>
    <Sidebar.ItemGroup>
      {/* Profile Tab */}
      <Link to="/dashboard?tab=profile">
        <Sidebar.Item
          active={tab === 'profile'}
          icon={HiUser}
          label="User"
          labelColor="dark"
          as='div'
        >
          Profile
        </Sidebar.Item>
      </Link>

      {/* Sign Out Button */}
      <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
        Sign Out
      </Sidebar.Item>
    </Sidebar.ItemGroup>
  </Sidebar.Items>
</Sidebar>

  );
}
