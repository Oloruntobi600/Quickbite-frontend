import React, { useState } from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { AddReaction } from '@mui/icons-material';
import { Divider, Drawer, IconButton, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../State/Authentication/Action';
import { Menu as MenuIcon } from '@mui/icons-material'; 


const menu = [
    { title: 'Orders', icon: <ShoppingBagIcon />, path: 'orders' },
    { title: 'Favorites', icon: <FavoriteIcon />, path: 'favorites' },
    { title: 'Address', icon: <AddReaction />, path: 'address' },
    { title: 'Payments', icon: <AccountBalanceWalletIcon />, path: 'payments' },
    { title: 'Notification', icon: <NotificationsActiveIcon />, path: 'notification' },
    { title: 'Events', icon: <EventIcon />, path: 'events' },
    { title: 'Logout', icon: <LogoutIcon />, path: 'logout' },
  ];
export const ProfileNavigation = (open, handleClose) => {
    const isSmallScreen = useMediaQuery("(max-width:900px)");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const handleNavigate=(item)=>{
      if(item.title==="Logout"){
        dispatch(logout())
        navigate("/")  
      }
      else{ navigate(`/my-profile/${item.title.toLowerCase()}`)
    }
    setIsDrawerOpen(false);
    };
    const toggleDrawer = (open) => {
      setIsDrawerOpen(open);
    };
    return (
      <div>
        {/* Menu button for small screens */}
        {isSmallScreen && (
          <IconButton onClick={() => toggleDrawer(true)} sx={{ position: 'fixed', top: 16, left: 16 }}>
            <MenuIcon />
          </IconButton>
        )}
  
        <Drawer
          variant={isSmallScreen ? "temporary" : "permanent"}
          open={isSmallScreen ? isDrawerOpen : true}
          onClose={() => toggleDrawer(false)}
          anchor="left"
          sx={{ zIndex: 1 }}
        >
          <div className="w-[70vw] lg:w-[20vw] h-screen flex flex-col justify-center text-xl space-y-[1.65rem]">
            {menu.map((item, i) => (
              <React.Fragment key={item.title}>
                <div onClick={() => handleNavigate(item)} className="px-5 flex items-center gap-5 cursor-pointer">
                  {item.icon}
                  <span>{item.title}</span>
                </div>
                {i !== menu.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </div>
        </Drawer>
      </div>
    );
  };

export default ProfileNavigation
