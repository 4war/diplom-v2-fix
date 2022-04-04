import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMatchComponent } from './single-match.component';

describe('SingleMatchComponent', () => {
  let component: SingleMatchComponent;
  let fixture: ComponentFixture<SingleMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
