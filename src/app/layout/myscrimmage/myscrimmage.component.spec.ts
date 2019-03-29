import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyscrimmageComponent } from './myscrimmage.component';

describe('MyscrimmageComponent', () => {
  let component: MyscrimmageComponent;
  let fixture: ComponentFixture<MyscrimmageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyscrimmageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyscrimmageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
