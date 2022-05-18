import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserOverviewComponent } from './profile-user-overview.component';

describe('OverviewComponent', () => {
  let component: ProfileUserOverviewComponent;
  let fixture: ComponentFixture<ProfileUserOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUserOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUserOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
