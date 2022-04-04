import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFactoryComponent } from './get-factory.component';

describe('GetFactoryComponent', () => {
  let component: GetFactoryComponent;
  let fixture: ComponentFixture<GetFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetFactoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
