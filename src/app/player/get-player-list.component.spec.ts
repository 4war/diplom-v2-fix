import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPlayerListComponent } from './get-player-list.component';

describe('PlayerComponent', () => {
  let component: GetPlayerListComponent;
  let fixture: ComponentFixture<GetPlayerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPlayerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPlayerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
