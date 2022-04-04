import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFactoryListComponent } from './get-factory-list.component';

describe('GetTournamentComponent', () => {
  let component: GetFactoryListComponent;
  let fixture: ComponentFixture<GetFactoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetFactoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetFactoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
