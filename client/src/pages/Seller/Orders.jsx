import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets, dummyOrders } from '../../assets/assets'
import toast from 'react-hot-toast'
const Orders = () => {
  const { currency, axios } = useAppContext()
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
     try {
            const { data } = await axios.get("/api/order/seller");
            if (data.success) {
                console.log(data.orders)
                setOrders(data.orders);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
  }

  useEffect(() => {
    fetchOrders();
  }, [])

  return (
  <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
  <div className="md:p-10 p-4  space-y-4 ">
    <h2 className="text-lg font-medium">Orders List</h2>
    {orders.map((order, index) => (
      <div key={index} className="flex flex-col md:flex-row justify-between md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300  bg-gray-100">
        <div className="flex gap-5 items-center">
          <img className="w-12 h-12 object-cover " src={assets.box_icon} alt="boxIcon" />
          <>
            <div className='flex flex-col  gap-1'> 
              {order.items.map((item, index) => {
                return <p key={index}>
                  {item.product.name} <span className={`text-primary`}>x {item.quantity}</span>
                </p>
              })}
            </div>

          </>
        </div>

        <div className="text-sm">
          <p className='font-medium mb-1 '>{order.address.firstName} {order.address.lastName}</p>
          <p className='opacity-70'>{order.address.street}, {order.address.city}, {order.address.state},{order.address.zipcode}, {order.address.country}</p>
        </div>

        <p className="font-medium text-lg mg-auto text-black/70">{currency} {order.amount}</p>

        <div className="flex flex-col text-sm">
          <p>Method: {order.paymentType}</p>
          <p>Date: {new Date(order.updatedAt).toLocaleDateString()}</p>
          <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
        </div>
      </div>
    ))}
  </div>
  </div>
  );
}

export default Orders