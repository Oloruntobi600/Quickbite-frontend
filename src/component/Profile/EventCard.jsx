import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';

const EventCard = ({ eventData })  => {
    return (
      <div>
        <Card sx={{ width: 250 }}>
          <CardMedia
            sx={{ height: 200 }}
            image={eventData.imageUrl || 'https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=600'} // Use a default image if eventData.imageUrl is not available
          />
          <CardContent>
            <Typography variant='h6'>
              {eventData.title || 'Event Title'}
            </Typography>
            <Typography variant='body2'>
              {eventData.description || 'Event Description'}
            </Typography>
            <div className='py-2 space-y-2'>
              <p>{eventData.location || 'Event Location'}</p>
              <p className='text-sm text-blue-400'>
                {new Date(eventData.startDate).toLocaleString() || 'Start Date'}
              </p>
              <p className='text-sm text-red-400'>
                {new Date(eventData.endDate).toLocaleString() || 'End Date'}
              </p>
            </div>
          </CardContent>
  
          {false && (
            <CardActions>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          )}
        </Card>
      </div>
    );
  };

export default EventCard
