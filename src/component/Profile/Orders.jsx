import React, { useEffect, useState } from 'react'
import OrderCard from './OrderCard'
import { useDispatch, useSelector } from 'react-redux';
import { getUsersOrders } from '../State/Order/Action';



const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order); // Access the orders state
  const jwt = useSelector((state) => state.auth.jwt); // Assuming you store the JWT in the auth reducer

  useEffect(() => {
    if (jwt) {
      dispatch(getUsersOrders(jwt)); // Fetch the orders when the component mounts
    }
  }, [dispatch, jwt]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading orders: {error.message}</p>;

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-xl text-center py-7 font-semibold">My Orders</h1>
      <div className="space-y-5 w-full lg:w-1/2">
        {orders && orders.length > 0 ? (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
};

export default Orders;