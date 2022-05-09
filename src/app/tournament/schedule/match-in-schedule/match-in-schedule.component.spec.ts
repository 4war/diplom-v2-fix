import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchInScheduleComponent } from './match-in-schedule.component';

describe('MatchInScheduleComponent', () => {
  let component: MatchInScheduleComponent;
  let fixture: ComponentFixture<MatchInScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchInScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchInScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
