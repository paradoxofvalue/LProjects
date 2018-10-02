import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services-screen',
  templateUrl: './services-screen.component.html',
  styleUrls: ['./services-screen.component.scss']
})
export class ServicesScreenComponent implements OnInit {

  constructor() { }

  isInactive: boolean = false;
  width: any = '';

  ngOnInit() {
    // window.addEventListener('resize', this.resized());
    window.addEventListener('resize', ()=>{
      this.resized();
    });
    this.resized();

  }

  resized():void {
    if (window.document.body.offsetWidth < 900) {
      this.width = Math.floor(window.document.body.offsetWidth / 3)+'px';

    } else {
      this.width = Math.floor(window.document.body.offsetWidth / 6)+'px';
    }
  }

  hovered(event) {
    let target = event.currentTarget;
    if (target.tagName === "DIV" && !this.isInactive) {
      event.target.classList.toggle('hovered');
      // this.isInactive = true;
      // let timeout = setTimeout(()=>{
        // this.isInactive = false;
        // clearTimeout(timeout);
      // }, 500);
    } else {

    }
  }
}
