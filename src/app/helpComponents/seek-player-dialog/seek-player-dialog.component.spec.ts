import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekPlayerDialogComponent } from './seek-player-dialog.component';

describe('SeekPlayerDialogComponent', () => {
  let component: SeekPlayerDialogComponent;
  let fixture: ComponentFixture<SeekPlayerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeekPlayerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekPlayerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
