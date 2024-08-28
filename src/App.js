// App.js
import React, { useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './component/State/Authentication/Action';
import { darkTheme } from './Theme/DarkTheme';
import CustomerRoute from './Routers/CustomerRoute';
import { findCart } from './component/State/Cart/Action';

// function App() {
//   const dispatch = useDispatch();
//   const jwt = localStorage.getItem('jwt');
//   const { auth } = useSelector((store) => store);

//   useEffect(() => {
//     dispatch(getUser(auth.jwt || jwt));
//     dispatch(findCart(jwt))
//   }, [auth.jwt]);

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <CssBaseline />
//       <CustomerRoute />
//     </ThemeProvider>
//   );
// }

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const userJwt = useSelector((state) => state.auth.jwt);  // Directly accessing jwt

  useEffect(() => {
    console.log('JWT available:', userJwt || jwt);
    dispatch(getUser(userJwt || jwt)); // Using the selected jwt
    dispatch(findCart(userJwt || jwt));
  }, [userJwt, jwt, dispatch]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <CustomerRoute />
    </ThemeProvider>
  );
}

export default App;
