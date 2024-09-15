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
import MenuIcon from '@mui/icons-material/Menu';


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
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [drawerOpen, setDrawerOpen] = useState(!isSmallScreen);

    const handleNavigate=(item)=>{
      if(item.title==="Logout"){
        dispatch(logout())
        navigate("/")  
      }
      else
        navigate(`/my-profile/${item.title.toLowerCase()}`)
    };
    if (isSmallScreen) {
      setDrawerOpen(false); // Close drawer after navigation on small screens
    }
    const toggleDrawer = () => {
      setDrawerOpen(!drawerOpen);
    };
    
    return (
      <>
        {/* Menu Icon for Small Screens */}
        {isSmallScreen && (
          <IconButton
            onClick={toggleDrawer}
            sx={{ position: 'fixed', top: 16, left: 16, zIndex: 2000 }}
          >
            <MenuIcon />
          </IconButton>
        )}
  
        <Drawer
          variant={isSmallScreen ? "temporary" : "permanent"} // Temporary on mobile, permanent on larger screens
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          anchor='left'
          sx={{
            width: isSmallScreen ? '60vw' : '250px', // Reduce width for smaller screens
            '& .MuiDrawer-paper': {
              width: isSmallScreen ? '60vw' : '250px',
              boxSizing: 'border-box',
            },
          }}
        >
          <div className='w-full h-screen flex flex-col justify-start text-xl space-y-4 p-2'>
            {menu.map((item, i) => (
              <React.Fragment key={item.title}>
                <div
                  onClick={() => handleNavigate(item)}
                  className='flex items-center gap-3 cursor-pointer px-3 py-2'
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                    },
                  }}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </div>
                {i !== menu.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </div>
        </Drawer>
      </>
    );
  };

export default ProfileNavigation
