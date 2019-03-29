import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirsttimepageComponent } from './firsttimepage.component';

describe('FirsttimepageComponent', () => {
  let component: FirsttimepageComponent;
  let fixture: ComponentFixture<FirsttimepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirsttimepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirsttimepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
