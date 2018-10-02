'use strict';

export default class Menu {

  constructor({ elem }) {
    elem.querySelectorAll('li a').forEach((item) => {
      item.addEventListener('click', (e) => {
        eventFunction(e);
      });
    });

    window.onscroll = (event) => {
      onScroll(event);
    }

    let onScroll = (event) => {
      let startBlock = document.querySelector('#start'),
        howBlock = document.querySelector('#how'),
        buyBlock = document.querySelector('#buy'),
        stagesBlock = document.querySelector('#stages'),
        startY = event ? event.pageY : window.pageY;

      [startBlock, howBlock, buyBlock, stagesBlock].forEach(item => {
        if (startY >= item.offsetTop - 50) {
          navChange(document.querySelector('header nav li a[href="#'+item.id+'"]'));
        }
      });
    }

    document.querySelector('nav a[href="#reg"]').addEventListener('click', (e) => {
      eventFunction(e);
    });
    document.querySelector('a[href="#how"].btn-floating').addEventListener('click', (e) => {
      eventFunction(e);
    });
    

    let navChange = (element) => {
      let allNavItem = element.parentElement.parentElement.querySelectorAll('li');
      allNavItem.forEach((item) => {
        item.classList.remove('active');
      })
      element.parentElement.classList.add('active');
    }

    let eventFunction = (e) => {
      e.preventDefault();
      let urlArray = e.currentTarget.href.split('/');
      smoothScroll(urlArray[urlArray.length - 1]);
      navChange(e.currentTarget);
    }

    let currentYPosition = () => {
      // Firefox, Chrome, Opera, Safari
      if (self.pageYOffset) return self.pageYOffset;
      // Internet Explorer 6 - standards mode
      if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
      // Internet Explorer 6, 7 and 8
      if (document.body.scrollTop) return document.body.scrollTop;
      return 0;
    }


    let elmYPosition = (eID) => {
      var elm = document.querySelector(eID);
      var y = elm.offsetTop;
      var node = elm;
      while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
      } return y;
    }


    let smoothScroll = (eID) => {
      var startY = currentYPosition();
      var stopY = elmYPosition(eID);
      var distance = stopY > startY ? stopY - startY : startY - stopY;
      if (distance < 100) {
        scrollTo(0, stopY); return;
      }
      var speed = Math.round(distance / 100);
      if (speed >= 20) speed = 20;
      var step = Math.round(distance / 25);
      var leapY = stopY > startY ? startY + step : startY - step;
      var timer = 0;
      if (stopY > startY) {
        for (var i = startY; i < stopY; i += step) {
          setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
          leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
      }
      for (var i = startY; i > stopY; i -= step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
      }
    }
  }



}
