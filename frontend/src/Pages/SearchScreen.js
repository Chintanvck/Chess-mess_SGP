// import React from 'react'
// import { useParams } from 'react-router-dom';
// import HomePage from './HomePage'

// export default function SearchScreen() {
//     const params = useParams();
//     const { name="all" } = params;
//   return (
//     <div>
//         {name}
//     </div>
//   )
// }

import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import { Helmet } from 'react-helmet-async';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Rating from '../components/Rating/Rating';
import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';
import Button from 'react-bootstrap/Button';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import ExploreCard from '../components/ExploreSection/ExploreCard/ExploreCard';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages,
                countProducts: action.payload.countProducts,
                loading: false,
            };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

const prices = [
    {
        name: '1₹ to 50₹',
        value: '1-50',
    },
    {
        name: '51₹ to 200₹',
        value: '51-200',
    },
    {
        name: '201₹ to 1000₹',
        value: '201-1000',
    },
];

export const ratings = [
    {
        name: '4stars & up',
        rating: 4,
    },

    {
        name: '3stars & up',
        rating: 3,
    },

    {
        name: '2stars & up',
        rating: 2,
    },

    {
        name: '1stars & up',
        rating: 1,
    },
];

export default function SearchScreen() {
    const navigate = useNavigate();
    // const { search } = useLocation();
    // const sp = new URLSearchParams(search); // /search?category=Shirts
    // const name = sp.get('name') || 'all';
    // const price = sp.get('price') || 'all';
    // const rating = sp.get('rating') || 'all';
    // const page = sp.get('page') || 1;

    // const {
    //     name = 'all',
    //     price = 'all',
    //     rating = 'all',
    //     page = 1,
    //   } = useParams();

      const params = useParams();
      const { name = 'all', price = 'all', rating = 'all', page = 1} = params ;

    const [{ loading, error, products, pages, countProducts }, dispatch] =
        useReducer(reducer, {
            loading: true,
            error: '',
        });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    `/api/products/search?page=${page}&name=${name}&price=${price}&rating=${rating}`
                );
                dispatch({ type: 'FETCH_SUCCESS', payload: data });
            } catch (err) {
                dispatch({
                    type: 'FETCH_FAIL',
                    payload: getError(error),
                });
            }
        };
        fetchData();
    }, [error, page, price, name, rating]);

    const getFilterUrl = (filter) => {
        const filterPage = filter.page || page;
        const filterName = filter.name || name;
        const filterRating = filter.rating || rating;
        const filterPrice = filter.price || price;
        return `/search/${filterName}/${filterPrice}/${filterRating}/${filterPage}`;
    };
    return (
        <div>
            <Helmet>
                <title>Search Products</title>
            </Helmet>
            <Row>
                <Col md={3}>
                    <div>
                        <h3>Price</h3>
                        <ul>
                            <li>
                                <Link
                                    className={'all' === price ? 'text-bold' : ''}
                                    to={getFilterUrl({ price: 'all' })}
                                    style={{ textDecoration: 'none' }}
                                >
                                    Any
                                </Link>
                            </li>
                            {prices.map((p) => (
                                <li key={p.value}>
                                    <Link
                                        to={getFilterUrl({ price: p.value })}
                                        className={p.value === price ? 'text-bold' : ''}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        {p.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Avg. Customer Review</h3>
                        <ul>
                            {ratings.map((r) => (
                                <li key={r.name}>
                                    <Link
                                        to={getFilterUrl({ rating: r.rating })}
                                        className={`${r.rating}` === `${rating}` ? 'text-bold' : ''}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Rating caption={' & up'} rating={r.rating}></Rating>
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link
                                    to={getFilterUrl({ rating: 'all' })}
                                    className={rating === 'all' ? 'text-bold' : ''}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Rating caption={' & up'} rating={0}></Rating>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </Col>
                <Col md={9}>
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <>
                            <Row className="justify-content-between mb-3">
                                <Col md={6}>
                                    <div>
                                        {countProducts === 0 ? 'No' : countProducts} Results
                                        {name !== 'all' && ' : ' + name}
                                        {price !== 'all' && ' : Price ' + price}
                                        {rating !== 'all' && ' : Rating ' + rating + ' & up'}
                                        {name !== 'all' ||
                                            rating !== 'all' ||
                                            price !== 'all' ? (
                                            <Button
                                                variant="light"
                                                onClick={() => navigate('/search')}
                                            >
                                                <i className="fas fa-times-circle"></i>
                                            </Button>
                                        ) : null}
                                    </div>
                                </Col>
                            </Row>
                            {products.length === 0 && (
                                <MessageBox>No Product Found</MessageBox>
                            )}

                            <Row>
                                {products.map((product) => (
                                    <Col sm={6} lg={4} className="mb-3" key={product._id}>
                                        <ExploreCard product={product}></ExploreCard>
                                    </Col>
                                ))}
                            </Row>

                            <div>
                                {[...Array(pages).keys()].map((x) => (
                                    <LinkContainer
                                        key={x + 1}
                                        className="mx-1"
                                        to={getFilterUrl({ page: x + 1 })}
                                    >
                                        <Button
                                            className={Number(page) === x + 1 ? 'text-bold' : ''}
                                            variant="light"
                                        >
                                            {x + 1}
                                        </Button>
                                    </LinkContainer>
                                ))}
                            </div>
                        </>
                    )}
                </Col>
            </Row>
        </div>
    );
}