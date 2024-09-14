import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryAction } from '../../component/State/Authentication/restaurant/Action';

const CreateFoodCategoryForm = () => {
    // const {restaurant}=useSelector(store=>store);
    const restaurant = useSelector(state => state.restaurant);

    const dispatch=useDispatch()
    const [formData, setFormData] =useState({
        categoryName:"",
       restaurantId: restaurant.usersRestaurant?.[0]?.id || "",
    });
    const handleSubmit =(e) =>{
        e.preventDefault();
        
        if (!formData.restaurantId) {
            console.error("Restaurant ID is missing");
            return;
        }
        
        const data = {
            name: formData.categoryName,
            restaurantId: formData.restaurantId,
        };
        dispatch(createCategoryAction({ reqData: data, jwt: localStorage.getItem("jwt") }));
        console.log('Submitting data:', data);
    };
    
    const handleInputChange =(e)=>{
        const {name,value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }
  return (
    <div className=''>
        <div className='p-5'>
            <h1 className='text-gray-400 text-center text-xl pb-10'>
                Create Food Category
            </h1>
            <form className="space-y-5" onSubmit={handleSubmit}>
            <TextField
           fullWidth
           id= "categoryName"
           name="categoryName"
           label="Food Category"
           variant="outlined"
           onChange={handleInputChange}
           value={formData.categoryName}
           ></TextField>

            <Button variant="contained" type="submit">
                Create Category
            </Button>
            </form>
        </div>
      
    </div>
  );
};

export default CreateFoodCategoryForm
