import { Button, Card } from '@mui/material'
import React from 'react'

const OrderCard = ({ order }) => {
  const orderImage = order.items[0]?.food?.images[0] || 'https://via.placeholder.com/64';
  const orderName = order.items.map(item => item.food?.name).join(', ') || 'No items';
  const orderPrice = order.totalPrice ? `₦${order.totalPrice}` : 'Price not available';

  return (
    <Card className='flex justify-between items-center p-5'>
      <div className='flex items-center space-x-5'>
        <img
          className="h-16 w-16"
          src={orderImage}
          alt={orderName}
        />
        <div>
          <p>{orderName}</p>
          <p>{orderPrice}</p>
        </div>
      </div>
      <div>
        <Button className='cursor-not-allowed'>{order.orderStatus}</Button>
      </div>
    </Card>
  )
}

export default OrderCard
