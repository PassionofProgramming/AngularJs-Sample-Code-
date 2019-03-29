import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditteamComponent } from './editteam.component';

describe('EditteamComponent', () => {
  let component: EditteamComponent;
  let fixture: ComponentFixture<EditteamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditteamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
