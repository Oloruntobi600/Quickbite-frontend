import React, { useEffect } from 'react'
import AdminSideBar from './AdminSideBar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Menu from '../Menu/Menu'
import FoodCategory from '../FoodCategory/FoodCategory'
import Ingredients from '../Ingredients/Ingredients'
import Events from '../Events/Events'
import RestaurantDetails from './RestaurantDetails'
import RestaurantDashboard from '../Dashboard/Dashboard'
import Orders from '../Orders/Orders'
import CreateMenuForm from '../Menu/CreateMenuForm'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantsCategory } from '../../component/State/Authentication/restaurant/Action'
import { fetchRestaurantsOrder } from '../../component/State/Restaurant Order/Action'
import { Button } from '@mui/material'

const Admin = () => {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const jwt=localStorage.getItem("jwt")
  const { usersRestaurant } = useSelector((store) => store.restaurant);
  const handleClose=()=>{
  }

  const handleGoHome = () => {
    navigate('/'); // Navigates to the homepage
  };
 

  useEffect(() => {
    if (usersRestaurant && usersRestaurant[0]?.id) {
      const restaurantId = usersRestaurant[0].id;
      dispatch(getRestaurantsCategory({ jwt, restaurantId }));
      dispatch(fetchRestaurantsOrder({ jwt, restaurantId }));
    } else {
      // Redirect to create restaurant page if no restaurant is found
      navigate('/admin/restaurants/create-restaurant');
    }
  }, [dispatch, jwt, usersRestaurant, navigate]);
  return (
    <div>
      <div className='lg:flex justify-between'>
        <div>
          <AdminSideBar handleClose={handleClose}/>
        </div>
        <div className='lg:w-[80%]'>
        <Button 
            variant="contained" 
            color="primary" 
            onClick={handleGoHome}
            style={{ margin: '20px' }}
          >
            Go Back Home
          </Button>
          <Routes>
            <Route path='/' element={<RestaurantDashboard/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/menu' element={<Menu/>}/>
            <Route path='/category' element={<FoodCategory/>}/>
            <Route path='/ingredients' element={<Ingredients/>}/>
            <Route path='/event' element={<Events/>}/>
            <Route path='/details' element={<RestaurantDetails/>}/>
            <Route path='/add-menu' element={<CreateMenuForm/>}/>
          </Routes>

        </div>

      </div>
    </div>
  )
}

export default Admin