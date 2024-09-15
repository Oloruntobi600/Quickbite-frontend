import { Dashboard, ShoppingBag } from '@mui/icons-material'
import React from 'react'
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

const AdminSideBar = ({handleClose}) => {
    const isSmallScreen=useMediaQuery("(max-width:1080px)")
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
    <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        onClose={handleClose}
        open={isSmallScreen ? true : undefined}
        anchor='left'
        sx={{
            width: isSmallScreen ? '75vw' : '250px', // Adjust width for small screens
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: isSmallScreen ? '75vw' : '250px',
                position: isSmallScreen ? 'absolute' : 'fixed',
                height: '100%',
                zIndex: 1,
                overflow: 'auto' // Allow scrolling if content overflows
            },
        }}
    >
        <div className='h-full flex flex-col justify-start text-xl p-2'>
            {menu.map((item, i) => (
                <React.Fragment key={item.title}>
                    <div onClick={() => handleNavigate(item)} className='px-5 flex items-center gap-5 cursor-pointer'>
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

export default AdminSideBar
