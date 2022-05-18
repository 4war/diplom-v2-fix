import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOverviewTriangleComponent } from './profile-overview-triangle.component';

describe('TriangleComponent', () => {
  let component: ProfileOverviewTriangleComponent;
  let fixture: ComponentFixture<ProfileOverviewTriangleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileOverviewTriangleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOverviewTriangleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
