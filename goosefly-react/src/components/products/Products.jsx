import React, { Component } from "react";
import Config from '../../Config';
import { Link } from 'react-router-dom';
// import { ProductItem } from './ProductItem';
import Pagination from '../common/pagination/Pagination';

import { connect } from 'react-redux';

import styles from './products.css';
import CSSModules from 'react-css-modules';


class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageOfItems: [],
    };
    this.onChangePage = this.onChangePage.bind(this);
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems: pageOfItems });
  }

  componentDidUpdate() {
    if (this.props.productItems && this.props.productItems != this.state.items) {
      this.setState({
        items: this.props.productItems,
        pItems: this.props.productItems.slice(7)
      });
    }
  }

  componentDidMount() {
    this.props.onGetProductItems(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.productItems = [];
  }


  render() {
    let { error, fetching, productItems } = this.props;

    if (error) {
      return <div>Error: {error}</div>;
    } else if (fetching || !productItems) {
      return <div>Loading...</div>;
    } else {

      return (
        <div>
          <section className="wrapper gray-background" >
            <div className="wrapper__content">
              <h2>Гостиницы</h2>
              <section className="cards-with-aside">
                <aside>
                  <div>
                    <h3>Категории</h3>
                    <ul>
                      <li className="active">
                        <a href="#">Lorem ipsum dolor sit.</a>
                      </li>
                      <li className="">
                        <a href="#">Lorem ipsum dolor sit.</a>
                      </li>
                      <li className="">
                        <a href="#">Lorem ipsum dolor sit.</a>
                      </li>
                      <li className="">
                        <a href="#">Lorem ipsum dolor sit.</a>
                      </li>
                      <li className="">
                        <a href="#">Lorem ipsum dolor sit.</a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3>ТОП компаний</h3>
                    <ul>
                      <li className="">
                        <a href="#">Lorem ipsum dolor sit.</a>
                      </li>
                      <li className="">
                        <a href="#">Lorem ipsum dolor sit.</a>
                      </li>
                      <li className="">
                        <a href="#">Lorem ipsum dolor sit.</a>
                      </li>
                      <li className="">
                        <a href="#">Lorem ipsum dolor sit.</a>
                      </li>
                      <li className="">
                        <a href="#">Lorem ipsum dolor sit.</a>
                      </li>
                    </ul>
                  </div>
                </aside>
                <section className="special-cards" key={this.props.match.params.id ? this.props.match.params.id : Math.random()}>
                  {
                    this.state.pageOfItems.map(item => {
                      item.parentId = this.props.match.params.id ? this.props.match.params.id : Math.random();
                      return <ProductItem data={item} key={item.id + "-" + item.parentId} />
                    })}
                </section>
              </section>
            </div>
          </section>
          {this.state.items ? <section className="wrapper gray-background"><div className="wrapper__content"><Pagination items={this.state.items} onChangePage={this.onChangePage} /></div></section> : ''}
        </div>
      );
    }
  }
}


function ProductItem(props) {
  let url = '/app/products-item/' + props.data.id;
  return (
    <figure className="special-card" key={props.data.id + '-' + props.data.parent}>
      <Link to={url}>
        <div className="img-wrap">
          <img src={props.data.cover} alt="" />
        </div>
      </Link>
      <figcaption>
        <Link to={url}>

          <h3>{props.data.name}</h3>
          <p>{props.data.short_description}</p>
          <span className="price">{props.data.price}
            <span className="currency">{props.data.currency}</span>
          </span>
        </Link>
      </figcaption>

    </figure>
  )
}


const putStateToProps = (state) => {
  return {
    productItems: state.productItems,
    fetching: state.fetching,
    error: state.error
  };
}

const putActionsToProps = (dispatch) => {
  return {
    onGetProductItems: (arg) => dispatch({ type: 'API_REQUEST_PRODUCT_ITEMS', id: arg }),
  }
};

export default connect(putStateToProps, putActionsToProps)(CSSModules(Products, styles));