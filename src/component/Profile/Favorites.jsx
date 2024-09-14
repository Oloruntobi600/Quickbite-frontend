import React from 'react'
import RestaurantCard from '../Restaurant/RestaurantCard'
import { useSelector } from 'react-redux'

const Favorites = () => {
  const {auth} = useSelector(store => store);

  // Optional: Add any condition to filter favorites (e.g., restaurant with high rating)
  const filteredFavorites = auth.favorites.filter(favorite => favorite.rating >= 4.5);

  return (
    <div>
      <h1 className='py-5 text-xl font-semibold text-center'>My Favorites</h1>
      <div className='flex flex-wrap gap-3 justify-center'>
        {filteredFavorites.length > 0 ? (
          filteredFavorites.map((item) => <RestaurantCard key={item.id} item={item} />)
        ) : (
          <p>No favorites found</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
