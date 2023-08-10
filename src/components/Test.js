import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const Test = () => {
    return (
        <div className="container">
            <h1 className="text-center mt-5">TEST</h1>
            <div className="text-center mt-5">
                <Link to="/test/init-words">
                    <button className="btn btn-primary btn-lg m-2">Initial words</button>
                </Link>
                <Link to="/test/user-words">
                    <button className="btn btn-primary btn-lg m-2">Your words</button>
                </Link>
            </div>
        </div>
    );
};

export default Test;
