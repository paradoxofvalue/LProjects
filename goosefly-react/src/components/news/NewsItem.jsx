import React, { Component } from 'react';

import Config from '../../Config';

import styles from './newsItem.css';
import CSSModules from 'react-css-modules';

import { connect } from 'react-redux';

let facebook = Config.staticPatch + '/images/facebook-sn.png';
let twitter = Config.staticPatch + '/images/twitter-sn.png';
let linkedin = Config.staticPatch + '/images/linkedin-sn.png';
let google = Config.staticPatch + '/images/google-plus-sn.png';

class NewsItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: true,
			items: []
		};
	}

	componentDidMount() {
		this.props.onGetNewsItem(this.props.match.params.id);
	}

	// componentDidUpdate() {
	//   debugger;
	// }

	render() {
		const { error, fetching, newsItem } = this.props;
    if (error) {
      return <div>Error: {error}</div>;
    } else if (fetching || !newsItem) {
      return <div>Loading...</div>;
    } else {
			return (
				<section className="wrapper  padding-top-footer gray-background">

					<article className="news-item-page ">
						<span className="recomends">Туристу</span>
						<h1>{newsItem.title}</h1>
						<div className="image-width-wrapper">
							<div className="image-height-wrapper">
								<img src={newsItem.cover} alt="description image" />
							</div>
						</div>
						<div className="content">
							
							<div className="content__block">
								{newsItem.fullText}
						
								{/* <h2>Lorem, ipsum.</h2> */}
								{/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quibusdam sint rem recusandae soluta? Iure repudiandae veritatis sequi minima reprehenderit? Porro doloribus numquam consequuntur nemo magnam et tempora doloremque nulla.</p> */}
							</div>
						</div>
						<div className="share">
							<span>Поделиться :</span>
							<div className="social">
								<a href="#!" className="facebook"><img src={facebook} alt="fb-icon" /></a>
								<a href="#!" className="twitter"><img src={twitter} alt="twitter-icon" /></a>
								<a href="#!" className="linkedin"><img src={linkedin} alt="linked-in-icon" /></a>
								<a href="#!" className="google-plus"><img src={google} alt="google-plus-icon" /></a>
							</div>
						</div>

					</article>
				</section>
			)
		}
	}
}

const putStateToProps = (state) => {
	return {
		newsItem: state.newsItem,
		fetching: state.fetching,
		error: state.error
	};
}

const putActionsToProps = (dispatch) => {
	return {
		onGetNewsItem: (arg) => dispatch({ type: 'API_REQUEST_NEWS_ITEM', id: arg }),
	}
};

export default connect(putStateToProps, putActionsToProps)(CSSModules(NewsItem, styles));