import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Welcome from './components/Welcome';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddWord from './components/AddWord';
import Test from './components/Test';
import InitWords from './components/InitWords';
import UserWords from './components/UserWords';
import "bootstrap/dist/css/bootstrap.min.css";

const PrivateRoute = ({ children, authed }) => {
	return authed ? children : <Navigate to={"/"} />;
};

const App = () => {
	const [authed, setAuthed] = useState(false);

	return (
		<GoogleOAuthProvider clientId="640525177814-26mmv0ss9dcnrem37g8qlc47ahqi8m0g.apps.googleusercontent.com">
			<Router>
				<Navbar />
				<Routes>
					<Route exact path="/" element={<Welcome setAuthed={setAuthed} />} />
					<Route path="/home" element={<PrivateRoute authed={authed}> <Home /> </PrivateRoute>} />
					<Route path="/add-word" element={<PrivateRoute authed={authed}> <AddWord /> </PrivateRoute>} />
					<Route path="/test" element={<PrivateRoute authed={authed}> <Test /> </PrivateRoute>} />
					<Route path="/test/init-words" element={<PrivateRoute authed={authed}> <InitWords /> </PrivateRoute>} />
					<Route path="/test/user-words" element={<PrivateRoute authed={authed}> <UserWords /> </PrivateRoute>} />
				</Routes>
			</Router>
		</GoogleOAuthProvider>
	);
};

export default App;
