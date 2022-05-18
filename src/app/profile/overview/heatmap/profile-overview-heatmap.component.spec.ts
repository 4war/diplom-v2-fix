import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOverviewHeatmapComponent } from './profile-overview-heatmap.component';

describe('HeatmapComponent', () => {
  let component: ProfileOverviewHeatmapComponent;
  let fixture: ComponentFixture<ProfileOverviewHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileOverviewHeatmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOverviewHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
