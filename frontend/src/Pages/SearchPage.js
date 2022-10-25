import React, { useReducer, useState, useEffect } from 'react';
import logger from 'use-reducer-logger';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';
import Cards from '../components/Card/Card';
import '../Styles/SearchPageCss.css';


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
const SearchPage = () => {

    const [item, setItem] = useState();
    const [menuItem, setMenuItems] = useState();



    const [fdata, setFdata] = useState([]);
    const [copydata, setCopyData] = useState([]);
    const [{ loading, error }, dispatch] = useReducer(logger(reducer), {
        loading: true,
        error: '',
    })

    const chanegData = (e) => {
        let getchangedata = e.toLowerCase();

        if (getchangedata === "") {
            setCopyData(fdata);
        } else {
            let storedata = copydata.filter((ele, k) => {
                return ele.rname.toLowerCase().match(getchangedata);
            });

            setCopyData(storedata)
        }
    }
    const filterItem = (curcat) => {
        const newItem = fdata.filter((newVal) => {
            return newVal.price === curcat;
        });
        setItem(newItem);
        console.log(item)
    };

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('api/products');
                setCopyData(result.data);
                setFdata(result.data);
                setItem(result.data)
                setMenuItems([...new Set(result.data.map((Val) => Val.price))]);

                dispatch({ type: 'FETCH_SUCCESS' });
            }
            catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });
            }

        };
        fetchData();
    }, [])
    return (
        <div>
            <Form className='d-flex justify-content-center align-items-center mt-3'>
                <Form.Group className=" mx-2 col-lg-4" controlId="formBasicEmail">

                    <Form.Control type="text"
                        onChange={(e) => chanegData(e.target.value)}
                        placeholder="Search Restaurant" />
                </Form.Group>
            </Form>
            <section className='iteam_section mt-4 container'>
                {/* <h2 className='px-4' style={{ fontWeight: 400 }}>Restaurants in Ahmedabad Open now</h2> */}

                <div className="row mt-2 d-flex justify-content-around align-items-center">
                    {
                        loading ? (<LoadingBox />
                        ) :
                            error ? (<MessageBox variant='danger'>{error}</MessageBox>
                            ) : (
                                copydata && copydata.length ? <Cards data={copydata} /> : "empty")}
                </div>
            </section>
        </div>
    )
}

export default SearchPage
