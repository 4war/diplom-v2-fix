import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileOverviewFioComponent } from './profile-overview-fio.component';

describe('FioComponent', () => {
  let component: ProfileOverviewFioComponent;
  let fixture: ComponentFixture<ProfileOverviewFioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileOverviewFioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileOverviewFioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
