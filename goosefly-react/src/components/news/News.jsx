import React, { Component } from "react";
import Config from '../../Config';
import { Link } from 'react-router-dom';

import Pagination from '../common/pagination/Pagination';

import styles from './news.css';
import CSSModules from 'react-css-modules';

import { connect } from 'react-redux';

import OwlCarousel from 'react-owl-carousel2';


let NewsSlider = function (props) {
	let newsUrl = '/app/news-item/' + props.id;
	return (
		<div className="news-slider-item" key={props.id}>
			<Link to={newsUrl} > <img src={props.cover} alt="" />
				<div className="text">
					<span className="rubric">Lorem</span>
					<h3>{props.title}</h3>
					{props.shortText}
				</div>
			</Link>
		</div>
	);
};

const options = {
	items: 1,
	autoWidth: false,
	dots: false,
	nav: true,
	responsive: {
		0: {
			dots: true,
			nav: false,
			items: 1,
		},
		1025: {
			nav: true,
			items: 1,
		},
	}
};

let OtherNews = function (props) {
	let newsUrl = '/app/news-item/' + props.id;
	return (
		<section key={props.id}>
			<Link to={newsUrl} > <img src={props.cover} alt="" />
				<span className="rubric">Туристу</span>
				<h3>{props.title}</h3>
				{props.shortText}
			</Link>
		</section>
	);
};

class News extends Component {
	constructor(props) {
		super(props);

		this.state = {
			pageOfItems: []
		};

		this.onChangePage = this.onChangePage.bind(this);
	}

	componentDidMount() {
		this.props.onGetNewsItems();
		// let url = Config.apiUrl + 'news/';
		// fetch(url, {
		// 	method: 'GET',
		// 	mode: 'cors'
		// })
		// 	.then(res => res.json())
		// 	.then(
		// 		(result) => {
		// 			this.setState({
		// 				isLoaded: true,
		// 				items: result.items,
		// 				newsItems: result.items.slice(7)
		// 			});
		// 		})
		// 	.catch(
		// 		(error) => {
		// 			console.log(JSON.parse(error));
		// 			this.setState({
		// 				isLoaded: true,
		// 				error
		// 			});
		// 		}
		// 	)
	}
	componentWillUnmount() {
		this.props.newsItems = [];
	}

	componentDidUpdate() {
		if (this.props.newsItems && this.props.newsItems != this.state.items) {
			this.setState({
				items: this.props.newsItems,
				newsItems: this.props.newsItems.slice(7)
			});
		}
	}

	createAllNews = (data) => {

	};

	createNewsItemForSlider = (data) => {
		let newsItems = [];

		for (let index in data) {
			if (index > 2) {
				break;
			}
			let item = data[index];
			newsItems.push(NewsSlider(item));
		}

		return newsItems;
	};

	createOtherNewsItems = (data) => {
		let newsItems = [];

		for (let index in data) {
			if (index < 3) {
				continue;
			}
			if (index > 6) {
				break;
			}
			let item = data[index];
			newsItems.push(OtherNews(item));
		}

		return newsItems;
	};

	onChangePage(pageOfItems) {
		this.setState({ pageOfItems: pageOfItems });
	}

	render() {
		let { error, fetching, newsItems } = this.props;
		let { items } = this.state;

		if (error) {
			return <div>Error: {error}</div>;
		} else if (fetching || !newsItems) {
			return <div>Loading...</div>;
		} else {
			return (
				<div>
					<section className="wrapper padding-top-footer">
						<div className="wrapper__content">
							<h2>Новости</h2>
							<section className="main-news">
								<div className="news-slider">
									<OwlCarousel ref="car" options={options} className="slider">
										{
											this.createNewsItemForSlider(items)
										}
									</OwlCarousel>
								</div>
								<div className="other-news">
									{this.createOtherNewsItems(items)}
								</div>
							</section>
						</div>
					</section>
					<section className="wrapper gray-background">
						<div className="wrapper__content">
							<h2>Все новости</h2>
							<section>
								{this.state.pageOfItems.map(item => {
									let url = '/app/news-item/' + item.id
									return <article className="news-item" key={item.id}>
										<Link to={url}> <img src={item.cover} alt="" />
											<div className="text">
												<span className="rubric">Lorem.</span>
												<h3>{item.title}</h3>
												<p>{item.shortText}</p>
											</div>
										</Link>
									</article>
								})}

							</section>
						</div>
					</section>
					{this.state.newsItems ? <section className="wrapper gray-background">
						<div className="wrapper__content">
							<Pagination items={this.state.newsItems} onChangePage={this.onChangePage} />
						</div>
					</section> : ''}

				</div>
			);
		}
	}
}

const putStateToProps = (state) => {
	return {
		newsItems: state.newsItems,
		fetching: state.fetching,
		error: state.error
	};
}

const putActionsToProps = (dispatch) => {
	return {
		onGetNewsItems: () => dispatch({ type: 'API_REQUEST_NEWS_ITEMS' }),
	}
};

export default connect(putStateToProps, putActionsToProps)(CSSModules(News, styles));