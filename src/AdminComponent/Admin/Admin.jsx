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
import { getRestaurantById, getRestaurantsCategory } from '../../component/State/Authentication/restaurant/Action'
import { getMenuItemsByRestaurantId } from '../../component/State/Menu/Action'
import { getUsersOrders } from '../../component/State/Order/Action'
import { fetchRestaurantsOrder } from '../../component/State/Restaurant Order/Action'

const Admin = () => {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const jwt=localStorage.getItem("jwt")
  // const {restaurant}=useSelector(store=>store)
  const { restaurant } = useSelector(store => store.restaurant);
  const { usersRestaurant } = useSelector((store) => store.restaurant);
  const handleClose=()=>{

  }
  // useEffect(()=>{
  //     dispatch(getRestaurantsCategory({jwt,restaurantId:restaurant.usersRestaurant?.id,
  //     })
  //   );
  //   dispatch(fetchRestaurantsOrder({
  //     jwt,
  //     restaurantId:restaurant.usersRestaurant?.id,
  //   }))
  // },[])
  
  // useEffect(() => {
  //   if (!restaurant.usersRestaurant) {
  //     // If there is no restaurant for the user, redirect to the create restaurant page
  //     // navigate('/admin/restaurants/create-restaurant'); // Redirect to create restaurant route
  //     fetchRestaurantsOrder({
  //       jwt,
  //       restaurantId: restaurant.usersRestaurant?.id,
  //     })
  //   } else {
  //     // Fetch restaurant categories and orders if a restaurant exists
  //     dispatch(
  //       getRestaurantsCategory({
  //         jwt,
  //         restaurantId: restaurant.usersRestaurant?.id,
  //       })
  //     );
  //     dispatch(
  //       fetchRestaurantsOrder({
  //         jwt,
  //         restaurantId: restaurant.usersRestaurant?.id,
  //       })
  //     );
  //   }
  // }, [dispatch, jwt, restaurant.usersRestaurant, navigate]);

  useEffect(() => {
    if (usersRestaurant && usersRestaurant[0]?.id) {
      const restaurantId = usersRestaurant.id;
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