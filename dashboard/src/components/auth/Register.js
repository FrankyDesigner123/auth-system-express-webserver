import React, { Fragment, useState } from 'react';

import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
	// useState hook to change input onChange
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		password: '',
		role: 'user',
	});

	const { fullName, email, password, role } = formData;

	// onChange function to take input value from useState hook
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	// onSubmit function to send data
	const onSubmit = async (e) => {
		e.preventDefault();
		if (register({ fullName, email, password, role })) {
			setAlert('User has been succesfully registered.', 'success');
		} else {
			setAlert('User has been succesfully registered.', 'danger');
		}
	};

	// Redirect if logged in
	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<Fragment>
			<h1 className="large text-primary">Register Account</h1>
			<p className="lead">
				<i className="fas fa-user"></i>
				{'  '}Create Your Account.
			</p>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="text"
						placeholder="Full Name"
						name="fullName"
						value={fullName}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
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
				Already have an account? <Link to="/login">Login</Link>
			</p>
		</Fragment>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
