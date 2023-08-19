import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container-fluid home-div">
            <div className="row">
                <div className='col-lg-6'>
                    <h1>So, Let's get started...</h1>
                </div>
                <div className='d-flex col-lg-6'>
                    <div className="row m-auto " style={{textAlign:'center'}}>
                        <div className="col-sm-6 col-lg-12">
                            <Link to="/add-word">
                                <button className="btn btn-primary btn-lg my-2">Add Word</button>
                            </Link>
                        </div>
                        <div className="col-sm-6 col-lg-12">
                        <Link to="/test">
                            <button className="btn btn-outline-dark btn-lg my-2">Test</button>
                        </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;