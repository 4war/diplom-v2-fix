import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPlayerTournamentsComponent } from './get-player-tournaments.component';

describe('TournamentsComponent', () => {
  let component: GetPlayerTournamentsComponent;
  let fixture: ComponentFixture<GetPlayerTournamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPlayerTournamentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPlayerTournamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
