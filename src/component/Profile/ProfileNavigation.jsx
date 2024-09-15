import React from 'react'
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
export const ProfileNavigation = (open, handleClose) => {
    const isSmallScreen = useMediaQuery("(max-width:900px)");

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
      <Drawer
          variant={isSmallScreen ? "temporary" : "permanent"}
          onClose={handleClose}
          open={isSmallScreen ? open : true}
          anchor='left'
          sx={{
              width: '250px', // Adjust width as needed
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                  width: '250px', // Ensure the drawer width matches the above width
                  position: 'fixed', // Fix the position
                  height: '100%', // Full height
                  zIndex: 1, // Ensure it's above content but not too high
              },
          }}
      >
          <div className="h-full flex flex-col justify-start text-xl pt-16 gap-8">
              {menu.map((item, i) => (
                  <React.Fragment key={item.title}>
                      <div onClick={() => handleNavigate(item)} className="px-5 flex items-center space-x-5 cursor-pointer">
                          {item.icon}
                          <span>{item.title}</span>
                      </div>
                      {i !== menu.length - 1 && <Divider />}
                  </React.Fragment>
              ))}
          </div>
      </Drawer>
  );
};


export default ProfileNavigation
