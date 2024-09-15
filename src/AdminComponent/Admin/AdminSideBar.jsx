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


export default AdminSideBar
