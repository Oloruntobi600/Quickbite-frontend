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
   // Extract usersRestaurant directly from the restaurant state
  // const jwt = localStorage.getItem('jwtToken'); // Replace with actual jwt logic or retrieve from the state
  // const jwt = useSelector(state => state.auth.jwt);
  const jwt=localStorage.getItem("jwt")
  console.log("JWT from localStorage:", jwt);

  console.log("Current restaurant state in AdminRoute:", usersRestaurant);

  useEffect(() => {
    console.log("Dispatching getRestaurantByUserId with JWT:", jwt);
    if (!usersRestaurant) {
      dispatch(getRestaurantByUserId(jwt));
    }
  }, [dispatch, jwt, usersRestaurant]);
  console.log("Current restaurant state in AdminRoute:", restaurant);
  return (
    <div>
      {/* <Routes>
        <Route
          path='/*'
          element={
            !restaurant.usersRestaurant ? <CreateRestaurantForm /> : <Admin />
          }
        />
        <Route path='/payment' element={<PaymentSuccess />} />
      </Routes> */}
      <Routes>
        {/* <Route
          path='/create-restaurant'
          element={<CreateRestaurantForm />}
        />
        <Route
          path='/'
          element={!usersRestaurant ? <CreateRestaurantForm /> : <Admin />}
        />
        <Route path='/payment' element={<PaymentSuccess />} /> */}
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
