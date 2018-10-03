import React, { Component } from "react";

import styles from './styles.css';
import CSSModules from 'react-css-modules';

import { connect } from 'react-redux';

class About extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.onGetAbout();
	}

	render() {
		const { fetching, error, about } = this.props;
		if (error) {
			return <div>Error: {error}</div>;
		} else if (fetching || !about) {
			return <div>Loading...</div>;
		} else {
			return (
				<section className="wrapper gray-background about padding-top-footer">
					<div className="wrapper__content">
						<section>
							<h3>О компании</h3>
							<p><img src={about.logo} /></p>
							<p>{about.orgName}</p>
							<p>{about.orgDescr}</p>
						</section>
					</div>
				</section>
			);
		}

	}
}


const putStateToProps = (state) => {
	return {
		about: state.about,
		fetching: state.fetching,
		error: state.error
	};
}

const putActionsToProps = (dispatch) => {
	return {
		onGetAbout: () => dispatch({ type: 'API_REQUEST_ABOUT' }),
	}
};

export default connect(putStateToProps, putActionsToProps)(CSSModules(About, styles));