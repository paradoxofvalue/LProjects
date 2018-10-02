import { Component, OnInit } from '@angular/core';
import { NavList } from './nav-list';

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ErrorStateMatcher]
})
export class HeaderComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  matcher = new MyErrorStateMatcher();

  isFixed = false;
  isVisibleOnMain = false;

  popup = false;
  pending = false;
  submitMessage = 'Wait';
  submitStatus = '...';

  navList: NavList[] = [
    { name: 'About us', link: '#aboutus', isActive: true },
    { name: 'Advantages', link: '#advantages', isActive: false },
    { name: 'Services', link: '#services', isActive: false },
    { name: 'Dream team', link: '#dreamteam', isActive: false },
    { name: 'Contact us', link: '#contactus', isActive: false }
  ];

  onSubmit() {
    const captcha = <HTMLElement>document.querySelector('#captcha-modal');
    const button = <HTMLElement>document.querySelector('#captcha-modal-submit');

    if (this.emailFormControl.valid) {
      if (captcha.getAttribute('data-valid') && captcha.getAttribute('data-valid') === 'true') {
        this.pending = true;

        const postUrl = '/index.php';
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
          })
        };
        this.http.post(postUrl, {
          email: this.emailFormControl.value,
        }, httpOptions).subscribe((response: any) => {
          if (response.status) {
            this.submitMessage = response.message;
            this.submitStatus = '✓';
          } else {
            this.submitMessage = response.message;
            this.submitStatus = '×';
          }
        });
        // this.http
        //   .get('/index.php?email=' + this.emailFormControl.value)
        //   .subscribe((response: any) => {
        //     if (response.status) {
        //       this.submitMessage = response.message;
        //       this.submitStatus = '✓';
        //     } else {
        //       this.submitMessage = response.message;
        //       this.submitStatus = '×';
        //     }
        //   });
      } else {
        captcha.style.display = 'block';
        button.style.display = 'none';
      }
    }
  }

  constructor(private http: HttpClient) {
    this.isFixed = false;
    this.isVisibleOnMain = false;
  }

  ngOnInit() {
    window.addEventListener('scroll', $event => this.onScroll($event), true);
  }
  togglePopup(event?) {
    if (event) {
      event.preventDefault();
    }
    this.popup = !this.popup;
    this.pending = false;
    this.submitMessage = 'Wait';
    this.submitStatus = '...';
    this.popup
      ? (document.querySelector('body').style.overflow = 'hidden')
      : (document.querySelector('body').style.overflow = 'visible');
  }

  navClick(navElement, event?) {
    if (event) {
      event.preventDefault();
    }
    this.navList.forEach(item => {
      item.isActive = false;
    });
    if (navElement) {
      navElement.isActive = true;
    }
  }

  eventFunction(navElement?, event?) {
    event.preventDefault();
    const urlArray = event.currentTarget.href.split('/');
    this.smoothScroll(urlArray[urlArray.length - 1]);
    this.navClick(navElement);
  }

  currentYPosition = () => {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) {
      return self.pageYOffset;
    }
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop) {
      return document.documentElement.scrollTop;
    }
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) {
      return document.body.scrollTop;
    }
    return 0;
  }

  elmYPosition = eID => {
    if (eID == '#main') {
      return -2000;
    }
    const elm = document.querySelector(eID);
    let y = elm.offsetTop;
    let node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
    }
    return y;
  }

  smoothScroll = eID => {
    const startY = this.currentYPosition();
    const stopY = this.elmYPosition(eID);
    const distance = stopY > startY ? stopY - startY : startY - stopY;

    if (distance < 100) {
      scrollTo(0, stopY);
      return;
    }
    let speed = Math.round(distance / 50);
    if (speed >= 30) {
      speed = 20;
    }
    const step = Math.round(distance / 50);
    let leapY = stopY > startY ? startY + step : startY - step;
    let timer = 0;
    if (stopY > startY) {
      for (var i = startY; i < stopY; i += step) {
        setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
        leapY += step;
        if (leapY > stopY) leapY = stopY;
        timer++;
      }
      return;
    }
    for (var i = startY; i > stopY; i -= step) {
      setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
      leapY -= step;
      if (leapY < stopY) leapY = stopY;
      timer++;
    }
  };

  onScroll(event) {
    const main = <HTMLElement>document.querySelector('#main'),
      aboutus = <HTMLElement>document.querySelector(this.navList[0].link),
      advantages = <HTMLElement>document.querySelector(this.navList[1].link),
      services = <HTMLElement>document.querySelector(this.navList[2].link),
      dreamteam = <HTMLElement>document.querySelector(this.navList[3].link),
      contactus = <HTMLElement>document.querySelector(this.navList[4].link),
      startY = window.pageYOffset;
    [main, aboutus, advantages, services, dreamteam, contactus].forEach(
      (item, index) => {
        if (startY >= item.offsetTop - 90) {
          this.navClick(this.navList[index - 1]);
        }
      }
    );

    if (startY >= aboutus.offsetTop - 70) {
      this.isFixed = true;
    } else {
      this.isFixed = false;
    }

    if (startY >= main.offsetTop + 150) {
      this.isVisibleOnMain = true;
    } else {
      this.isVisibleOnMain = false;
    }
  }
}
