import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatamanageComponent } from './datamanage.component';

describe('DatamanageComponent', () => {
  let component: DatamanageComponent;
  let fixture: ComponentFixture<DatamanageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatamanageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatamanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
