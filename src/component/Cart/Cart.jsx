import React from 'react';
import CartItem from './CartItem';
import { AddLocation } from '@mui/icons-material';
import { Box, Button, Card, Divider, Grid, Modal, TextField } from '@mui/material';
import AddressCard from './AddressCard';
import { ErrorMessage, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../State/Order/Action';

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  streetAddress: "",
  state: "",
  pincode: '',
  city: ""
};

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street address is required"),
  state: Yup.string().required("State is required"),
  pincode: Yup.string().required("Pincode is required"),
  city: Yup.string().required("City is required")
});

const Cart = () => {
  const [open, setOpen] = React.useState(false);
  const { cart,auth } = useSelector(store => store.cart);
  const dispatch=useDispatch()
  const cartItems = cart?.item || [];

  console.log('Cart state:', cart); // Log entire cart state
  console.log('Cart Items Length:', cartItems.length); // Log cart items length

  // Calculate totals based on cart state
  const itemTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = 21; // Example value
  const gstAndCharges = 33; // Example value
  const finalTotal = itemTotal + deliveryFee + gstAndCharges;

  const createOrderUsingSelectedAddress = () => {};
  const handleOpenAddressModel = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = (values) => {
    const data={
      jwt:localStorage.getItem("jwt"),
      order:{
        restaurantId:cart.cartItems[0].food?.restaurant.id,
        deliveryAddress:{
          fullName:auth.user?.fullName,
          streetAddress:values.streetAddress,
          city:values.city,
          state:values.state,
          postalCode:values.pincode,
          country:"Nigeria"
        }
      }
    }
    dispatch(createOrder(data))
    console.log("Form values:", values);
  };

  return (
    <>
      <main className='lg:flex justify-between'>
        <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <CartItem key={index} item={item} />
            ))
          ) : (
            <p>No items in the cart.</p>
          )}
          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>₦{itemTotal}</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Delivery Fee</p>
                <p>₦{deliveryFee}</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>GST and Restaurant Charges</p>
                <p>₦{gstAndCharges}</p>
              </div>
              <Divider />
            </div>
            <div className="flex justify-between text-gray-400">
              <p>Total pay</p>
              <p>₦{finalTotal}</p>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[70%] px-5 pb-10 lg:pb-0">
          <div className="text-center w-full">
            <h1 className="font-semibold text-2xl py-10">
              Choose Delivery Address
            </h1>
          </div>
          <div className="flex gap-5 flex-wrap justify-center">
            {/* {addresses.map((item, index) => ( */}
              <AddressCard
                // key={index}
                handleSelectAddress={createOrderUsingSelectedAddress}
                // item={item}
                showButton={true}
              />
            {/* // ))} */}
            <Card className="flex gap-5 w-64 p-5">
              <AddLocation />
              <div className='space-y-3 text-gray-500'>
                <h1 className="font-semibold text-lg text-white">Add New Address</h1>
                <Button variant="outlined" fullWidth onClick={handleOpenAddressModel}>Add</Button>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="streetAddress"
                      label="Street Address"
                      fullWidth
                      variant="outlined"
                      error={touched.streetAddress && !!errors.streetAddress}
                      helperText={<ErrorMessage name="streetAddress" component="span" className="text-red-600" />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="state"
                      label="State"
                      fullWidth
                      variant="outlined"
                      error={touched.state && !!errors.state}
                      helperText={<ErrorMessage name="state" component="span" className="text-red-600" />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="pincode"
                      label="Pincode"
                      fullWidth
                      variant="outlined"
                      error={touched.pincode && !!errors.pincode}
                      helperText={<ErrorMessage name="pincode" component="span" className="text-red-600" />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="city"
                      label="City"
                      fullWidth
                      variant="outlined"
                      error={touched.city && !!errors.city}
                      helperText={<ErrorMessage name="city" component="span" className="text-red-600" />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => {
                        console.log("Deliver Here button clicked");
                      }}
                    >
                      Deliver Here
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
}

export default Cart;
