import React from 'react'
import { useGetOrdersQuery } from '../../slice/ordersApiSlice'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { FaTimes } from 'react-icons/fa'
import Message from '../../ui/Message'
import Loader from '../../ui/Loader'

const OrderListScreen = () => {

  const { data: orders, isLoading, error } = useGetOrdersQuery();
  console.log(orders)
  return (
    <>
      <h2>Orders</h2>
      {isLoading ? <Loader /> : error ? <Message cariant='danger'>{error}</Message>
        :
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>Id</th>
              <th>User</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>₹{order.totalPrice}</td>
                  <td>{
                    order.isPaid ? order.paidOn.substring(0, 10)
                      :
                      <FaTimes style={{ color: 'red' }} />

                  }</td>
                  <td>{
                    order.isDelivered ? order.deliveredOn.substring(0, 10)
                      :
                      <FaTimes style={{ color: 'red' }} />

                  }</td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))
            }
          </tbody>

        </Table>
      }
    </>
  )
}

export default OrderListScreen