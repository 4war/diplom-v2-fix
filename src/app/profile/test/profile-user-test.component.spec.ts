import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUserTestComponent } from './profile-user-test.component';

describe('TestComponent', () => {
  let component: ProfileUserTestComponent;
  let fixture: ComponentFixture<ProfileUserTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUserTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUserTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
