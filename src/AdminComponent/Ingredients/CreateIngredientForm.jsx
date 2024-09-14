import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createIngredient, createIngredientCategory } from '../../component/State/Ingredients/Action';

const CreateIngredientForm = () => {
    const {restaurant,ingredients}=useSelector(store=>store);
    const dispatch=useDispatch();
    const jwt=localStorage.getItem("jwt");

    const [formData, setFormData] =useState({
        name:"",
        categoryId:"",
        restaurantId:"",
    });
    useEffect(() => {
      // Set restaurantId from state when component mounts or restaurant state changes
      if (restaurant?.usersRestaurant[0]?.id) {
          setFormData(prevData => ({
              ...prevData,
              restaurantId: restaurant.usersRestaurant[0]?.id
          }));
      }
  }, [restaurant]);

    const handleSubmit =(e) =>{
        e.preventDefault();
        if (!formData.restaurantId) {
          console.error("Restaurant ID is missing.");
          return;
      }
        const data={
           ...formData,
           restaurantId: formData.restaurantId
        };
        dispatch(createIngredient({data,jwt}))

        console.log("Submitting data:", data);
        
    };
    const handleInputChange =(e)=>{
        const {name,value} = e.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: value
      }));
  };

  return (
    <div className=''>
        <div className='p-5'>
            <h1 className='text-gray-400 text-center text-xl pb-10'>
                Create Ingredient
            </h1>
            <form className="space-y-5" onSubmit={handleSubmit}>
            <TextField
           fullWidth
           id= "name"
           name="name"
           label="Name"
           variant="outlined"
           onChange={handleInputChange}
           value={formData.name}
           ></TextField>

<FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Category</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={formData.ingredientCategoryId}
    label="Category"
    onChange={handleInputChange}
    name="categoryId"
  >
   {ingredients.category.map((item)=>(
   <MenuItem key={item.id} value={item.id}>
   {item.name}
 </MenuItem>
   ))}
  </Select>
</FormControl>

            <Button variant="contained" type="submit">
                Create Ingredient
            </Button>
            </form>
        </div>
      
    </div>
  );
};

export default CreateIngredientForm
