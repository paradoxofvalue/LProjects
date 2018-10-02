import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {

  constructor(private sanitization: DomSanitizer) { }
  translateY: any = '0px';
  backgroundPosition: any = '50% 0';
  visible: boolean= true;
  h2Text: string[] = 'We are the team of professionals'.split('');
  ngOnInit() {
    window.addEventListener('scroll', ($event) => (this.onScroll($event)), true);

  }

  eventFunction(navElement?, event?) {
    event.preventDefault();
    let urlArray = event.currentTarget.href.split('/');
    this.smoothScroll(urlArray[urlArray.length - 1]);
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
    var stopY = this.elmYPosition(eID);
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


  onScroll(event) {
    let main = <HTMLElement>document.querySelector('#main'),
    aboutus = <HTMLElement>document.querySelector('#aboutus'),
    startY = window.pageYOffset;

    if (startY >= 0 && startY <= aboutus.offsetTop - 70 && window.document.body.offsetWidth >= 1100) {
      this.translateY = this.sanitization.bypassSecurityTrustStyle(startY / .8+'px');
      this.backgroundPosition = this.sanitization.bypassSecurityTrustStyle('50% '+ -startY * 0.2+'px');
    }

    if (startY >= 0 && startY <= window.innerHeight) {
      this.visible = true;
    } else {
      this.visible = false;
    }
  }

}
