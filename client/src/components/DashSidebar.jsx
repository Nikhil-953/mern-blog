import { Sidebar } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiArrowSmRight, HiDocumentText, HiUser } from 'react-icons/hi';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { HiOutlineUserGroup } from 'react-icons/hi';



export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('api/user/signout', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess(data));
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Sidebar
      className="w-full sm:w-full md:w-64 sm:h-[250px] md:h-[350px] lg:h-screen"
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {/* Profile Tab */}
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>

          {/* Add gap between Profile and Posts */}
          {currentUser.isAdmin && (
            <div className="mt-4"> {/* This adds the gap */}
              <Link to="/dashboard?tab=posts">
                <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as="div">
                  Posts
                </Sidebar.Item>
              </Link>
            </div>
          )}

          {currentUser.isAdmin && (
            <div className="mt-4"> {/* This adds the gap */}
              <Link to="/dashboard?tab=users">
              <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup} as="div">
                  Users
                </Sidebar.Item>
              </Link>
            </div>
          )}

          {/* Sign Out Button */}
          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignout}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
