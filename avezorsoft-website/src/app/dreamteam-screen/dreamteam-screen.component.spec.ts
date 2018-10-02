import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DreamteamScreenComponent } from './dreamteam-screen.component';

describe('DreamteamScreenComponent', () => {
  let component: DreamteamScreenComponent;
  let fixture: ComponentFixture<DreamteamScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DreamteamScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DreamteamScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
