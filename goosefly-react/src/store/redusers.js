import {
  ACTION_CHANGE_FIRST_NAME,
  ACTION_CHANGE_SECOND_NAME,
  ACTION_CHANGE_LANG,
  API_CALL_REQUEST,
  API_CALL_SUCCESS,
  API_CALL_FAILURE,
  API_REQUEST_SETTINGS,
  API_SUCCESS_SETTINGS,
  API_REQUEST_CATEGORIES,
  API_SUCCESS_CATEGORIES,
  ACTION_CHANGE_LOGIN,
  ACTION_CHANGE_PASSWORD,
  API_REQUEST_LOGIN,
  API_SUCCESS_LOGIN,
  API_REQUEST_ABOUT,
  API_SUCCESS_ABOUT,
  API_REQUEST_PRODUCT_ITEM,
  API_SUCCESS_PRODUCT_ITEM,
  API_REQUEST_PRODUCT_ITEMS,
  API_SUCCESS_PRODUCT_ITEMS,
  API_REQUEST_NEWS_ITEM,
  API_SUCCESS_NEWS_ITEM,
  API_REQUEST_NEWS_ITEMS,
  API_SUCCESS_NEWS_ITEMS,
} from './types';

import { getSettings, getCategories, login, getAbout, getProductItem, getProductItems, getNewsItem, getNewsItems } from './actions';

import { takeLatest, call, put } from "redux-saga/effects";
import { Cookies } from 'react-cookie';


export function* watcherSaga() {

  //get about page content
  yield takeLatest("API_REQUEST_ABOUT", workerSagaAbout);
  //get categories list
  yield takeLatest("API_REQUEST_CATEGORIES", workerSagaCategories);
  //get settings 
  yield takeLatest("API_REQUEST_SETTINGS", workerSagaSettings);
  //login post request for authorization
  yield takeLatest("API_REQUEST_LOGIN", workerSagaLogin);
  //get product item content by id
  yield takeLatest("API_REQUEST_PRODUCT_ITEM", workerSagaProductItem);
  //get product items by categorie id
  yield takeLatest("API_REQUEST_PRODUCT_ITEMS", workerSagaProductItems);
  //get news item content by id
  yield takeLatest("API_REQUEST_NEWS_ITEM", workerSagaNewsItem);
  // get news items
  yield takeLatest("API_REQUEST_NEWS_ITEMS", workerSagaNewsItems);


}

function* workerSagaSettings() {
  try {
    const response = yield call(getSettings);
    const settings = response.data;
    yield put({ type: "API_SUCCESS_SETTINGS", settings });
  } catch (error) {
    yield put({ type: "API_CALL_FAILTURE", error });
  }
}

function* workerSagaCategories() {
  try {
    const response = yield call(getCategories);
    const categories = response.data;
    yield put({ type: "API_SUCCESS_CATEGORIES", categories });
  } catch (error) {
    yield put({ type: "API_CALL_FAILTURE", error });
  }
}

function* workerSagaLogin() {
  try {
    const response = yield call(login);
    const isAutorized = response.data;
    yield put({ type: "API_SUCCESS_LOGIN", isAutorized });
  } catch (error) {
    yield put({ type: "API_CALL_FAILTURE", error });
  }
}

function* workerSagaAbout() {
  try {
    const response = yield call(getAbout);
    const about = response.data;
    yield put({ type: "API_SUCCESS_ABOUT", about });
  } catch (error) {
    yield put({ type: "API_CALL_FAILTURE", error });
  }
}

function* workerSagaProductItem(arg) {
  try {
    const response = yield call(getProductItem, arg);
    const productItem = response.data;
    yield put({ type: "API_SUCCESS_PRODUCT_ITEM", productItem });
  } catch (error) {
    yield put({ type: "API_CALL_FAILTURE", error });
  }
}

