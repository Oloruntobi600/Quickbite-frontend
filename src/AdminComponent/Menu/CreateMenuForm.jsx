import { AddPhotoAlternate } from '@mui/icons-material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Box, Button, Chip, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { uploadImageToCloudinary } from '../util/uploadToCloudinary';
import { useDispatch, useSelector } from 'react-redux';
import { createMenuItem, getMenuItemsByRestaurantId } from '../../component/State/Menu/Action';
import { getIngredientsOfRestaurant } from '../../component/State/Ingredients/Action';



const initialValues={
  name:"",
  description:"",
  price:"",
  category:"",
  restaurantId:"",
  vegetarian:true,
  seasonal:false,
  ingredients:[],
  images:[],
};


const CreateMenuForm = () => {
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");
  const {restaurant,ingredients}=useSelector(store=>store);
  const [uploadImage, setUploadImage]=useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  

  const formik=useFormik({
    initialValues,
    onSubmit: (values) =>{
      values.seasonal = !!values.seasonal;
        values.vegetarian = !!values.vegetarian;
    // values.restaurantId = restaurant?.usersRestaurant?.id;
    values.restaurantId = Array.isArray(restaurant?.usersRestaurant) && restaurant.usersRestaurant.length > 0
        ? restaurant.usersRestaurant[0]?.id || ""
        : "";

        dispatch(createMenuItem({ menu: values, jwt })).then(() => {
          // Fetch updated menu items after creation
          dispatch(getMenuItemsByRestaurantId({
            jwt,
            restaurantId: values.restaurantId,
            vegetarian: false,
            nonVeg: false,
            seasonal: false,
            foodCategory: "",
          }));
  
          // Set success message and close the form
          setSuccessMessage("Menu created successfully");
          // if (onClose) onClose(); // Close the form
        });
      },
    });
  
  const handleImageChange=async(e)=>{
    const file= e.target.files[0]
    setUploadImage(true)
    const image = await uploadImageToCloudinary(file)
    formik.setFieldValue("images",[...formik.values.images,image])
    setUploadImage(false)
  };
  const handleRemoveImage=(index)=>{
    const updatedImages=[...formik.values.images]
    updatedImages.splice(index,1);
    formik.setFieldValue("images", updatedImages)
  };

  useEffect(() => {
    if (Array.isArray(restaurant?.usersRestaurant) && restaurant.usersRestaurant.length > 0) {
      dispatch(getIngredientsOfRestaurant({ jwt, id: restaurant.usersRestaurant[0]?.id }));
    }
  }, [restaurant, dispatch, jwt]);

  return (
    <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
     <div className='lg:max-w-4xl'>
     <h1 className='font-bold text-2xl text-center py-2'>
        Add New Menu
      </h1>
      <form onSubmit={formik.handleSubmit} className='space-y-4'>
      <Grid container spacing={2}>
        <Grid className='flex flex-wrap gap-5' item xs={12}>

          <input
          accept="image/*"
          id="fileInput"
          style={{display:"none"}}
          onChange={handleImageChange}
          type="file" 
          />

          <label className='relative' htmlFor="fileInput">
            <span className='w-24 h-24 cursor-pointer flex items-center justify 
            p-3 border rounded-md border-gray-600'
            >
              <AddPhotoAlternate className="text-white"/>

            </span>
            {
              uploadImage && (
              <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'>
                <CircularProgress/>
              </div>
              // formik.values.image && <img className='w-24 h-24 rounded-md object-cover object-center'
            )}
          </label>
              <div className='flex flex-wrap gap-2'>
              {formik.values.images.map((image, index)=>(
              <div className='relative'key={index}>
                <img 
                className='w-24 h-24 object-cover'
                
                  src={image}
                  alt=""
                  />
                  <IconButton 
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    outline: "none"
                  }}
                  onClick={()=>handleRemoveImage(index)}
                  >
                    <CloseIcon sx={{fontSize:"1rem"}}/>
                  </IconButton>
              </div>
             ))}
              </div>
        </Grid>
        <Grid item xs={12}>
            <TextField fullWidth
           id= "name"
           name="name"
           label="Name"
           variant="outlined"
           onChange={formik.handleChange}
           value={formik.values.name}>

            </TextField>
        </Grid>
        <Grid item xs={12}>
            <TextField fullWidth
           id= "description"
           name="description"
           label="Description"
           variant="outlined"
           onChange={formik.handleChange}
           value={formik.values.description}>
            </TextField>
           
        
        </Grid>
        <Grid item xs={12} lg={6}>
            <TextField fullWidth
           id= "price"
           name="price"
           label="Price"
           variant="outlined"
           onChange={formik.handleChange}
           value={formik.values.price}>
            </TextField>
        </Grid>

        <Grid item xs={12} lg={6}>
        <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
  <Select
   labelId="category-label"
   id="category"
   value={formik.values.category}
   label="Category"
   onChange={formik.handleChange}
   name="category"
  >
    {restaurant.categories?.map((item)=>
    <MenuItem key={item.id} value={item}>{item.name}</MenuItem>)
    }
  </Select>
</FormControl>
        </Grid> 

        <Grid item xs={12}>
        <FormControl fullWidth>
        <InputLabel id="ingredients-label">Ingredients</InputLabel>
        <Select
          labelId="ingredients-label"
          id="ingredients"
          name="ingredients"
          multiple
          value={formik.values.ingredients}
          onChange={formik.handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Ingredients" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value.id} label={value.name} />
              ))}
            </Box>
          )}
        //   MenuProps={MenuProps}
        >
          {ingredients.ingredients?.map((item) => (
            <MenuItem
              key={item.id}
              value={item}
              
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        </Grid>

        <Grid item xs={12} lg={6}>
        <FormControl fullWidth>
        <InputLabel id="seasonal-label">Is Seasonal</InputLabel>
  <Select
    labelId="seasonal-label"
    id="seasonal"
    value={formik.values.seasonal}
    label="Is Seasonal"
    onChange={formik.handleChange}
    name="seasonal"
  >
    <MenuItem value={true}>Yes</MenuItem>
    <MenuItem value={false}>No</MenuItem>

  </Select>
</FormControl>
        </Grid> 

        <Grid item xs={12} lg={6}>
        <FormControl fullWidth>
        <InputLabel id="vegetarian-label">Is Vegetarian</InputLabel>
  <Select
     labelId="vegetarian-label"
     id="vegetarian"
    value={formik.values.vegetarian}
    label="Is Vegetarian"
    onChange={formik.handleChange}
    name="vegetarian"
  >
    <MenuItem value={true}>Yes</MenuItem>
    <MenuItem value={false}>No</MenuItem>

  </Select>
</FormControl>
        </Grid> 

      </Grid>
      <Button  variant="contained" color="primary" type="submit">Create Menu</Button>
      </form>
       {/* Display Success Message */}
       {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
     </div>
    </div>
  )
}

export default CreateMenuForm
