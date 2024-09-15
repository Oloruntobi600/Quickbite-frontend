import { Dashboard, ShoppingBag } from '@mui/icons-material'
import React, { useState } from 'react'
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import CategoryIcon from '@mui/icons-material/Category';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EventIcon from '@mui/icons-material/Event';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../component/State/Authentication/Action';


const menu=[
    {title:"Dashboard", icon:<Dashboard/>, path:"/"},
    {title:"Orders", icon:<ShoppingBag/>, path:"/orders"},
    {title:"Menu", icon:<ShopTwoIcon/>, path:"/menu"},
    {title:"Food Category", icon:<CategoryIcon/>, path:"/category"},
    {title:"Ingredients", icon:<FastfoodIcon/>, path:"/ingredients"},
    {title:"Events", icon:<EventIcon/>, path:"/event"},
    {title:"Details", icon:<AdminPanelSettingsIcon/>, path:"/details"},
    {title:"Logout", icon:<LogoutIcon/>, path:"/"},        
]

const AdminSideBar = () => {
    // const isSmallScreen=useMediaQuery("(max-width:1080px)")
    const [isHovered, setIsHovered] = useState(false);
    const navigate=useNavigate();
    const dispatch= useDispatch();

    const handleNavigate = (item) => {
      if (item.title === "Logout") {
          dispatch(logout());
          // handleClose();
          navigate("/"); // Logout path
      } else {
        navigate(`/admin/restaurants${item.path}`); // Adjust path if necessary
      }
      console.log("Navigating to:", `/admin/restaurants${item.path}`);
  };

  return (
    <div
      // Container for hover trigger
      onMouseEnter={() => setIsHovered(true)}  // Show sidebar on hover
      onMouseLeave={() => setIsHovered(false)} // Hide sidebar when not hovered
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        width: isHovered ? '250px' : '50px', // Expand on hover
        transition: 'width 0.3s ease', // Smooth transition
        backgroundColor: '#fff',
        boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)',
        zIndex: 1300
      }}
    >
      <div className="w-full h-full flex flex-col justify-center text-xl gap-8 pt-16">
        {menu.map((item, i) => (
          <React.Fragment key={item.title}>
            <div
              onClick={() => handleNavigate(item)}
              className="px-5 flex items-center space-x-5 cursor-pointer"
            >
              {item.icon}
              {isHovered && <span>{item.title}</span>} {/* Show text only when hovered */}
            </div>
            {i !== menu.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default AdminSideBar
