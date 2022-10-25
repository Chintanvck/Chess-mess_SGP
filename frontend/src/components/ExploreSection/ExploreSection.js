import React, { useState, useReducer, useEffect } from 'react'
import logger from 'use-reducer-logger'
import axios from 'axios'
import './ExploreSection.css'
import ExploreCard from './ExploreCard/ExploreCard'
import LoadingBox from '../LoadingBox/LoadingBox'
import MessageBox from '../MessageBox/MessageBox'

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

const ExploreSection = ({ collectionName }) => {
    const [products, setProducts] = useState([]);
    const [{ loading, error }, dispatch] = useReducer(logger(reducer), {
        loading: true,
        error: '',
    })

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('api/products');
                setProducts(result.data);
                dispatch({ type: 'FETCH_SUCCESS' });
            }
            catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }

        };
        fetchData();
    }, [])
    return (
        <div className='max-width explore-section'>
        <div className='collection-title'>
            {collectionName}
        </div>
        <div className='explore-grid'>
            {
                loading? (<LoadingBox />
                ) :
                error? (<MessageBox variant='danger'>{error}</MessageBox>
                ):(
                    products.map((product)=>{
                        return <div key={product._id}><ExploreCard product={product}/></div>
                    })
                )
            }
        </div>
    </div>
    )
}

export default ExploreSection