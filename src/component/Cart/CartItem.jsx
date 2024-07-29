import React, { useState } from 'react';
import { Chip, IconButton } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch } from 'react-redux';
import { updateCartItem } from '../State/Cart/Action';

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity); // Initial quantity
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleIncrease = () => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity + 1;

      const cartPayload = {
        cartItemId: item.id,
        quantity: newQuantity
      };

      dispatch(updateCartItem(cartPayload));
      return newQuantity;
    });
  };

  const handleDecrease = () => {
    setQuantity(prevQuantity => {
      if (prevQuantity > 1) {
        const newQuantity = prevQuantity - 1;

        const cartPayload = {
          cartItemId: item.id,
          quantity: newQuantity
        };

        dispatch(updateCartItem(cartPayload));
        return newQuantity;
      }
      return prevQuantity;
    });
  };

  return (
    <div className='px-5'>
      <div className='lg:flex items-center lg:space-x-5'>
        <div>
          <img
            className="w-[5rem] h-[5rem] object-cover"
            src={item.food.images[0]}
            alt=""
          />
        </div>
        <div className="flex items-center justify-between lg:w-[70%]">
          <div className="space-y-1 lg:space-y-3 w-full">
            <p>{item.food.name}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-1">
                <IconButton onClick={handleDecrease}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <div className="w-5 h-5 text-xs flex items-center justify-center">
                  {quantity}
                </div>
                <IconButton onClick={(handleIncrease)}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <p>₦{item.totalPrice}</p>
        </div>
      </div>
      <div className="pt-3 space-x-2">
        {item.ingredients.map((ingredient) => <Chip key={ingredient} label={ingredient} />)}
      </div>
    </div>
  );
};

export default CartItem;
