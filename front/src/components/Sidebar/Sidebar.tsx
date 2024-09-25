// src/components/Sidebar.tsx
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaLink, FaCog, FaChartLine } from 'react-icons/fa'; // Importing icons from react-icons
import './Sidebar.css';
import { MdOutlineLogin } from "react-icons/md";
import cloudflare from "../../assets/cloudflare.png"
import { useAuth } from '../../contexts/AuthContext';
import { FaArrowRightLong } from "react-icons/fa6";


interface Props {
  setIsAuthenticated: (value: any) => void;
}

const Sidebar: React.FC<Props> = () => {
  const location = useLocation();

  // State to hold user info
  const [username, setUsername] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  // Retrieve user info from localStorage on component mount
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedIsAdmin = localStorage.getItem('isAdmin');
    if (savedUsername && savedIsAdmin) {
      setUsername(savedUsername);
      setIsAdmin(JSON.parse(savedIsAdmin));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem('isAdmin');
    setUsername(null);
    setIsAdmin(false);
    setIsAuthenticated(false)
    navigate("/login")
  };

  return (
    <div className="sidebar">
      <div className="cloudflare-logo">
        <img src={cloudflare} style={{ width: "250px" }} /> {/* Cloud icon as the Cloudflare logo */}
      </div>

      {/* Wrap the links in a new div for styling */}
      <ul style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
        <li>
          <Link to="/manage-urls" className={location.pathname === '/manage-urls' ? 'active' : ''}>
            <FaLink /> Manage URLs
          </Link>
        </li>
        <li>
          <Link to="/configuration" className={location.pathname === '/configuration' ? 'active' : ''}>
            <FaCog /> Configuration
          </Link>
        </li>
        <li>
          <Link to="/analytics" className={location.pathname === '/analytics' ? 'active' : ''}>
            <FaChartLine /> Analytics
          </Link>
        </li>
        <li className="sidebar-user-info" style={{ justifyContent: "center !important" }} onClick={handleLogout}>
          <span>Logged <FaArrowRightLong /> {isAdmin ? 'Admin' : 'User'}</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
