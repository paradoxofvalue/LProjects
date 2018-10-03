import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Config from '../../../Config';

import styles from './styles.css';
import CSSModules from 'react-css-modules';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Modal, Dropdown, Navbar, SideNav, SideNavItem, Button } from 'react-materialize';

import { changeLang } from '../../../store/actions';
import Products from '../../products/Products';
import LoginModal from '../../modals/LoginModal';

let user = Config.staticPatch + '/images/user.svg';
let mail = Config.staticPatch + '/images/mail.svg';
let chat = Config.staticPatch + '/images/chat.svg';
let search = Config.staticPatch + '/images/search.svg';


class Header extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.onGetCategories();
	}

	updateCategories() {
		Products.componentDidMount();
	}

	render() {
		const { fetching, error, settings, categories } = this.props;
		if (error) {
      return <div>Error: {error}</div>;
    } else if (fetching || (!settings && !categories)) {
      return <div>Loading...</div>;
    } else {
			return (
				<header className="navbar-fixed">
					<Navbar brand={<img src={settings ? settings.logo : 'https://s3-eu-west-1.amazonaws.com/tppuploads/original/2018/8/23/2011696a-6e57-4c4d-9ee0-a86d02568cbf.jpg'} alt=""></img>}>
						<ul className="hide-on-med-and-down">
							<li>
								<Dropdown trigger={
									<a className="categories-trigger" to="">Категории</a>
								}>
									<li key="0"><Link to="/app/products/" onClick={this.updateCategories}>Все категории</Link></li>
									{categories.map(categorie=>{
										let url = '/app/products/' + categorie.id;
										return <li key={categorie.id}><Link to={url} onClick={this.updateCategories}>{categorie.name}</Link></li>
									})}
								</Dropdown>
							</li>
							<li>
								<Link to='/app/about' className="">О компании</Link>
							</li>
							<li>
								<Link to='/app/news' className="">Новости</Link>
							</li>
							<li>
								<a href="#" className="">Бизнес индекс</a>
							</li>
						</ul>
	
						<ul className="hide-on-med-and-down pull-right">
							<li>
								<a className="lang-trigger" href="#!" data-target="lang">Ру <i className="material-icons right">arrow_drop_down</i>
								</a>
							</li>
							<li className="mail">
								<a href="#chat" className="modal-trigger" data-target="chat">
									<img src={mail} alt="" /> </a>
							</li>
							<li className="chat notification">
								<a href="#"> <img src={chat} alt="" /> </a>
							</li>
							<li className="user">

								<Modal
									// header='Modal Header'
									className="login-wrapper"
									trigger={<a className="modal-trigger" data-target="login">
										<img src={user} alt="" /> Войти </a>}>
									<LoginModal key="0"></LoginModal>

								</Modal>

								<div className="profile">
									<div className="profile__wrapper">
										<div className="profile__image-wrapper">
											<img src="./images/radu-florin-750940-unsplash.jpg" alt="" />
										</div>
										<div className="profile__text-wrapper">
											<h6>Vitaly Patrianko</h6>
											<a href="#">Настройки профиля</a>
										</div>
									</div>
									<a href="#" className="profile__log-out">
										<i className="material-icons">power_settings_new</i> Выйти </a>
								</div>
							</li>
							<li className="search">
								<a href="#"> <img src={search} alt="" /> </a>
								<div className="input-field">
									<i className="material-icons prefix">close</i>
									<input type="text" className="autocomplete" />
								</div>
							</li>
						</ul>
					</Navbar>
	
	
					<SideNav
						trigger={<Button>SIDE NAV DEMO</Button>}
						options={{ closeOnClick: true }}
					>
						<SideNavItem userView
							user={{
								background: 'img/office.jpg',
								image: 'img/yuna.jpg',
								name: 'John Doe',
								email: 'jdandturk@gmail.com'
							}}
						/>
						<SideNavItem href='#!icon' icon='cloud'>First Link With Icon</SideNavItem>
						<SideNavItem href='#!second'>Second Link</SideNavItem>
						<SideNavItem divider />
						<SideNavItem subheader>Subheader</SideNavItem>
						<SideNavItem waves href='#!third'>Third Link With Waves</SideNavItem>
					</SideNav>
	
				</header>
			);
		}
		
	}
}


const putStateToProps = (state) => {
	return {
		lang: state.lang,

		settings: state.settings,
		categories: state.categories,
		fetching: state.fetching,
		error: state.error
	};
}

const putActionsToProps = (dispatch) => {
	return {
		changeLang: bindActionCreators(changeLang, dispatch),
		onGetCategories: () => dispatch({ type: 'API_REQUEST_CATEGORIES' }),
	}
};

export default connect(putStateToProps, putActionsToProps)(CSSModules(Header, styles));