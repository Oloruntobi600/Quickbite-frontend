import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateRestaurantForm from '../AdminComponent/CreateRestaurantForm/CreateRestaurantForm'
import { useDispatch, useSelector } from 'react-redux'
import Admin from '../AdminComponent/Admin/Admin'
import PaymentSuccess from '../component/PaymentSuccess/PaymentSuccess'
import { getRestaurantByUSerId } from '../component/State/Authentication/restaurant/Action'

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
  const usersRestaurant = restaurant.usersRestaurant; // Extract usersRestaurant directly from the restaurant state
  // const jwt = localStorage.getItem('jwtToken'); // Replace with actual jwt logic or retrieve from the state
  // const jwt = useSelector(state => state.auth.jwt);
  const jwt=localStorage.getItem("jwt")

  console.log("Current restaurant state in AdminRoute:", restaurant);

  useEffect(() => {
    if (jwt && !usersRestaurant) { // Check if usersRestaurant is null before fetching
      console.log("Fetching restaurant data with JWT:", jwt);
      dispatch(getRestaurantByUSerId(jwt)); // Dispatching action to fetch user's restaurant
    }
  }, [dispatch, usersRestaurant, jwt]); // Ensure dispatch, usersRestaurant, and jwt are in the dependency array

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
        <Route
          path='/create-restaurant'
          element={<CreateRestaurantForm />}
        />
        <Route
          path='/'
          element={!usersRestaurant ? <CreateRestaurantForm /> : <Admin />}
        />
        <Route path='/payment' element={<PaymentSuccess />} />
      </Routes>
    </div>
  );
}

export default AdminRoute;
