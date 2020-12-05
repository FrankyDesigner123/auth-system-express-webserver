import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Landing = (props) => {
	return (
		<section className="landing">
			<div className="dark-overlay">
				<div className="landing-inner">
					<h1 className="x-large">Dashboard</h1>
					<p className="lead">
						System Auth Dashboard, manage users and tasks from web application.
					</p>
					<div className="buttons">
						<Link to="/register" className="btn btn-primary">
							Register Account
						</Link>
						<Link to="/login" className="btn btn-light">
							Log In
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

Landing.propTypes = {};

export default Landing;
