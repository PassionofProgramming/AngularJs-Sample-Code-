import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchscrimmagesComponent } from './searchscrimmages.component';

describe('SearchscrimmagesComponent', () => {
  let component: SearchscrimmagesComponent;
  let fixture: ComponentFixture<SearchscrimmagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchscrimmagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchscrimmagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
