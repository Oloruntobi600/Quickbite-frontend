import React from 'react';
import { Avatar, Badge, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { pink } from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import "./Navbar.css";
import { Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export const Navbar = () => {
    // Select only necessary state slices
    const user = useSelector(state => state.auth.user);
    const cartItemsLength = useSelector(state => state.cart.cart?.item?.length || 0);
    const navigate = useNavigate();

    const handleAvatarClick = () => {
        if (user?.role === "ROLE_CUSTOMER") {
            navigate("/my-profile");
        } else {
            navigate("/admin/restaurants");
        }
    };

    console.log("User: ", user);
    console.log("Cart Items Length: ", cartItemsLength);

    return (
        <Box sx={{ zIndex: 100 }}
            className='px-5 sticky top-0 z-50 py-[.8rem] bg-[#e91363] 1g:px-20 flex justify-between'>
            <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
                <li onClick={() => navigate("/")} className='logo font-semibold text-gray-300 text-2x1'>
                    Quickbite
                </li>
            </div>
            <div className='flex items-center space-x-2 lg:space-x-10'>
                <div>
                    <IconButton>
                        <SearchIcon sx={{ fontSize: "1.5rem" }} />
                    </IconButton>
                </div>
                <div>
                    {user ? (
                        <Avatar onClick={handleAvatarClick} sx={{ bgcolor: "white", color: pink.A400 }}>
                            {user.fullName[0].toUpperCase()}
                        </Avatar>
                    ) : (
                        <IconButton onClick={() => navigate("/account/login")}>
                            <Person />
                        </IconButton>
                    )}
                </div>
                <div>
                    <IconButton onClick={() => navigate("/cart")}>
                        <Badge color="primary" badgeContent={cartItemsLength}>
                            <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
                        </Badge>
                    </IconButton>
                </div>
            </div>
        </Box>
    );
};
