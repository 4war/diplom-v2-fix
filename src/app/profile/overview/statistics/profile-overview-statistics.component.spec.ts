import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOverviewStatisticsComponent } from './profile-overview-statistics.component';

describe('StatisticsComponent', () => {
  let component: ProfileOverviewStatisticsComponent;
  let fixture: ComponentFixture<ProfileOverviewStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileOverviewStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOverviewStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
