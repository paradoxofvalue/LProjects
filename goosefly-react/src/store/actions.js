import axios from 'axios';
import Config from '../Config';


import {
  ACTION_CHANGE_FIRST_NAME,
  ACTION_CHANGE_SECOND_NAME,
  ACTION_CHANGE_LANG,
  ACTION_CHANGE_LOGIN,
  ACTION_CHANGE_PASSWORD,
  API_SUCCESS_PRODUCT_ITEM,
  API_REQUEST_PRODUCT_ITEM,
  API_SUCCESS_PRODUCT_ITEMS,
  API_REQUEST_PRODUCT_ITEMS,
} from './types';

import { Cookies } from 'react-cookie';

export const changeFirstName = (newFirstName) => {
  return {
    type: ACTION_CHANGE_FIRST_NAME,
    payload: newFirstName,
  }
}

export const changeSecondName = (newSecondName) => {
  return {
    type: ACTION_CHANGE_SECOND_NAME,
    payload: newSecondName,
  }
}

export const changeLang = (newLang) => {
  return {
    type: ACTION_CHANGE_LANG,
    payload: newLang,
  }
}

export const changeLogin = (newVal) => {
  return {
    type: ACTION_CHANGE_LOGIN,
    payload: newVal,
  }
}

export const changePassword = (newVal) => {
  return {
    type: ACTION_CHANGE_PASSWORD,
    payload: newVal,
  }
}

export const getSettings = () => {
  let url = Config.apiUrl + 'settings/';
  return axios({
    method: "get",
    'url': url,
    body: {
      mode: 'cors',
    }
  });
}

export const getAbout = () => {
  let url = Config.apiUrl + 'about/';
  return axios({
    method: "get",
    'url': url,
    body: {
      mode: 'cors',
    }
  });
}

export const login = () => {
  let url = Config.apiUrl + 'auth/login/';
  let cookie = new Cookies();
  cookie = cookie.getAll();
  
  return axios({
    'url': url,
    'method': 'post',
    'body': {
      'username': 'dl@lug.in.ua',
      'password': '120479lug',
    },
    headers: {
      'X-CSRFToken': '0nNhq6LCkuoLMqfoXG2cnlBfz5nQBgMfL1AYkLBVZpMSDKIlLnV89ZnlIpxbWD5g',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export const getCategories = () => {
  let url = Config.apiUrl + 'b2c/categories/';
  return axios({
    method: "get",
    'url': url,
    body: {
      mode: 'cors',
    }
  });
}

export const getProductItem = (arg) => {
  let url = Config.apiUrl + 'b2c/' + arg.id + '/';
  return axios({
    method: "get",
    'url': url,
    body: {
      mode: 'cors',
    }
  })
}

export const getProductItems = (arg) => {
  
  let url = Config.apiUrl + 'b2c_prod_in_cat/';
  arg.id ? url += arg.id + '/' : '';
  return axios({
    method: "get",
    'url': url,
    body: {
      mode: 'cors',
    }
  })
}

export const getNewsItem = (arg) => {
  let url = Config.apiUrl + 'news/' + arg.id + '/';
  return axios({
    method: "get",
    'url': url,
    body: {
      mode: 'cors',
    }
  })
}

export const getNewsItems = (arg) => {
  let url = Config.apiUrl + 'news/';
  return axios({
    method: "get",
    'url': url,
    body: {
      mode: 'cors',
    }
  })
}