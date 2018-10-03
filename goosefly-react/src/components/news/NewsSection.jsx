import React, { Component } from "react";
import Config from './../config';

let newImage = 'images/radu-florin-750940-unsplash.jpg';


let NewsSlider = function (props) {
	let newsUrl = '/app/news-item/' + props.id;
	return (
		<div className="news-slider-item">
			<a href={newsUrl}> <img src={props.cover} alt="" />
				<div className="text">
					<span className="rubric">Lorem</span>
					<h3>{props.title}</h3>
					{props.shortText}
				</div>
			</a>
		</div>
	);
};

let OtherNews = function (props) {
	let newsUrl = '/app/news-item/' + props.id;
	return (
		<section>
			<a href={newsUrl}> <img src={props.cover} alt="" /> <span className="rubric">Туристу</span>
				<h3>{props.title}</h3>
				{props.shortText}
			</a>
		</section>
	);
};


export default class NewsSection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: []
		};
	}

	componentDidMount() {
		let url = Config.apiUrl + 'news/';
		fetch(url, {
			method: 'GET',
			mode: 'cors'
		})
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						items: result.items
					});
				})
			.catch(
				(error) => {
					console.log(JSON.parse(error));
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}

	componentDidUpdate() {
		document.dispatchEvent(window.gf.triggerEvent);
	}

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

	render() {
		const { error, isLoaded, items } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (

				<section className="wrapper padding-top-footer">
					<div className="wrapper__content">
						<h2>Новости</h2>
						<section className="main-news">
							<div className="news-slider">
								<div className="slider">
									{this.createNewsItemForSlider(items)}
								</div>
							</div>
							<div className="other-news">
								{this.createOtherNewsItems(items)}
							</div>
						</section>
					</div>

				</section>

				
			);
		}
	}
}