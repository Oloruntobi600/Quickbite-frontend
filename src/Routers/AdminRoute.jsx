import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateRestaurantForm from '../AdminComponent/CreateRestaurantForm/CreateRestaurantForm'
import { useDispatch, useSelector } from 'react-redux'
import Admin from '../AdminComponent/Admin/Admin'
import PaymentSuccess from '../component/PaymentSuccess/PaymentSuccess'
import { getRestaurantByUserId, getRestaurantByUSerId } from '../component/State/Authentication/restaurant/Action'

// const AdminRoute = () => {
//   const {restaurant}=useSelector(store=>store)
//   return (
//     <div>
//       <Routes>
//         <Route 
//         path='/*' 
//         element={
//           !restaurant.usersRestaurant? <CreateRestaurantForm/> :<Admin/>
//           }
//           ></Route>
//            <Route path='/payment' element={<PaymentSuccess />} /> 
           
//       </Routes>
//     </div>
//   )
// }

// export default AdminRoute

const AdminRoute = () => {
  const dispatch = useDispatch();
  const restaurant = useSelector(state => state.restaurant);
  const { usersRestaurant, restaurants, } = useSelector(state => state.restaurant);
  const jwt=localStorage.getItem("jwt")

  useEffect(() => {
    if (!usersRestaurant) {
      dispatch(getRestaurantByUserId(jwt));
    }
  }, [dispatch, jwt, usersRestaurant]);
  return (
    <div>
      <Routes>
        <Route
          path='/*'
          element={
            !usersRestaurant ? <CreateRestaurantForm /> : <Admin />
          }
        />
        <Route path='/payment' element={<PaymentSuccess />} />
      </Routes>
    </div>
  );
}

export default AdminRoute;
