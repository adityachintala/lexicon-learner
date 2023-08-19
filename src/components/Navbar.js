import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-div">
                <Link className="navbar-brand" to="/">
                    <h3>Lexicon Learner</h3>
                </Link>
        </nav>


    );
};

export default Navbar;
