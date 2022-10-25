import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox/LoadingBox';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Rating from '../components/Rating/Rating';
import { Helmet } from 'react-helmet-async';
import MessageBox from '../components/MessageBox/MessageBox';
import { getError } from '../utils';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}

function ProductScreen() {
  const params = useParams();
  const { rname } = params;

  const [product, setProduct] = useState([]);
    const [{ loading, error }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get(`/api/products/rname/${rname}`);
                setProduct(result.data);
                dispatch({ type: 'FETCH_SUCCESS' });
            }
            catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }

        };
        fetchData();
    }, [rname])
  return (
    loading ? (<div><LoadingBox /></div>
    ) : error ? (<div><MessageBox variant='danger'>{error}</MessageBox></div>
    ) :(
        <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={product.imgdata}
            alt={product.rname}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.rname}</title>
              </Helmet>
              <h1>{product.rname}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>Price : {product.price}₹</ListGroup.Item>
            <ListGroup.Item>
              Address:
              <p>{product.address}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>{product.price} ₹</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    )
  );
}
export default ProductScreen;