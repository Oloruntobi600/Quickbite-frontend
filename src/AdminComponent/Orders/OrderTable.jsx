import { Avatar, AvatarGroup, Box, Button, Card, CardHeader, Chip, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantsOrder, updateOrderStatus } from '../../component/State/Restaurant Order/Action';


const orderStatus =[
  {label:"Pending", value:"PENDING"},
  {label:"Completed", value:"COMPLETED"},
  {label:"Out For Delivery", value:"OUT_FOR_DELIVERY"},
  {label:"Delivered", value:"DELIVERED"},
]
const OrderTable = () => {
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");
  const { restaurant, menu, ingredients } = useSelector((store) => store.restaurant);
  const restaurantOrder = useSelector((store) => store.restaurantOrder); 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };
  useEffect(() => {
    console.log("Restaurant:", restaurant);
        console.log("Restaurant Orders:", restaurantOrder);
        if (restaurant && restaurant.usersRestaurant && restaurant.usersRestaurant.length > 0) {
          dispatch(fetchRestaurantsOrder({
              jwt,
              restaurantId: restaurant.usersRestaurant[0].id,
          }));
      }
  }, [restaurant, dispatch, jwt]);

  const handleUpdateOrder = (orderStatus) => {
    if (selectedOrderId) {
      dispatch(updateOrderStatus({ orderId: selectedOrderId, orderStatus, jwt }));
    }
    handleClose();
  };


  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader
          title={"All Orders"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Ingredients</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder?.orders?.length > 0 ? (
                restaurantOrder.orders.map((item) => (
                  <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell align="right">
                      <AvatarGroup>
                        {item.items.map((orderItem) => (
                          <Avatar key={orderItem.id} src={orderItem.food?.images[0]} />
                        ))}
                      </AvatarGroup>
                    </TableCell>
                    <TableCell align="right">{item.customer?.fullName}</TableCell>
                    <TableCell align="right">
                    ₦{item.items.reduce((total, orderItem) => total + (orderItem.food?.price || 0), 0)}
        </TableCell>
                    <TableCell align="right">
                      {item.items.map((orderItem) => (
                        <p key={orderItem.id}>{orderItem.food?.name}</p>
                      ))}
                    </TableCell>
                    <TableCell align="right">
                      {item.items.map((orderItem) => (
                        <div key={orderItem.id}>
                          {Array.isArray(orderItem.ingredients) ? orderItem.ingredients.map((ingredient) => (
                            <Chip key={ingredient} label={ingredient} />
                          )) : null}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell align="right">{item.orderStatus}</TableCell>
                    <TableCell align="right">
                      <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={(event) => handleClick(event, item.id)}
                      >
                        Update
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open && selectedOrderId === item.id}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        {orderStatus.map((status) => (
                          <MenuItem key={status.value} onClick={() => handleUpdateOrder(status.value)}>
                            {status.label}
                          </MenuItem>
                        ))}
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No orders available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default OrderTable;
