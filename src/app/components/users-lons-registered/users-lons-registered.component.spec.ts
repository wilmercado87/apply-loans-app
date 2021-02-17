import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersLonsRegisteredComponent } from './users-lons-registered.component';

describe('UsersLonsRegisteredComponent', () => {
  let component: UsersLonsRegisteredComponent;
  let fixture: ComponentFixture<UsersLonsRegisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersLonsRegisteredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersLonsRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
