'use strict';

import Form from './form';
import Menu from './menu';

let menu = new Menu({
    elem: document.querySelector('header nav')
  }),
  form = new Form({
    elem: document.querySelector('#reg')
  });


// document.querySelector('.page__header').onclick = function() {
  require.ensure([], function() {
    require('./header');
  });
// };