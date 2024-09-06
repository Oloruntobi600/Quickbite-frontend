import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material'
import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurantStatus } from '../../component/State/Authentication/restaurant/Action';

const RestaurantDetails = () => {
  const {restaurant}=useSelector(store=>store);
  const dispatch=useDispatch()

  console.log("checking restaurants", restaurant);

  const handleRestaurantStatus=()=>{  
    dispatch(updateRestaurantStatus({
      restaurantId:restaurant.usersRestaurant?.[0]?.id,
      jwt:localStorage.getItem("jwt")
    }))
  };
  return (
    <div className='lg:px-20 px-5 pb-10'>
      <div className='py-5 flex justify-center items-center gap-5'>

        <h1 className='text-2x1 lg:text-7xl text-center font-bold p-5'>
          {restaurant.usersRestaurant?.[0]?.name}
        </h1>
        <div>
          <Button 
          color={!restaurant.usersRestaurant?.[0]?.open?"primary":"error"} 
          className='py-[1rem] px-[2rem]' 
          variant='contained' 
          onClick={handleRestaurantStatus} 
          size='large'>
            {restaurant.usersRestaurant?.[0]?.open?"close":"open"}
          </Button>
        </div>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title={<span className="text-gray-300">Restaurant</span>}/>
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-48">Owner</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.[0]?.owner?.fullName}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Restaurant Name</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.[0]?.name}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Cuisine Type</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.[0]?.cuisineType}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Opening Hours</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.[0]?.openingHours}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Status</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.[0]?.open?<span className="px-5 py-2 rounded-full bg-green-400 
                    text-gray-950">Open</span>:<span className="px-5 py-2 
                    rounded-full bg-red-400 text-gray-950">Closed</span>}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<span className="text-gray-300">Address</span>}/>
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-48">Country</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    Code with Joe
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">City</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    Code with Joe
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Postal Code</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    Code with Joe
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Street Address</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    Code with Joe
                  </p>
                </div>
               
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader title={<span className="text-gray-300">Contact</span>}/>
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex">
                  <p className="w-48">Email</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.[0]?.contactInformation?.email}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Mobile</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.[0]?.contactInformation?.mobile}
                  </p>
                </div>
                <div className="flex">
                  <p className="w-48">Social</p>
                  <div className="flex text-gray-400 items-center pb-3 gap-2">
                    <span className="pr-5">-</span>
                    <a href={restaurant.usersRestaurant?.[0]?.contactInformation?.instagram}>
                    <InstagramIcon sx={{fontSize:"3rem"}}/>
                    </a>
                    <a href={restaurant.usersRestaurant?.[0]?.contactInformation?.twitter}>
                    <TwitterIcon sx={{fontSize:"3rem"}}/>
                    </a>
                    <a href={restaurant.usersRestaurant?.[0]?.contactInformation?.linkedin}>
                    <LinkedInIcon sx={{fontSize:"3rem"}}/>
                    </a>
                    <a href={restaurant.usersRestaurant?.[0]?.contactInformation?.facebook}>
                    <FacebookIcon sx={{fontSize:"3rem"}}/>
                    </a>
                  </div>
                </div>
               
                
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default RestaurantDetails
