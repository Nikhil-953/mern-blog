import { Sidebar } from 'flowbite-react';
import React, { useEffect, useState, useRef } from 'react';
import { HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiUser } from 'react-icons/hi';
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
  const sidebarRef = useRef(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  // Set sidebar height based on footer position
  useEffect(() => {
    const adjustSidebarHeight = () => {
      if (!sidebarRef.current) return;
      
      const footer = document.querySelector('footer');
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        const sidebarTop = sidebarRef.current.getBoundingClientRect().top;
        const newHeight = footerTop - sidebarTop;
        
        if (newHeight > 0) {
          sidebarRef.current.style.height = `${newHeight}px`;
        }
      }
    };

    // Initial adjustment
    adjustSidebarHeight();
    
    // Adjust on resize and scroll
    window.addEventListener('resize', adjustSidebarHeight);
    window.addEventListener('scroll', adjustSidebarHeight);
    
    return () => {
      window.removeEventListener('resize', adjustSidebarHeight);
      window.removeEventListener('scroll', adjustSidebarHeight);
    };
  }, []);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
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
    <div ref={sidebarRef} className="sticky top-0 overflow-y-auto">
      <Sidebar className="h-full">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to="/dashboard?tab=dash">
              <Sidebar.Item 
                active={tab === 'dash' || !tab} 
                icon={HiChartPie}
                as="div"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
            
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
              <div className="mt-4">
                <Link to="/dashboard?tab=posts">
                  <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as="div">
                    Posts
                  </Sidebar.Item>
                </Link>
              </div>
            )}

            {currentUser.isAdmin && (
              <div className="mt-4">
                <>
                  <Link to="/dashboard?tab=users">
                    <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup} as="div">
                      Users
                    </Sidebar.Item>
                  </Link>

                  <Link to="/dashboard?tab=comments">
                    <Sidebar.Item active={tab === 'comments'} icon={HiAnnotation} as="div">
                      Comments
                    </Sidebar.Item>
                  </Link>
                </>
              </div>
            )}

            {/* Sign Out Button */}
            <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer" onClick={handleSignout}>
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}