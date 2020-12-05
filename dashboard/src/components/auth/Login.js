import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = (props) => {
	// useState hook to change input onChange
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	// onChange function to take input value from useState hook
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	// onSubmit function to send data
	const onSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
	};

	return (
		<Fragment>
			<h1 className="large text-primary">Login</h1>
			<p className="lead">
				<i className="fas fa-user"></i>
				{'  '}Login To Your Account.
			</p>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={(e) => onChange(e)}
						minLength="6"
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Register" />
			</form>
			<p className="my-1">
				Don't have account? <Link to="/register">Register</Link>
			</p>
		</Fragment>
	);
};

Login.propTypes = {};

export default Login;
