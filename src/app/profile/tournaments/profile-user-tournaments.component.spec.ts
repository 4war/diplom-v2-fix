import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserTournamentsComponent } from './profile-user-tournaments.component';

describe('TournamentsComponent', () => {
  let component: ProfileUserTournamentsComponent;
  let fixture: ComponentFixture<ProfileUserTournamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUserTournamentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUserTournamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
