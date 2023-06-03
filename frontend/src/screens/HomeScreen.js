import { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../ui/Loader';
import Message from '../ui/Message';
import { useGetProductsQuery } from '../slice/productApiSlice';
import { useParams } from 'react-router-dom';
import { Paginate } from '../components/Paginate';
const HomeScreen = () => {
    const { pageNumber } = useParams()
    const { data, isLoading, error } = useGetProductsQuery({ pageNumber })
    return (
        <>

            {isLoading ?
                <Loader />
                : error ?
                    <Message variant='danger'>{error?.data?.message}</Message>
                    :
                    <>
                        <h1>Latest Products</h1>
                        <Row>
                            {data.products.map(el => (
                                <Col key={el._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product
                                        product={el} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate
                            pages={data.pages}
                            page={data.page}
                        />
                    </>
            }
        </>
    )
}

export default HomeScreen