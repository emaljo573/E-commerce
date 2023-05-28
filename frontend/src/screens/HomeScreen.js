import { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from '../slice/productSlice';
import Loader from '../ui/Loader';
import Message from '../ui/Message';

const HomeScreen = () => {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList
    useEffect(() => {
        dispatch(getProductList())
    }, [dispatch])
    return (
        <>
            <h1>Latest Products</h1>
            {loading ?
                <Loader />
                : error ?
                    <Message variant='danger'>{error}</Message>
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