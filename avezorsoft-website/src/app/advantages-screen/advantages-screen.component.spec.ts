import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvantagesScreenComponent } from './advantages-screen.component';

describe('AdvantagesScreenComponent', () => {
  let component: AdvantagesScreenComponent;
  let fixture: ComponentFixture<AdvantagesScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvantagesScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvantagesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
