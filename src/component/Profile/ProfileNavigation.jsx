import React, { useState } from 'react'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { AddReaction } from '@mui/icons-material';
import { Box, Divider, Drawer, IconButton, useMediaQuery } from '@mui/material';
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
  };


  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
    
    return (
      <>
        {/* Menu Icon for Small Screens */}
        {isSmallScreen && (
          <IconButton onClick={toggleDrawer} sx={{ position: 'fixed', top: 16, left: 16 }}>
            <MenuIcon />
          </IconButton>
        )}
  
        <Drawer
          variant={isSmallScreen ? "temporary" : "persistent"} // Temporary on small screens, persistent on large screens
          open={drawerOpen}
          onClose={handleClose}
          anchor='left'
          sx={{
            width: isSmallScreen ? '70vw' : '250px', // Narrower on small screens
            '& .MuiDrawer-paper': {
              width: isSmallScreen ? '70vw' : '250px',
              height: '100%',
            },
          }}
        >
          <Box
            className='flex flex-col justify-start text-xl p-2'
            sx={{
              height: '100%',
              overflowY: 'auto',
            }}
          >
            {menu.map((item, i) => (
              <React.Fragment key={item.title}>
                <Box
                  onClick={() => handleNavigate(item)}
                  className='px-3 flex items-center gap-3 cursor-pointer'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px',
                    '&:hover': {
                      backgroundColor: '#f0f0f0',
                    },
                  }}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Box>
                {i !== menu.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </Box>
        </Drawer>
      </>
    );
  };
  
  

export default ProfileNavigation
