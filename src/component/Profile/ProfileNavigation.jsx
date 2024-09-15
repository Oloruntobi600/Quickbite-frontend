import React, { useState } from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { AddReaction } from '@mui/icons-material';
import { Divider, Drawer, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../State/Authentication/Action';


const menu = [
    { title: 'Orders', icon: <ShoppingBagIcon />, path: 'orders' },
    { title: 'Favorites', icon: <FavoriteIcon />, path: 'favorites' },
    { title: 'Address', icon: <AddReaction />, path: 'address' },
    { title: 'Payments', icon: <AccountBalanceWalletIcon />, path: 'payments' },
    { title: 'Notification', icon: <NotificationsActiveIcon />, path: 'notification' },
    { title: 'Events', icon: <EventIcon />, path: 'events' },
    { title: 'Logout', icon: <LogoutIcon />, path: 'logout' },
  ];
export const ProfileNavigation = () => {
    // const isSmallScreen = useMediaQuery("(max-width:900px)");
    const [isHovered, setIsHovered] = useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleNavigate=(item)=>{
      if(item.title==="Logout"){
        dispatch(logout())
        navigate("/")  
      }
      else
        navigate(`/my-profile/${item.title.toLowerCase()}`)
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

export default ProfileNavigation
