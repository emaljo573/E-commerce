import { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../ui/Loader';
import Message from '../ui/Message';
import { useGetProductsQuery } from '../slice/productApiSlice';
import { useParams, Link } from 'react-router-dom';
import { Paginate } from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
const HomeScreen = () => {
    const { pageNumber, keyword } = useParams()
    const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber })
    return (
        <>
            {!keyword ?
                <ProductCarousel />
                :
                (<Link to='/' className='btn btn-light mb-3'>Go  Back</Link>)
            }
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
                            keyword={keyword ? keyword : ''}
                        />
                    </>
            }
        </>
    )
}

export default HomeScreen