import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserNotificationsComponent } from './profile-user-notifications.component';

describe('ProfileUserNotificationsComponent', () => {
  let component: ProfileUserNotificationsComponent;
  let fixture: ComponentFixture<ProfileUserNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUserNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUserNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
