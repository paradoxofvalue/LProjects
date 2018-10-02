import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusScreenComponent } from './contactus-screen.component';

describe('ContactusScreenComponent', () => {
  let component: ContactusScreenComponent;
  let fixture: ComponentFixture<ContactusScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactusScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactusScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
