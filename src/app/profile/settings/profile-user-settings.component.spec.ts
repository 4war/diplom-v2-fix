import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserSettingsComponent } from './profile-user-settings.component';

describe('SettingsComponent', () => {
  let component: ProfileUserSettingsComponent;
  let fixture: ComponentFixture<ProfileUserSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUserSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
