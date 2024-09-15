import { Dashboard, ShoppingBag } from '@mui/icons-material'
import React, { useState } from 'react'
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import CategoryIcon from '@mui/icons-material/Category';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import EventIcon from '@mui/icons-material/Event';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, Drawer, IconButton, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../component/State/Authentication/Action';
import MenuIcon from '@mui/icons-material/Menu';


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

const AdminSideBar = ({handleClose}) => {
    const isSmallScreen=useMediaQuery("(max-width:1080px)")
    const navigate=useNavigate();
    const dispatch= useDispatch();
    const [drawerOpen, setDrawerOpen] = useState(!isSmallScreen);

    const handleNavigate = (item) => {
      if (item.title === "Logout") {
          dispatch(logout());
          // handleClose();
          navigate("/"); // Logout path
      } else {
        navigate(`/admin/restaurants${item.path}`); // Adjust path if necessary
      }
      if (isSmallScreen) {
        setDrawerOpen(false); // Close drawer after navigation on small screens
      }
  };
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

export default AdminSideBar
