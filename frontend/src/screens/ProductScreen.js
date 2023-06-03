import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
//import { getProducDetails } from '../slice/productSlice'
import Loader from '../ui/Loader'
import Message from '../ui/Message'
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slice/productApiSlice'
import { addToCart } from '../slice/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
const ProductScreen = () => {
    const { id: productId } = useParams()
    const dispatch = useDispatch()
    const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId)
    const navigate = useNavigate()
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const { userInfo } = useSelector(state => state.auth)
    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }))
        navigate(`/cart`)
    }

    const [createReview, { isLoading: loadingProductReview }] =
        useCreateReviewMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await createReview({
                productId,
                rating,
                comment,
            }).unwrap();
            refetch();
            toast.success('Review created successfully');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    
    return (
        <>
            <Link to={'/'} className='btn btn-light my-3'>Go Back</Link>
            {
                isLoading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    :
                    <>
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Col>
                            <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating
                                            value={product.rating}
                                            text={`${product.numReviews} reviews`}
                                            color='#f8e825'
                                        />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Price: ₹{product.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Description: {product.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col> <strong> ₹{product.price}</strong></Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status:</Col>
                                                <Col>
                                                    {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {
                                            product.countInStock > 0 && (
                                                <ListGroup.Item>
                                                    <Row>
                                                        <Col>Qty</Col>
                                                        <Col>
                                                            <Form.Control
                                                                as="select"
                                                                value={qty}
                                                                onChange={(e => {
                                                                    setQty(Number(e.target.value))
                                                                })}
                                                            >
                                                                {
                                                                    [...Array(product.countInStock).keys()].map(x => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}
                                                                        </option>
                                                                    ))
                                                                }

                                                            </Form.Control>
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            )
                                        }
                                        <ListGroup.Item>
                                            <Button className='btn-block' type='button'
                                                disabled={product.countInStock > 0 ? false : true}
                                                onClick={addToCartHandler}
                                            >
                                                Add To Cart
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>

                                </Card>
                            </Col>
                        </Row>
                        <Row className='mt-2'>
                            <Col md={6} >
                                <h3>Reviews</h3>
                                {product.reviews.length == 0 &&
                                    <Message>No reviews</Message>
                                }
                                <ListGroup variant='flush'>
                                    {
                                        product.reviews.map(review => (
                                            <ListGroup.Item key={review._id}>
                                                <strong>{review.name}</strong>
                                                <Rating
                                                    color='#f8e825'
                                                    value={review.rating}
                                                />
                                                <p>{review.createdAt}</p>
                                                <p>{review.comment}</p>
                                            </ListGroup.Item>
                                        ))
                                    }
                                    <ListGroup.Item>
                                        <h3>Write a customer review</h3>
                                        {
                                            loadingProductReview && <Loader />
                                        }
                                        {
                                            userInfo ?
                                                (<Form onSubmit={submitHandler}>
                                                    <Form.Group controlId='rating' className='my-2'>
                                                        <Form.Label>
                                                            Rating
                                                        </Form.Label>
                                                        <Form.Control
                                                            as='select'
                                                            value={rating}
                                                            onChange={(e) => setRating(Number(e.target.value))}
                                                        >

                                                            <option value=''>Select</option>
                                                            <option value='1'>1-Poor</option>
                                                            <option value='2'>2-Fair</option>
                                                            <option value='3'>3-Good</option>
                                                            <option value='4'>4-Very Good</option>
                                                            <option value='5'>5-Excelent</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                    <Form.Group className='my-2' controlId='comment'>
                                                        <Form.Label>Comment</Form.Label>
                                                        <Form.Control
                                                            as='textarea'
                                                            row='3'
                                                            required
                                                            value={comment}
                                                            onChange={(e) => setComment(e.target.value)}
                                                        ></Form.Control>
                                                    </Form.Group>
                                                    <Button
                                                        disabled={loadingProductReview}
                                                        type='submit'
                                                        variant='primary'
                                                    >
                                                        Submit
                                                    </Button>
                                                </Form>) :
                                                <Message>
                                                    Please <Link to='/login'>sign in</Link> to write a review
                                                </Message>

                                        }
                                    </ListGroup.Item>

                                </ListGroup>
                            </Col>
                        </Row>
                    </>
            }
        </>
    )
}

export default ProductScreen