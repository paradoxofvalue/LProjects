import React, { Component } from "react";
import { Switch, Route, withRouter } from 'react-router';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import Home from '../../home/Home';
import About from '../../about/About';
import News from '../../news/News';
import NewsItem from '../../news/NewsItem';
import Products from '../../products/Products';
import ProductItem from '../../products/ProductItem';
import NotFound from '../../not-found/NotFound';

import { connect } from 'react-redux';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';


class Layout extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    const { cookies } = props;
    cookies.set('csrftoken', 'fPLpQCM1NR9rHtf1TSumoJQoZagvlZyHE7rG0fiYrA9q7oJOmz4kMnovfo7ZDJa6', { path: '/' });
    cookies.set('site_session_id', 'd5pqf0m83oyebap26lfe1vh9x5vfz161', { path: '/' });
  }

  componentDidMount() {
    this.props.onGetSettings();
    // this.props.onGetCookies();
  }

  componentDidUpdate() {
    // document.dispatchEvent(window.gf.triggerEvent);
  }

  render() {
    const { fetching, error } = this.props;
    // console.log(this.props);
    // if (error) {
    // return <div>Error: {error}</div>;
    // } else if (fetching) {
    // return <div>Loading...</div>;
    // } else {
    return (
      <div>
        <Header />
        <main>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/app/about/' component={About} />

            <Route path="/app/news-item/:id/" component={NewsItem} />
            <Route path="/app/news/" component={News} />

            <Route exact path="/app/products/" component={Products} />
            <Route path="/app/products/:id/" component={Products} />
            <Route path="/app/products-item/:id/" component={ProductItem} />

            <Route component={NotFound} />
            {/* <Route path='/roster' component={Roster} /> */}
            {/* <Route path='/schedule' component={Schedule} /> */}
          </Switch>
        </main>
        <Footer />
      </div>
    );
    // }


  }
}

const putStateToProps = (state) => {
  return {
    lang: state.lang,
    settings: state.settings,
    cookies: state.cookies,

    fetching: state.fetching,
    error: state.error
  };
}

const putActionsToProps = (dispatch) => {
  return {
    onGetSettings: () => dispatch({ type: 'API_REQUEST_SETTINGS' }),
  }
};

export default withRouter(withCookies((connect(putStateToProps, putActionsToProps)(Layout))));