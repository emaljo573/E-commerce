import { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../ui/Loader';
import Message from '../ui/Message';
import { useGetProductsQuery } from '../slice/productApiSlice';
const HomeScreen = () => {

    const { data: products, isLoading, error } = useGetProductsQuery()
    return (
        <>
            <h1>Latest Products</h1>
            {isLoading ?
                <Loader />
                : error ?
                    <Message variant='danger'>{error?.data?.message}</Message>
                    :
                    <Row>
                        {products.map(el => (
                            <Col key={el._id} sm={12} md={6} lg={4} xl={3}>
                                <Product
                                    product={el} />
                            </Col>
                        ))}
                    </Row>
            }
        </>
    )
}

export default HomeScreen