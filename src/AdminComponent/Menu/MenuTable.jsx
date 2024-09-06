import { Avatar, Box, Card, CardActions, CardHeader, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import { Create, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodAction, getMenuItemsByRestaurantId } from '../../component/State/Menu/Action';



const MenuTable = () => {
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");
  // const {restaurant,ingredients,menu}=useSelector((store)=>store);
  const { restaurant, menu, ingredients } = useSelector((store) => store.restaurant);
  const navigate=useNavigate();

  useEffect(()=>{
    // dispatch(getMenuItemsByRestaurantId({
    //   restaurantId:restaurant.usersRestaurant.id,
    // jwt:localStorage.getItem("jwt"),
    // vegetarian:false,
    // seasonal:false,
    // nonveg:false,
    // foodCategory:""
    // }))  
    if (restaurant && restaurant.usersRestaurant) {
      dispatch(
        getMenuItemsByRestaurantId({
          jwt,
          restaurantId: restaurant.usersRestaurant.id,
          vegetarian: false,
          nonVeg: false,
          seasonal: false,
          foodCategory: "",
        })
      );
    }
  }, [restaurant, dispatch, jwt]);

  const handleDeleteFood=(foodId)=>{
    dispatch(deleteFoodAction({foodId,jwt}))
  }
  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader
          action={
            <IconButton onClick={() => navigate("/admin/restaurants/add-menu")} aria-label="settings">
              <CreateIcon />
            </IconButton>
          }
          title={"Menu"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Ingredients</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Availability</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu?.menuItems?.length > 0 ? (
                menu.menuItems.map((item) => (
                  <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Avatar src={item.images[0]}></Avatar>
                    </TableCell>
                    <TableCell align="right">{item?.name}</TableCell>
                    <TableCell align="right">
                      {item?.ingredients.map((ingredient) => (
                        <Chip key={ingredient?.id} label={ingredient?.name} />
                      ))}
                    </TableCell>
                    <TableCell align="right">₦{item.price}</TableCell>
                    <TableCell align="right">{item.available ? "in_stock" : "out_of_stock"}</TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={() => handleDeleteFood(item.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No menu items available
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

export default MenuTable;