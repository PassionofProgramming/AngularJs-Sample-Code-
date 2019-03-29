import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherteamDetailComponent } from './otherteam-detail.component';

describe('OtherteamDetailComponent', () => {
  let component: OtherteamDetailComponent;
  let fixture: ComponentFixture<OtherteamDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherteamDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherteamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
