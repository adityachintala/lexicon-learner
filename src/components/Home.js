import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container">
            <h1 className="text-center mt-5">Lexicon Learner</h1>
            <div className="text-center mt-5">
                <Link to="/add-word">
                    <button className="btn btn-primary btn-lg m-2">Add Word</button>
                </Link>
                <Link to="/test">
                    <button className="btn btn-primary btn-lg m-2">Test</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;