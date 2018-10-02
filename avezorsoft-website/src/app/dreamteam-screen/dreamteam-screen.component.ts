import { Component, OnInit } from '@angular/core';
import { DreamTeam } from './dream-team';

@Component({
  selector: 'app-dreamteam-screen',
  templateUrl: './dreamteam-screen.component.html',
  styleUrls: ['./dreamteam-screen.component.scss']
})
export class DreamteamScreenComponent implements OnInit {

  team: DreamTeam[] = [
    { name: 'Dmitry'.split(''), position: 'team lead'.split(''), image: '../../assets/images/noun_Cyclops_639949.svg', message: 'My superpower is organization of project development', linkedin: '' },
    { name: 'Vitaly'.split(''), position: 'UI/UX designer'.split(''), image: '../../assets/images/noun_batman_639948.svg', message: 'The design knight', linkedin: '' },
    { name: 'Vadym'.split(''), position: 'front-end developer'.split(''), image: '../../assets/images/noun_flash_639950.svg', message: 'Master of JavaScript force and the fastest frontender', linkedin: '' },
    { name: 'Yevheny'.split(''), position: 'android developer'.split(''), image: '../../assets/images/noun_Wolverine_639945.svg', message: 'Extremely sharp android development', linkedin: '' },
    { name: 'Aleksandr'.split(''), position: 'ios developer'.split(''), image: '../../assets/images/noun_Robin_639954.svg', message: 'Developing IOS like ninja', linkedin: '' },
    { name: 'Slavik'.split(''), position: 'back-end developer'.split(''), image: '../../assets/images/noun_superman_639952.svg', message: 'Strongest Backend on the Earth', linkedin: '' },
    { name: 'Ilya'.split(''), position: 'QA engineer'.split(''), image: '../../assets/images/noun_Iron Man_639953.svg', message: 'Smart bug destruction', linkedin: '' },
  ]

  visible: boolean = false;

  constructor() { }

  ngOnInit() {
    window.addEventListener('scroll', ($event) => (this.onScroll($event)), true);

  }

  onScroll(event) {
    let dreamteam = <HTMLElement>document.querySelector('#dreamteam'),
      contactus = <HTMLElement>document.querySelector('#contactus'),
      startY = window.pageYOffset,
      blockHeight = 200;
    
      if (window.innerWidth <= 1100) {
        this.team[0].visible = true;
        this.team[1].visible = true;
        this.team[2].visible = true;
        this.team[3].visible = true;
        this.team[4].visible = true;
        this.team[5].visible = true;
        this.team[6].visible = true;
        return;
      }

    if (startY >= dreamteam.offsetTop - window.innerHeight / 2 && startY <= dreamteam.offsetTop + window.innerHeight / 2) {
      this.team[0].visible = true;
    } else {
      this.team[0].visible = false;
    }
    if (startY >= dreamteam.offsetTop - window.innerHeight / 2 + 200*1 && startY <= dreamteam.offsetTop + window.innerHeight / 2 + 200*1) {
      this.team[1].visible = true;
    } else {
      this.team[1].visible = false;
    }
    if (startY >= dreamteam.offsetTop - window.innerHeight / 2 + 200*2 && startY <= dreamteam.offsetTop + window.innerHeight / 2 + 200*2) {
      this.team[2].visible = true;
    } else {
      this.team[2].visible = false;
    }
    if (startY >= dreamteam.offsetTop - window.innerHeight / 2 + 200*3 && startY <= dreamteam.offsetTop + window.innerHeight / 2 + 200*3) {
      this.team[3].visible = true;
    } else {
      this.team[3].visible = false;
    }
    if (startY >= dreamteam.offsetTop - window.innerHeight / 2 + 200*4 && startY <= dreamteam.offsetTop + window.innerHeight / 2 + 200*4) {
      this.team[4].visible = true;
    } else {
      this.team[4].visible = false;
    }
    if (startY >= dreamteam.offsetTop - window.innerHeight / 2 + 200*5 && startY <= dreamteam.offsetTop + window.innerHeight / 2 + 200*5) {
      this.team[5].visible = true;
    } else {
      this.team[5].visible = false;
    }
    if (startY >= dreamteam.offsetTop - window.innerHeight / 2 + 200*6 && startY <= dreamteam.offsetTop + window.innerHeight / 2 + 200*6) {
      this.team[6].visible = true;
    } else {
      this.team[6].visible = false;
    }
    
  }

}