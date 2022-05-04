import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekPlayerInTournamentDialogComponent } from './seek-player-in-tournament-dialog.component';

describe('SeekPlayerDialogComponent', () => {
  let component: SeekPlayerInTournamentDialogComponent;
  let fixture: ComponentFixture<SeekPlayerInTournamentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeekPlayerInTournamentDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekPlayerInTournamentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
