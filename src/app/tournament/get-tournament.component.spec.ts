import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTournamentComponent } from './get-tournament.component';

describe('GetSingleTournamentComponent', () => {
  let component: GetTournamentComponent;
  let fixture: ComponentFixture<GetTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetTournamentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
