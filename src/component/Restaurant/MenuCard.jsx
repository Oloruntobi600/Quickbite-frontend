import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { categorizeIngredients } from '../util/categorizeIngredients';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../State/Cart/Action';

const MenuCard = ({ item }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const dispatch = useDispatch();

  const handleCheckBoxChange = (itemName) => {
    setSelectedIngredients(prevState =>
      prevState.includes(itemName)
        ? prevState.filter(name => name !== itemName)
        : [...prevState, itemName]
    );
  };

  const handleAddItemToCart = (e) => {
    e.preventDefault();
    const reqData = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        foodId: item.id,
        quantity: 1,
        ingredients: selectedIngredients,
      },
    };
    dispatch(addItemToCart(reqData));
    console.log("req data ", reqData);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className='lg:flex items-center justify-between'>
          <div className='lg:flex items-center lg:gap-5'>
            <img
              className='w-[7rem] h-[7rem] object-cover'
              src={item.images[0]}
              alt={item.name}
            />
            <div className='space-y-1 lg:space-y-5 lg:max-w-2x1'>
              <p className="font-semibold text-xl">{item.name}</p>
              <p>₦{item.price}</p>
              <p className="text-gray-400">{item.description}</p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleAddItemToCart}>
          <div className="flex gap-5 flex-wrap">
            {Object.keys(categorizeIngredients(item.ingredients)).map((category) => (
              <div key={category}>
                <p>{category}</p>
                <FormGroup>
                  {categorizeIngredients(item.ingredients)[category].map((ingredient) => (
                    <FormControlLabel
                      key={ingredient.name} // Ensure unique key for each ingredient
                      control={
                        <Checkbox
                          checked={selectedIngredients.includes(ingredient.name)}
                          onChange={() => handleCheckBoxChange(ingredient.name)}
                        />
                      }
                      label={ingredient.name}
                    />
                  ))}
                </FormGroup>
              </div>
            ))}
          </div>
          <div className="pt-5">
            <Button
              variant="contained"
              type="submit"
              disabled={false} // Update based on your logic
            >
              Add to Cart
            </Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCard;
