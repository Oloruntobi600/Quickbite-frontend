import { Divider, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuCard from './MenuCard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getRestaurantById, getRestaurantsCategory } from '../State/Authentication/restaurant/Action';
import { getMenuItemsByRestaurantId } from '../State/Menu/Action';




const foodTypes = [
    { label: "All", value: "all" },
    { label: "Vegetarian only", value: "vegetarian" },
    { label: "Non-Vegetarian only", value: "non_vegetarian" },
    { label: "Seasonal", value: "seasonal" }
];


const RestaurantDetails = () => {
    const [foodType, setFoodType] = useState("all");
    const dispatch=useDispatch();
    const jwt=localStorage.getItem("jwt");
    const restaurant = useSelector(state => state.restaurant);
    const categories = useSelector((state) => state.restaurant.categories);
    const menuItems = useSelector((state) => state.menu.menuItems);
    const loading = useSelector((state) => state.restaurant.loading);
    const error = useSelector((state) => state.restaurant.error);

  
    



    const [selectedCategory, setSelectedCategory]=useState("");

    const [category, setCategory] = useState("");

    const {id}=useParams();

    const handleFilter = (e) => {
        if (e.target.name === "food_type") {
            setFoodType(e.target.value);
        } else if (e.target.name === "category") {
            setCategory(e.target.value);
        }
        setFoodType(e.target.value)
        console.log(e.target.value, e.target.name);
    };

    const handleFilterCategory = (e, value) => {
        if (e.target.name === "food_type") {
            setFoodType(e.target.value);
        } else if (e.target.name === "category") {
            setCategory(e.target.value);
        }
        setSelectedCategory(value)
        console.log(e.target.value, e.target.name,value);
    };

    console.log("restaurant", restaurant)

    useEffect(() => {
        if (jwt) {
            dispatch(getRestaurantById({ jwt, restaurantId: id }));
            dispatch(getRestaurantsCategory({ jwt, restaurantId: id }));
        }
    }, [dispatch, id, jwt]);

    useEffect(() => {
        if (restaurant) {
            dispatch(getMenuItemsByRestaurantId({
                jwt,
                restaurantId: id,
                vegetarian: foodType === "vegetarian",
                nonVeg: foodType === "non_vegetarian",
                seasonal: foodType === "seasonal",
                foodCategory: selectedCategory,
            }));
        }
    }, [selectedCategory, foodType, dispatch, id, jwt, restaurant]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!restaurant) {
        return <div>No restaurant data available.</div>;
    }


    return (
        <div className='px-5 lg:px-20'>
            <section>
                <h3 className='text-gray-500 py-2 mt-10'>Home/Nigeria/Nigerian fast food/3</h3>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <img className='w-full h-[40vh]' src={restaurant.restaurant?.images[1]} alt="" />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <img className='w-full h-[40vh]' src={"https://res.cloudinary.com/dcpesbd8q/image/upload/v1707802819/cpfxroggttxg6tedfskd.jpg"} alt="" />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <img className='w-full h-[40vh]' src="https://res.cloudinary.com/dcpesbd8q/image/upload/v1707802825/dtwyuhxuawmg3qzffv84.jpg" alt="" />
                        </Grid>
                    </Grid>
                </div>
                <div className='pt-3 pb-5'>
                    <h1 className="text-4xl font-semibold">{restaurant.restaurant?.name}</h1>
                    <p className="text-gray-500 mt-1">
                        {restaurant.restaurant?.description}
                    </p>
                    <div className="space-y-3 mt-3">
                        <p className="text-gray-500 flex items-center gap-3">
                            <LocationOnIcon />
                            <span>Lagos, Nigeria</span>
                        </p>
                        <p className="text-gray-500 flex items-center gap-3">
                            <CalendarTodayIcon />
                            <span>Mon-Sun: 9:00 AM - 9:00 PM (Today)</span>
                        </p>
                    </div>
                </div>
            </section>
            <Divider />
            <section className="pt-[2rem] lg:flex relative">
                <div className="space-y-10 lg:w-[20%] filter">
                    <div className="box space-y-5 lg:sticky top-28">
                        <div>
                            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                                Food Type
                            </Typography>
                            <FormControl className="py-10 space-y-5" component={"fieldset"}>
                                <RadioGroup onChange={handleFilter} name="food_type" value={foodType}>
                                    {foodTypes.map((item) => (
                                        <FormControlLabel 
                                            key={item.value}
                                            value={item.value}
                                            control={<Radio />}
                                            label={item.label}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Divider />
                        <div>
                            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                                Food Category
                            </Typography>

                            <FormControl className="py-10 space-y-5" component={"fieldset"}>
                                <RadioGroup 
                                onChange={handleFilterCategory} 
                                name="food_category" 
                                value={selectedCategory}
                                >
                                    {categories.map((item) => (
                                        <FormControlLabel 
                                            key={item.name}
                                            value={item.name}
                                            control={<Radio />}
                                            label={item.name}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </div>
                <div className="space-y-5 lg:w-[80%] lg:pl-10">
                {menuItems.map((item, index) => (
                        <MenuCard key={item.id} item={item} /> // Ensure each item has a unique id
                    ))}
                </div>
            </section>
        </div>
    );
}

export default RestaurantDetails;
