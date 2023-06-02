import React from 'react'
import { useState, useEffect } from 'react'
import { Table, Form, Row, Col, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../ui/Message'
import Loader from '../ui/Loader'
import { useProfileMutation } from '../slice/usersApiSlice'
import { setCredentials } from '../slice/authSlice'
import { useGetMyOrdersQuery } from '../slice/ordersApiSlice'
import { FaTimes } from 'react-icons/fa'
export const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.auth)
    const [updateProfile, { isLoading: loadingUpdate }] = useProfileMutation()
    const { data: orders, isLoading, error } = useGetMyOrdersQuery()
    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    }, [userInfo])

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password == confirmPassword) {
            try {
                const res = await updateProfile({
                    _id: userInfo._id, name, email, password
                }).unwrap()
                dispatch(setCredentials(res))
                toast.success('Profile updated successfully')

            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        } else {
            toast.error('Password does not match')
        }
    }
    return (
        <Row>
            <Col md={3}>
                <h3>User Profile</h3>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='my-2'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email' className='my-2'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password' className='my-2'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword' className='my-2'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary' className='my-2'>
                        Update
                    </Button>
                    {
                        loadingUpdate &&
                        <Loader />
                    }
                </Form>
            </Col>
            <Col md={9}>
                <h3>My Orders</h3>
                {isLoading ? <Loader /> :
                    error ? <Message variant='danger'>{error?.data?.message || error.error}</Message>
                        :
                        <Table striped hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
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
                                            <td>₹{order.totalPrice}</td>
                                            <td>{order.isPaid ? order.paidOn.substring(0, 10) :
                                                <FaTimes style={{ color: 'red' }} />
                                            }</td>
                                            <td>{order.isDelivered ? order.deliveredOn.substring(0, 10) :
                                                <FaTimes style={{ color: 'red' }} />
                                            }</td>
                                            <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button className='btn-sm' variant='light'>Details</Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>

                }
            </Col>
        </Row>
    )
}
