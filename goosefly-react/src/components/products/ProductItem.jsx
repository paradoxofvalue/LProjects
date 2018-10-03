import React, { Component } from "react";
import OwlCarousel from 'react-owl-carousel2';
import Config from '../../Config';

import { Input, Button, Tabs, Tab } from 'react-materialize';

import { connect } from 'react-redux';

import styles from './productItem.css';
import CSSModules from 'react-css-modules';

let facebook = Config.staticPatch + '/images/facebook-sn.png';
let twitter = Config.staticPatch + '/images/twitter-sn.png';
let linkedin = Config.staticPatch + '/images/linkedin-sn.png';
let google = Config.staticPatch + '/images/google-plus-sn.png';

const options = {
  items: 1,
  autoWidth: false,
  dots: true,
  nav: false,
  autoplay: true
}

class ProductItem extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onGetProductItem(this.props.match.params.id);
  }

  render() {
    const { error, fetching, productItem } = this.props;
    if (error) {
      return <div>Error: {error}</div>;
    } else if (fetching || !productItem) {
      return <div>Loading...</div>;
    } else {
      return (
        <section className="wrapper gray-background good agency-main-info padding-top-footer">
          <div className="wrapper__content">
            <div className="good__wrapper">
              <OwlCarousel className="good__image-wrapper" options={options}>
                {productItem.additional_images.map((item, i) => {
                  return (<div className="good__slide" key={i}>
                    <img src={item} alt="" />
                  </div>)
                })}
                <div className="good__slide" key="cover">
                  <img src={productItem.cover} alt="" />
                </div>
              </OwlCarousel>

              <div className="good__main-info">
                <h3>{productItem.name}</h3>
                <span className="price">{productItem.price}
                  <span className="currency"> {productItem.currency}</span>
                </span>
                <div className="input-field">
                  <label for="exampleSelect">Кол-во: </label>
                  <Input type='select' defaultValue='2'>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                  </Input>
                </div>

                <Button className="btn">Добавить в корзину</Button>
              </div>
              <div className="good__share">
                <h6>Поделиться: </h6>
                <div className="share__items">
                  <a href="#" className="share__item">
                    <img src={facebook} alt="#" />
                  </a>
                  <a href="#" className="share__item">
                    <img src={twitter} alt="#" />
                  </a>
                  <a href="#" className="share__item">
                    <img src={linkedin} alt="#" />
                  </a>
                  <a href="#" className="share__item">
                    <img src={google} alt="#" />
                  </a>
                </div>
              </div>
              <div className="good__seller">
                <h6>Компания продавец: </h6>
                <a href="#">Anex Tour</a>
              </div>
              <div className="good__secondary-info">
                <Tabs className='tabs tab-demo'>
                  <Tab className='tab' title="Описание">
                    1Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa magnam vero dolore quos molestiae eius. Incidunt quis omnis
                    dicta nesciunt. Ab eligendi minima inventore dolore.
                  </Tab>
                  <Tab className='tab' title="Руководство к применению" active>
                    2Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa magnam vero dolore quos molestiae eius. Incidunt quis omnis
                    dicta nesciunt. Ab eligendi minima inventore dolore.
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      );
    }
  }
}

const putStateToProps = (state) => {
  return {
    productItem: state.productItem,
    fetching: state.fetching,
    error: state.error
  };
}

const putActionsToProps = (dispatch) => {
  return {
    onGetProductItem: (arg) => dispatch({ type: 'API_REQUEST_PRODUCT_ITEM', id: arg }),
  }
};

export default connect(putStateToProps, putActionsToProps)(CSSModules(ProductItem, styles));