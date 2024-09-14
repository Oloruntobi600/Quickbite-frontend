import { Box, Card, CardHeader, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import CreateFoodCategoryForm from './CreateFoodCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantsCategory } from '../../component/State/Authentication/restaurant/Action';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const FoodCategoryTable = () => {
 
  const restaurant = useSelector((state) => state.restaurant);
  const categories = useSelector(state => state.restaurant.categories || []);

  const dispatch= useDispatch();
  const jwt=localStorage.getItem("jwt")
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log('Fetching categories for restaurant ID:', restaurant?.usersRestaurant?.[0]?.id);
    if (restaurant?.usersRestaurant?.[0]?.id) {
      dispatch(getRestaurantsCategory({
        jwt,
        restaurantId: restaurant.usersRestaurant[0].id,
      }));
    }
  }, [dispatch, jwt, restaurant?.usersRestaurant?.[0]?.id]); // Add specific dependencies
  
      useEffect(() => {
        console.log('Categories from state:', categories);
    }, [categories]);
    



  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <CreateIcon />
            </IconButton>
          }
          title={"Food Category"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {(Array.isArray(categories) ? categories : []).map((item) => (
                <TableRow
                  key={item.id} // Using item.id as key
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="left">{item.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateFoodCategoryForm />
        </Box>
      </Modal>
    </Box>
  );
}

export default FoodCategoryTable;