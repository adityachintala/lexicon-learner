import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Words.css";

const Welcome = ({ setAuthed }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const handleGoogleLoginSuccess = (response) => {
        setIsAuthenticated(true);
        setAuthed(true);
        navigate('/home');
    };

    return (
        <div className="container" style={{ maxWidth: '1000px' }}>
            <div className="container mt-5">
                <div className="card shadow">
                    <div className="card-body">
                        <h1 className="card-title display-4 text-center welcome-title">
                            LEXICON LEARNER APP
                        </h1>
                        <p className="card-text" style={{ fontSize: '1.2rem', textAlign: 'center' }}>
                            Lexicon Learner is a web application designed to help users expand their vocabulary
                            by providing a platform for learning and testing their knowledge of words.
                            By leveraging Lexicon Learner, users can enhance their vocabulary, reinforce
                            word meanings, and improve language skills in an interactive and engaging manner.
                        </p>
                    </div>
                </div>

                <div className="mt-4" style={{ textAlign: 'center' }}>
                    <h2>Sign in and start using now!</h2>
                    {isAuthenticated ? (
                        <div>
                            {/* <Link to="/add-word" className="btn btn-primary mr-2">Add Word</Link>
                            <Link to="/test" className="btn btn-primary">Test</Link> */}
                        </div>
                    ) : (
                        <div className="mt-4" style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                            <GoogleLogin
                                style={{ textAlign: 'center' }}
                                onSuccess={handleGoogleLoginSuccess}
                                clientId="640525177814-26mmv0ss9dcnrem37g8qlc47ahqi8m0g.apps.googleusercontent.com"
                                onFailure={(response) => console.log('Google login response:', response)}
                                buttonText="Login with Google"
                                className="btn btn-danger"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Welcome;
