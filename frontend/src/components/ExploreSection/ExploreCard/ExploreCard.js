import React from 'react'
import './ExploreCard.css'
import Rating from '../../Rating/Rating'
import {Link} from 'react-router-dom'

const ExploreCard = ({ product }) => {

    return (
        <div className='explore-card cur-po'>
            <Link to={`/product/${product.rname}`} style={{ textDecoration: 'none' }}>
            <div className='explore-card-cover'>
                
                <img src={product.imgdata} alt={product.rname} className='explore-card-image'></img>
                
            </div>
            <div className='res-row'>
                <div className='res-name'>{product.rname}</div>
                    <div className='res-rating absolute-center'>
                        {/* <span>{product.rating}&nbsp;★</span> */}
                        <Rating rating={product.rating} numReviews={product.numReviews} />
                    </div>
            </div>
            <div className='res-row'>
                    <div className='res-cuisine'>
                        <h5 className='res-cuisine-tag'>{product.address}</h5>
                    </div>
                    <div className='approx-price'>{product.price}₹</div>
            </div>
            </Link>
        </div>
    )
}

export default ExploreCard