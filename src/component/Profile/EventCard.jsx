import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const EventCard = () => {
  return (
    <div>
      <Card sx={{width:250}}>
        <CardMedia 
        sx={{height:200}}
        image='https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=600' />

        <CardContent>
            <Typography variant='h10'>
                Nigerian Fast Food
            </Typography>
            <Typography variant='body2'>
                50% off on your first order
            </Typography>
            <div className='py-2 space-y-2'>
                <p>{"Nigeria"}</p>
                <p className='text-sm text-blue-400'>December 14, 2024 12:00 AM</p>
                <p className='text-sm text-red-400'>December 15, 2024 12:00 AM</p>
            </div>
        </CardContent>

        {false && <CardActions>
            <IconButton>
                <DeleteIcon/>
            </IconButton>
        </CardActions>}
      </Card>
    </div>
  )
}

export default EventCard
