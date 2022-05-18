import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserMatchesComponent } from './profile-user-matches.component';

describe('MatchesComponent', () => {
  let component: ProfileUserMatchesComponent;
  let fixture: ComponentFixture<ProfileUserMatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUserMatchesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUserMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
