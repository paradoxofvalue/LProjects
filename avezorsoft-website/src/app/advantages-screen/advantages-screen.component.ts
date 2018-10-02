import { Component, OnInit } from '@angular/core';
import { NavList } from '../header/nav-list';

@Component({
  selector: 'app-advantages-screen',
  templateUrl: './advantages-screen.component.html',
  styleUrls: ['./advantages-screen.component.scss']
})
export class AdvantagesScreenComponent implements OnInit {

  navList: NavList[] = [
    { name: 'Reliability', link: '#reliability', isActive: true },
    { name: 'Price', link: '#price', isActive: false },
    { name: 'High quality', link: '#highquality', isActive: false },
    { name: 'Innovations', link: '#innovations', isActive: false },
  ];

  isFixed: boolean = false;
  isListed: boolean = false;
  isFilter: boolean = false;

  constructor() { }

  ngOnInit() {
    window.addEventListener('scroll', ($event) => (this.onScroll($event)), true);
    let h3s = document.querySelectorAll('#advantages h3');

    for (let i = 0; i < h3s.length; i++) {
      let element = h3s[i];
      element.addEventListener('click', (event) => {
        let target = event.target;
        for (let i = 0; i < h3s.length; i++) {
          if (target == h3s[i]) {
            h3s[i].classList.contains('hidden') ? h3s[i].classList.remove('hidden') : h3s[i].classList.add('hidden');
            let content = <HTMLElement>h3s[i].nextElementSibling;
            if (!h3s[i].classList.contains('hidden')) {
              content.style.maxHeight = content.scrollHeight + "px";
            } else {
              content.style.maxHeight = null;
            }
          } else {
            let content = <HTMLElement>h3s[i].nextElementSibling;
            h3s[i].classList.contains('hidden') ? '' : h3s[i].classList.add('hidden');
            content.style.maxHeight = null;
          }
        }
      })
    }
  }


  navClick(navElement, event?) {
    if (event) { event.preventDefault(); }
    this.navList.forEach(item => {
      item.isActive = false;
    });
    if (navElement) {
      navElement.isActive = true;
    }
  }

  onScroll(event) {
    let advantages = <HTMLElement>document.querySelector('#advantages'),
      services = <HTMLElement>document.querySelector('#services'),
      reliability = <HTMLElement>document.querySelector(this.navList[0].link),
      price = <HTMLElement>document.querySelector(this.navList[1].link),
      highquality = <HTMLElement>document.querySelector(this.navList[2].link),
      innovations = <HTMLElement>document.querySelector(this.navList[3].link),
      startY = window.pageYOffset;

    [reliability, price, highquality, innovations].forEach((item, index) => {
      if (startY >= item.offsetTop + advantages.offsetTop - 300) {
        this.navClick(this.navList[index]);
      }
    });

    if (window.innerWidth <= 1100) {
      return;
    }

    if (startY >= advantages.offsetTop) {
      this.isFixed = true;
      this.isFilter = true;
    } else {
      this.isFixed = false;
      this.isFilter = false;
    }

    if (startY >= services.offsetTop - services.clientHeight + window.innerHeight - 250) {
      this.isFilter = false;
    }

    if (startY >= services.offsetTop - 650) {
      this.isListed = true;
    } else {
      this.isListed = false;
    }
  }

  eventFunction(navElement, event) {
    
    event.preventDefault();
    let urlArray = event.currentTarget.href.split('/');
    this.smoothScroll(urlArray[urlArray.length - 1]);
    this.navClick(navElement);
  }

  currentYPosition = () => {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
  }


  elmYPosition = (eID) => {
    var elm = document.querySelector(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
    } return y;
  }


  smoothScroll = (eID) => {
    var startY = this.currentYPosition();
    var stopY = this.elmYPosition(eID) - 250;
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 50);
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
