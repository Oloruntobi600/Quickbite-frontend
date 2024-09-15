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
          variant="persistent"
          anchor='left'
          open
          sx={{
              width: isSmallScreen ? '70px' : '250px', // Adjust width based on screen size
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                  width: isSmallScreen ? '70px' : '250px', // Ensure the drawer width matches the above width
                  position: 'relative', // Ensure it doesn't overlay
                  height: '100%', // Full height
                  overflow: 'auto', // Allow scrolling if content overflows
              },
          }}
      >
          <Box
              className='flex flex-col justify-start text-xl p-2'
              sx={{
                  height: '100%',
                  overflowY: 'auto', // Allow scrolling if needed
              }}
          >
              {menu.map((item, i) => (
                  <React.Fragment key={item.title}> {/* Added key here */}
                      <Box
                          onClick={() => handleNavigate(item)}
                          className='px-3 flex items-center gap-3 cursor-pointer'
                          sx={{
                              display: 'flex',
                              alignItems: 'center',
                              padding: '8px',
                              borderRadius: '4px',
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
  );
}


export default ProfileNavigation
