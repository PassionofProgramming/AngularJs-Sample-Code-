import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewscrimmageComponent } from './newscrimmage.component';

describe('NewscrimmageComponent', () => {
  let component: NewscrimmageComponent;
  let fixture: ComponentFixture<NewscrimmageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewscrimmageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewscrimmageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
