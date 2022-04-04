import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMatchPreviewComponent } from './single-match-preview.component';

describe('SingleMatchPreviewComponent', () => {
  let component: SingleMatchPreviewComponent;
  let fixture: ComponentFixture<SingleMatchPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMatchPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleMatchPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