function* workerSagaProductItems(arg) {
  try {
    const response = yield call(getProductItems, arg);
    const productItems = response.data;
    yield put({ type: "API_SUCCESS_PRODUCT_ITEMS", productItems });
  } catch (error) {
    yield put({ type: "API_CALL_FAILTURE", error });
  }
}

function* workerSagaNewsItem(arg) {
  try {
    const response = yield call(getNewsItem, arg);
    const newsItem = response.data;
    yield put({ type: "API_SUCCESS_NEWS_ITEM", newsItem });
  } catch (error) {
    yield put({ type: "API_CALL_FAILTURE", error });
  }
}

function* workerSagaNewsItems(arg) {
  try {
    const response = yield call(getNewsItems, arg);
    const newsItems = response.data;
    yield put({ type: "API_SUCCESS_NEWS_ITEMS", newsItems });
  } catch (error) {
    yield put({ type: "API_CALL_FAILTURE", error });
  }
}



const initialState = {
  lang: 'en',
  cookies: new Cookies(),
  isAutorized: false,
  fetching: false,
  error: null
}

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case ACTION_CHANGE_FIRST_NAME: {
      return { ...state, firstName: action.payload };
    }
    case ACTION_CHANGE_SECOND_NAME: {
      return { ...state, secondName: action.payload };
    }
    case ACTION_CHANGE_LANG: {
      return { ...state, lang: action.payload };
    }
    case ACTION_CHANGE_LOGIN: {
      return { ...state, login: action.payload };
    }
    case ACTION_CHANGE_PASSWORD: {
      return { ...state, password: action.payload };
    }

    case API_CALL_REQUEST:
      return { ...state, fetching: true, error: null };
      break;
    case API_CALL_SUCCESS:
      return { ...state, fetching: false, dog: action.dog };
      break;

    case API_REQUEST_SETTINGS:
      return { ...state, fetching: true, error: null };
      break;
    case API_SUCCESS_SETTINGS:
      return { ...state, fetching: false, settings: action.settings };
      break;

    case API_REQUEST_CATEGORIES:
      return { ...state, fetching: true, error: null };
      break;
    case API_SUCCESS_CATEGORIES:
      return { ...state, fetching: false, categories: action.categories };
      break;

    case API_REQUEST_LOGIN:
      return { ...state, fetching: false, error: null };
      break;
    case API_SUCCESS_LOGIN:
      return { ...state, fetching: false, isAutorized: action.isAutorized };
      break;

    case API_REQUEST_ABOUT:
      return { ...state, fetching: false, error: null };
      break;
    case API_SUCCESS_ABOUT:
      return { ...state, fetching: false, about: action.about };
      break;

    case API_REQUEST_PRODUCT_ITEM:
      return { ...state, fetching: false, error: null, arguments: arguments };
      break;
    case API_SUCCESS_PRODUCT_ITEM:
      return { ...state, fetching: false, productItem: action.productItem };
      break;

    case API_REQUEST_NEWS_ITEM:
      return { ...state, fetching: false, error: null, arguments: arguments };
      break;
    case API_SUCCESS_NEWS_ITEM:
      return { ...state, fetching: false, newsItem: action.newsItem };
      break;

    case API_REQUEST_NEWS_ITEMS:
      return { ...state, fetching: false, error: null, arguments: arguments };
      break;
    case API_SUCCESS_NEWS_ITEMS:
      return { ...state, fetching: false, newsItems: action.newsItems.items };
      break;

    case API_REQUEST_PRODUCT_ITEMS:
      return { ...state, fetching: false, error: null, arguments: arguments };
      break;
    case API_SUCCESS_PRODUCT_ITEMS:

      let tempItems = [];

      if (action.productItems.items) {
        action.productItems.items.forEach(catItem => {
          catItem.products.forEach(product => {
            tempItems.push(product);
          })
        })
      } else {
        tempItems = action.productItems.products;
      }

      return { ...state, fetching: false, productItems: tempItems };
      break;

    case API_CALL_FAILURE:
      return { ...state, fetching: false, dog: null, error: action.error };
      break;

    default: return state;
  }

}